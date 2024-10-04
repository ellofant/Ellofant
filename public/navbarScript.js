function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
  }
  
  // Run on initial load
  initMobileMenu();
  
  // Reinitialize on Astro page changes
  document.addEventListener('astro:page-load', initMobileMenu);