// Reveal-on-scroll pro prvky .reveal – progresivní verze
document.addEventListener('DOMContentLoaded', () => {
    // označíme, že JS běží → CSS může použít .has-js .reveal…
    document.documentElement.classList.add('has-js');
  
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;
  
    if (!('IntersectionObserver' in window)) {
      // fallback – jen přidáme .is-visible, animace se nepoužije
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }
  
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
  });