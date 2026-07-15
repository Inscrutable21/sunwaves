/* ── Video rotation ─────────────────────────── */
const videos = document.querySelectorAll('.bg-video');
let current = 0;

function playVideo(index) {
  videos.forEach(v => v.classList.remove('active'));
  const next = videos[index];
  next.currentTime = 0;
  next.play();
  next.classList.add('active');
}

videos.forEach((video, index) => {
  video.addEventListener('ended', () => {
    current = (index + 1) % videos.length;
    playVideo(current);
  });
});

playVideo(0);

/* ── Arch scroll-pinned image reveal ─────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Check if .arch exists before running legacy arch animations
if (document.querySelector('.arch')) {
  // Set z-index for images from data-index
  document.querySelectorAll(".arch__right .img-wrapper").forEach((element) => {
    const order = element.getAttribute("data-index");
    if (order !== null) {
      element.style.zIndex = order;
    }
  });

  // Mobile layout handler — interleave left info and right images using CSS order
  function handleMobileLayout() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const leftItems = gsap.utils.toArray(".arch__left .arch__info");
    const rightItems = gsap.utils.toArray(".arch__right .img-wrapper");

    if (isMobile) {
      leftItems.forEach((item, i) => { item.style.order = i * 2; });
      rightItems.forEach((item, i) => { item.style.order = i * 2 + 1; });
    } else {
      leftItems.forEach((item) => { item.style.order = ""; });
      rightItems.forEach((item) => { item.style.order = ""; });
    }
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleMobileLayout, 100);
  });

  handleMobileLayout();

  const imgs = gsap.utils.toArray(".img-wrapper img");
  const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB"];

  // GSAP Animation with Media Query
  ScrollTrigger.matchMedia({
    "(min-width: 769px)": function () {
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".arch",
          start: "top top",
          end: "bottom bottom",
          pin: ".arch__right",
          scrub: true
        }
      });

      gsap.set(imgs, {
        clipPath: "inset(0)",
        objectPosition: "50% 50%"
      });

      imgs.forEach((_, index) => {
        const currentImage = imgs[index];
        const nextImage = imgs[index + 1] ? imgs[index + 1] : null;
        const sectionTimeline = gsap.timeline();

        if (nextImage) {
          sectionTimeline
            .to("body", {
              backgroundColor: bgColors[index],
              duration: 1.5,
              ease: "power2.inOut"
            }, 0)
            .to(currentImage, {
              clipPath: "inset(0px 0px 100%)",
              objectPosition: "50% 50%",
              duration: 1.5,
              ease: "none"
            }, 0)
            .to(nextImage, {
              objectPosition: "50% 50%",
              duration: 1.5,
              ease: "none"
            }, 0);
        }

        mainTimeline.add(sectionTimeline);
      });
    },

    "(max-width: 768px)": function () {
      const mbTimeline = gsap.timeline();
      gsap.set(imgs, { objectPosition: "50% 50%" });

      imgs.forEach((image, index) => {
        const innerTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: image,
            start: "top-=70% top+=50%",
            end: "bottom+=200% bottom",
            scrub: true
          }
        });

        innerTimeline
          .to(image, {
            objectPosition: "50% 50%",
            duration: 5,
            ease: "none"
          })
          .to("body", {
            backgroundColor: bgColors[index],
            duration: 1.5,
            ease: "power2.inOut"
          });

        mbTimeline.add(innerTimeline);
      });
    }
  });
}

/* ── Mobile Navigation Menu Toggle ────────────────────────── */
function initMobileNavbar() {
  const navToggle = document.getElementById('nav-toggle');
  const linksMenu = document.querySelector('.navbar .links');
  if (!navToggle || !linksMenu) return;

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    linksMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  linksMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      linksMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (linksMenu.classList.contains('active') && !linksMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      linksMenu.classList.remove('active');
    }
  });
}

initMobileNavbar();
