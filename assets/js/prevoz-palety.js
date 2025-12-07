// Reveal-on-scroll pro prvky .reveal – progresivní verze
document.addEventListener('DOMContentLoaded', () => {
    // JS běží → přidáme flag na <html>
    document.documentElement.classList.add('has-js');
  
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;
  
    // Fallback pro prohlížeče bez IntersectionObserver
    if (!('IntersectionObserver' in window)) {
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