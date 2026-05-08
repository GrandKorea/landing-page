const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-panel, .section-head, .service-bot-showcase, .partners, .difference-graph-copy, .trust-graph, .logic-video, .logic-grid article, .plan-grid article, .plans-cta"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((target) => revealObserver.observe(target));
