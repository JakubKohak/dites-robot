// Mobile nav toggle + footer year
(() => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    const yearEl = document.getElementById('year');
  
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    if (!toggle || !nav) return;
  
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  
    nav.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  })();