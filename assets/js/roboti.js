// Jednoduchá reveal animace pro kartu robota
(() => {
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