// Jednoduchá reveal animace pro kartu robota
(() => {
  // Označ dokument jako "má JS" – pro CSS (.has-js .reveal ...)
  document.documentElement.classList.add('has-js');

  const revealEls = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !revealEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.2
  });

  revealEls.forEach(el => observer.observe(el));
})();