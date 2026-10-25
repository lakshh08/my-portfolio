(() => {
  const config = window.PURPAL_CONFIG;
  const pages = [
    ['Home', 'index.html'], ['Services', 'services.html'], ['About Us', 'about.html'],
    ['Gallery', 'gallery.html'], ['Contact', 'contact.html']
  ];
  const current = location.pathname.split('/').pop() || 'index.html';
  const nav = pages.map(([label, href]) =>
    `<a href="${href}"${current === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const header = document.querySelector('[data-site-header]');
  if (header) header.innerHTML = `
    <div class="announcement">A little time for yourself goes a long way <span aria-hidden="true">✦</span> Book your visit today</div>
    <header class="site-header"><div class="container nav-wrap">
      <a class="brand" href="index.html" aria-label="${config.businessName} home"><span class="brand-mark" aria-hidden="true">P</span><span>${config.businessName}<small>Beauty · Wellness · You</small></span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation menu">☰</button>
      <nav class="nav-links" id="primary-navigation" aria-label="Main navigation">${nav}<a class="button button-small" href="contact.html#appointment">Book a Visit</a></nav>
    </div></header>`;

  const footer = document.querySelector('[data-site-footer]');
  if (footer) footer.innerHTML = `
    <footer class="site-footer"><div class="container">
      <div class="footer-grid">
        <div><a class="brand" href="index.html" style="color:white"><span class="brand-mark">P</span><span>${config.businessName}<small style="color:#c8a2d9">Beauty · Wellness · You</small></span></a>
          <p style="margin-top:18px">A welcoming space to pause, feel cared for and enjoy a little self-care.</p></div>
        <div><h3>Explore</h3><div class="footer-links">${pages.map(([label,href])=>`<a href="${href}">${label}</a>`).join('')}</div></div>
        <div><h3>Visit Us</h3><div class="footer-links"><a href="tel:${config.phoneNumber.replace(/[^+\d]/g,'')}">${config.phoneNumber}</a><a href="${config.mapsUrl}" target="_blank" rel="noopener">Address: ${config.address}</a><span>${config.openingHours}</span></div></div>
        <div><h3>Stay in Touch</h3><div class="footer-links"><a href="#" aria-label="Instagram social link placeholder">Instagram</a><a href="#" aria-label="Facebook social link placeholder">Facebook</a><a href="contact.html">Send an enquiry</a></div></div>
      </div><div class="footer-bottom">© <span data-year></span> ${config.businessName}. Sample website content and prices should be reviewed before publishing.</div>
    </div></footer>`;

  const waUrl = (message) => `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.href = waUrl(link.dataset.message || `Hello ${config.businessName}! I would like to know more about your services.`);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  const floating = document.querySelector('[data-floating-whatsapp]');
  if (floating) {
    floating.href = waUrl(`Hello ${config.businessName}! I would like to make an enquiry.`);
    floating.target = '_blank';
    floating.rel = 'noopener noreferrer';
    floating.setAttribute('aria-label', `Contact ${config.businessName} on WhatsApp`);
  }
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    navLinks.classList.toggle('open', open);
  });
  document.querySelectorAll('[data-config]').forEach((item) => {
    const key = item.dataset.config;
    if (key in config) {
      item.textContent = config[key];
      if (key === 'phoneNumber' && item instanceof HTMLAnchorElement) item.href = `tel:${config.phoneNumber.replace(/[^\d+]/g, '')}`;
    }
  });
  const mapFrame = document.querySelector('[data-map-frame]');
  if (mapFrame) mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(`${config.businessName}, ${config.address}`)}&output=embed`;
  const mapLink = document.querySelector('[data-map-link]');
  if (mapLink) mapLink.href = config.mapsUrl;
  const revealTargets = document.querySelectorAll(
    '.page-hero .container, .section-heading, .split > *, .service-card, .offer-card, .quote-card, .team-card, .gallery-item, .contact-details > *, .form-card, .cta-band .container'
  );
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    const staggerCounts = new Map();
    revealTargets.forEach((element) => {
      const parent = element.parentElement;
      const index = staggerCounts.get(parent) || 0;
      element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 80}ms`);
      staggerCounts.set(parent, index + 1);
      element.addEventListener('animationend', (event) => {
        if (event.animationName !== 'reveal-up') return;
        element.classList.remove('reveal', 'is-visible');
        element.style.removeProperty('--reveal-delay');
      }, { once: true });
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
  }
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', () => toTop.classList.toggle('visible', window.scrollY > 450), { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();
