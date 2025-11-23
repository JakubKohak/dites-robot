// reseni-pro-vyrobu.js
(() => {
    document.querySelectorAll('.solution-panel[data-bg]').forEach(panel => {
      const url = panel.getAttribute('data-bg');
      if (url) panel.style.backgroundImage = `url("${url}")`;
    });
  
    const panels = document.querySelectorAll('.reveal');
  
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