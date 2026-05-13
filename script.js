const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-panel, .section-head, .service-bot-showcase, .partners, .difference-graph-copy, .trust-graph, .logic-video, .logic-grid article, .plan-grid article, .plans-cta"
);

const routeSections = {
  "/service": "service",
  "/difference": "difference",
  "/logic": "logic",
  "/plans": "plans",
};

const normalizePath = (path) => {
  if (path.length <= 1) return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const updateRouteCanonical = () => {
  const path = normalizePath(window.location.pathname);
  if (!routeSections[path]) return;

  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) return;

  canonical.href = `${window.location.origin}${path}`;
};

const scrollToRouteSection = () => {
  const sectionId = routeSections[normalizePath(window.location.pathname)];
  if (!sectionId) return;

  const target = document.getElementById(sectionId);
  if (!target) return;

  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "auto", block: "start" });
  });
};

revealTargets.forEach((target) => target.classList.add("reveal"));

updateRouteCanonical();

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

scrollToRouteSection();
