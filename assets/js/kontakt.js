// Kontakt – scroll reveal + jednoduchá validace formuláře
(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
  
    if ('IntersectionObserver' in window && revealEls.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18 }
      );
  
      revealEls.forEach((el) => observer.observe(el));
    } else {
      // fallback – vše viditelné
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  
    // Formulář
    const form = document.getElementById('contact-form');
    const msgEl = document.getElementById('contact-form-message');
  
    if (!form || !msgEl) return;
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      msgEl.classList.remove('form-message--success', 'form-message--error');
      msgEl.textContent = '';
  
      const name = form.elements['name']?.value.trim();
      const email = form.elements['email']?.value.trim();
      const message = form.elements['message']?.value.trim();
      const consent = form.elements['consent']?.checked;
  
      if (!name || !email || !message || !consent) {
        msgEl.textContent = 'Vyplň prosím povinná pole a odsouhlas zpracování osobních údajů.';
        msgEl.classList.add('form-message--error');
        return;
      }
  
      // Zatím jen simulace úspěšného odeslání
      form.reset();
      msgEl.textContent = 'Zpráva byla odeslána. Ozveme se co nejdříve.';
      msgEl.classList.add('form-message--success');
    });
  })();