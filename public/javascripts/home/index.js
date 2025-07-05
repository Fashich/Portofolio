document.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero .content");
  const heroHeight = document.querySelector(".hero").offsetHeight;

  let lastScrollTop = 0;
  let ticking = false;
  let offsetY = 0;

  const config = {
    speed: 0.8,
    maxOffset: 165,
  };

  function updateHeroPosition(scrollTop) {
    if (lastScrollTop > scrollTop) {
      offsetY = Math.max(
        0,
        offsetY - (lastScrollTop - scrollTop) * config.speed
      );
    } else {
      offsetY = Math.min(
        config.maxOffset,
        offsetY + (scrollTop - lastScrollTop) * config.speed
      );
    }

    offsetY = Math.max(0, Math.min(offsetY, config.maxOffset));

    heroContent.style.top = `calc(27% + ${offsetY}px)`;

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeroPosition(scrollTop);
        ticking = false;
      });
      ticking = true;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(section);
  });
});
