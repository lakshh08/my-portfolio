(() => {
  const filters = document.querySelector('[data-service-filters]');
  const cards = [...document.querySelectorAll('[data-service-card]')];
  if (!filters || !cards.length) return;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filters.querySelectorAll('.filter-button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  });
  document.querySelectorAll('[data-service-book]').forEach((link) => {
    const service = link.dataset.serviceBook;
    const message = `Hello ${window.PURPAL_CONFIG.businessName}! I would like to request an appointment for ${service}.\n\nPlease let me know your available times and confirm the current price. Thank you!`;
    link.href = `https://wa.me/${window.PURPAL_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
})();
