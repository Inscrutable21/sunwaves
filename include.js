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

    // ── Mobile: prev / next buttons + swipe ──
    mm.add('(max-width: 768px)', () => {
        const GAP = 20;
        let current = 0;

        function stepWidth() {
            return cards[0].getBoundingClientRect().width + GAP;
        }

        function updateButtons() {
            if (!prevBtn || !nextBtn) return;
            prevBtn.disabled = current === 0;
            nextBtn.disabled = current === cards.length - 1;
            prevBtn.style.opacity = current === 0 ? '0.3' : '1';
            nextBtn.style.opacity = current === cards.length - 1 ? '0.3' : '1';
        }

        function slideTo(index) {
            current = Math.max(0, Math.min(index, cards.length - 1));
            gsap.to(track, { x: -(current * stepWidth()), duration: 0.7, ease: 'power3.inOut' });
            updateButtons();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => slideTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => slideTo(current + 1));

        // Swipe / drag support
        let startX = 0, moved = false, dragging = false;
        track.addEventListener('pointerdown', e => {
            dragging = true; moved = false; startX = e.clientX;
            track.setPointerCapture(e.pointerId);
        });
        track.addEventListener('pointermove', e => {
            if (dragging && Math.abs(e.clientX - startX) > 5) moved = true;
        });
        track.addEventListener('pointerup', e => {
            if (!dragging) return; dragging = false;
            if (!moved) return;
            const diff = startX - e.clientX;
            if (Math.abs(diff) > 48) slideTo(diff > 0 ? current + 1 : current - 1);
        });

        const onResize = () => gsap.set(track, { x: -(current * stepWidth()) });
        window.addEventListener('resize', onResize);
        updateButtons();

        // cleanup
        return () => window.removeEventListener('resize', onResize);
    });
}
