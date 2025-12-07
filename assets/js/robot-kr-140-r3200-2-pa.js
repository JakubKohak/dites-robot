// Robot detail – taby + reveal animace
(() => {
    // Označit dokument jako "má JS" – pro CSS (.has-js .reveal …)
    document.documentElement.classList.add('has-js');
  
    const tabButtons = Array.from(document.querySelectorAll('.robot-spec-tab'));
    const panels = Array.from(document.querySelectorAll('.robot-spec-panel'));
  
    if (tabButtons.length && panels.length) {
      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.dataset.target;
          if (!targetId) return;
  
          tabButtons.forEach(b => {
            const isActive = b === btn;
            b.classList.toggle('is-active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
          });
  
          panels.forEach(panel => {
            const isTarget = panel.id === targetId;
            panel.classList.toggle('is-active', isTarget);
            panel.hidden = !isTarget;
          });
        });
      });
    }
  
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
  
    if ('IntersectionObserver' in window && revealEls.length) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      }, { threshold: 0.18 });
  
      revealEls.forEach(el => io.observe(el));
    } else {
      // fallback – pro případ extrémně starých prohlížečů
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  })();