// reseni-pro-vyrobu.js
(() => {
  // Označ dokument jako "má JS" – pro CSS (.has-js .reveal ...)
  document.documentElement.classList.add('has-js');

  // Nastavení background-image z data-bg atributů
  document.querySelectorAll('.solution-panel[data-bg]').forEach(panel => {
    const url = panel.getAttribute('data-bg');
    if (url) {
      panel.style.backgroundImage = `url("${url}")`;
    }
  });

  // Reveal animace
  const panels = document.querySelectorAll('.reveal');
  if (!panels.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: "0px 0px -10% 0px"
  });

  panels.forEach(p => io.observe(p));
})();