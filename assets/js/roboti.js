// Řazení robotů + reveal animace

(() => {
    const grid = document.querySelector('.robots-grid');
    const sortButtons = document.querySelectorAll('.robots-sort-btn');
    const sortLabel = document.getElementById('robots-sort-label');
  
    if (!grid) return;
  
    const cards = Array.from(grid.querySelectorAll('.robot-card'));
  
    const labelTexts = {
      payload: 'nosnosti (od nejvyšší)',
      reach: 'dosahu (od nejdelšího)',
      axes: 'počtu kloubů (od nejvyššího)'
    };
  
    const sortBy = (key) => {
      const sorted = [...cards].sort((a, b) => {
        const av = Number(a.dataset[key]) || 0;
        const bv = Number(b.dataset[key]) || 0;
        return bv - av; // vždy od nejvyšší hodnoty
      });
  
      sorted.forEach(card => grid.appendChild(card));
  
      if (sortLabel && labelTexts[key]) {
        sortLabel.innerHTML = 'Seřazeno podle: <strong>' + labelTexts[key] + '</strong>';
      }
    };
  
    sortButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const sortKey = btn.dataset.sort;
        if (!sortKey) return;
  
        sortButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
  
        sortBy(sortKey);
      });
    });
  
    // default: nosnost
    sortBy('payload');
  
    // Reveal animace
    const revealItems = document.querySelectorAll('.robot-card.reveal');
    if (revealItems.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
  
      revealItems.forEach(el => observer.observe(el));
    } else {
      revealItems.forEach(el => el.classList.add('is-visible'));
    }
  })();