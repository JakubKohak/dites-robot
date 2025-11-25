// Řazení + filtrování robotů + reveal animace

(() => {
    const grid = document.querySelector('.robots-grid');
    const sortButtons = document.querySelectorAll('.robots-sort-btn');
    const sortLabel = document.getElementById('robots-sort-label');
    const orderBtn = document.querySelector('.robots-order-btn');
    const orderLabel = orderBtn?.querySelector('.robots-order-label');
    const orderIcon = orderBtn?.querySelector('.robots-order-icon');
  
    const filterPayload = document.getElementById('filter-payload');
    const filterReach = document.getElementById('filter-reach');
    const filterAxes = document.getElementById('filter-axes');
  
    if (!grid) return;
  
    const cards = Array.from(grid.querySelectorAll('.robot-card'));
  
    const labelTexts = {
      payload: 'nosnosti',
      reach: 'dosahu',
      axes: 'počtu kloubů'
    };
  
    let currentSortKey = 'payload';
    let currentDirection = -1; // -1 = od nejvyšší, 1 = od nejnižší
  
    const getFilters = () => ({
      payload: Number(filterPayload?.value || 0),
      reach: Number(filterReach?.value || 0),
      axes: Number(filterAxes?.value || 0)
    });
  
    const applyFiltersVisibility = () => {
      const { payload, reach, axes } = getFilters();
  
      cards.forEach(card => {
        const p = Number(card.dataset.payload) || 0;
        const r = Number(card.dataset.reach) || 0;
        const a = Number(card.dataset.axes) || 0;
  
        const okPayload = p >= payload;
        const okReach = r >= reach;
        const okAxes = a >= axes;
  
        const visible = okPayload && okReach && okAxes;
        card.classList.toggle('is-filtered-out', !visible);
      });
    };
  
    const updateSortLabel = () => {
      const base = labelTexts[currentSortKey] || '';
      const dirText = currentDirection === -1 ? 'od nejvyšší' : 'od nejnižší';
      if (sortLabel) {
        sortLabel.innerHTML =
          'Seřazeno podle: <strong>' + base + ' (' + dirText + ')</strong>';
      }
    };
  
    const updateOrderButtonUI = () => {
      if (!orderLabel || !orderIcon) return;
      if (currentDirection === -1) {
        orderLabel.textContent = 'Od nejvyšší hodnoty';
        orderIcon.textContent = '↓';
        orderBtn?.setAttribute('data-direction', 'desc');
      } else {
        orderLabel.textContent = 'Od nejnižší hodnoty';
        orderIcon.textContent = '↑';
        orderBtn?.setAttribute('data-direction', 'asc');
      }
    };
  
    const sortAndFilter = () => {
      const sorted = [...cards].sort((a, b) => {
        const av = Number(a.dataset[currentSortKey]) || 0;
        const bv = Number(b.dataset[currentSortKey]) || 0;
        return (bv - av) * (currentDirection === -1 ? 1 : -1);
      });
  
      sorted.forEach(card => grid.appendChild(card));
  
      applyFiltersVisibility();
      updateSortLabel();
    };
  
    sortButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const sortKey = btn.dataset.sort;
        if (!sortKey) return;
  
        currentSortKey = sortKey;
  
        sortButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
  
        sortAndFilter();
      });
    });
  
    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        currentDirection = currentDirection === -1 ? 1 : -1;
        updateOrderButtonUI();
        sortAndFilter();
      });
    }
  
    if (filterPayload) filterPayload.addEventListener('change', sortAndFilter);
    if (filterReach)   filterReach.addEventListener('change', sortAndFilter);
    if (filterAxes)    filterAxes.addEventListener('change', sortAndFilter);
  
    updateOrderButtonUI();
    sortAndFilter();
  
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