/**
 * include.js
 * Fetches each HTML section partial and injects it into its
 * [data-include] placeholder. After ALL sections are loaded,
 * script.js is run and then the testimonials carousel is initialised.
 */
(async function () {
    const placeholders = document.querySelectorAll('[data-include]');

    // Load all partials in parallel
    await Promise.all(
        Array.from(placeholders).map(async (el) => {
            const file = el.getAttribute('data-include');
            try {
                const res = await fetch(file);
                if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
                const html = await res.text();
                const temp = document.createElement('div');
                temp.innerHTML = html;
                el.replaceWith(...temp.childNodes);
            } catch (err) {
                console.error(err);
            }
        })
    );

    // ── Wait for script.js to fully execute before init ──
    await new Promise((resolve) => {
        const s = document.createElement('script');
        s.src = 'script.js';
        s.onload = resolve;
        s.onerror = resolve; // resolve even on error so page doesn't hang
        document.body.appendChild(s);
    });

    // ── Initialise testimonials carousel ──
    initTestimonials();
})();


/**
 * Testimonials scroll-driven carousel.
 * Desktop : GSAP ScrollTrigger pins section + slides cards horizontally.
 * Mobile  : Prev / next buttons and swipe gestures.
 *
 * Uses gsap.matchMedia() — the GSAP 3.12+ replacement for the
 * removed ScrollTrigger.matchMedia().
 */
function initTestimonials() {
    const section = document.querySelector('.tc-section');
    const track   = document.getElementById('tc-track');
    const wrap    = document.querySelector('.tc-track-wrap');
    if (!section || !track || !wrap) return;

    const cards   = Array.from(track.querySelectorAll('.tc-card'));
    const prevBtn = document.getElementById('tc-prev');
    const nextBtn = document.getElementById('tc-next');

    function getScrollDist() {
        return Math.max(0, track.scrollWidth - wrap.getBoundingClientRect().width);
    }

    // gsap.matchMedia() — correct API for GSAP 3.12+
    const mm = gsap.matchMedia();

    // ── Desktop: pin section, scroll track horizontally ──
    mm.add('(min-width: 769px)', () => {
        gsap.to(track, {
            x: () => -getScrollDist(),
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                pin: true,
                start: 'top top',
                end: () => `+=${getScrollDist()}`,
                scrub: 1.2,
                invalidateOnRefresh: true
            }
        });

        // cleanup: kill the ScrollTrigger when breakpoint no longer matches
        return () => {
            ScrollTrigger.getAll()
                .filter(st => st.trigger === section)
                .forEach(st => st.kill());
        };
    });

    // ── Mobile: native touch swipe / drag-to-scroll slider by hand ──
    mm.add('(max-width: 768px)', () => {
        // Clear any GSAP inline transforms from desktop ScrollTrigger
        gsap.set(track, { clearProps: 'all' });

        // Add mouse drag-to-scroll for desktop testing / trackpad hand-sliding
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        const onMouseDown = (e) => {
            isDown = true;
            startX = e.pageX - wrap.offsetLeft;
            scrollLeft = wrap.scrollLeft;
        };

        const onMouseLeave = () => {
            isDown = false;
        };

        const onMouseUp = () => {
            isDown = false;
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrap.offsetLeft;
            const walk = (x - startX) * 1.4;
            wrap.scrollLeft = scrollLeft - walk;
        };

        wrap.addEventListener('mousedown', onMouseDown);
        wrap.addEventListener('mouseleave', onMouseLeave);
        wrap.addEventListener('mouseup', onMouseUp);
        wrap.addEventListener('mousemove', onMouseMove);

        return () => {
            wrap.removeEventListener('mousedown', onMouseDown);
            wrap.removeEventListener('mouseleave', onMouseLeave);
            wrap.removeEventListener('mouseup', onMouseUp);
            wrap.removeEventListener('mousemove', onMouseMove);
        };
    });
}
