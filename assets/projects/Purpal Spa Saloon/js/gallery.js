(() => {
  const filters = document.querySelector('[data-gallery-filters]');
  const items = [...document.querySelectorAll('[data-gallery-item]')];
  const lightbox = document.querySelector('.lightbox');
  if (filters) filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filters.querySelectorAll('.filter-button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    items.forEach((item) => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter; });
  });
  if (!lightbox || !items.length) return;
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('figcaption');
  let visible = [];
  let index = 0;
  let priorFocus;
  const refresh = () => { visible = items.filter((item) => !item.hidden); };
  const show = (nextIndex) => {
    index = (nextIndex + visible.length) % visible.length;
    const button = visible[index];
    const img = button.querySelector('img');
    image.src = img.src;
    image.alt = img.alt;
    caption.textContent = button.dataset.caption;
  };
  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (priorFocus) priorFocus.focus();
  };
  items.forEach((item) => item.addEventListener('click', () => {
    refresh();
    priorFocus = item;
    show(visible.indexOf(item));
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('[data-close]').focus();
  }));
  lightbox.querySelector('[data-close]').addEventListener('click', close);
  lightbox.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
  lightbox.querySelector('[data-next]').addEventListener('click', () => show(index + 1));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) close(); });
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
    if (event.key === 'Tab') {
      const controls = [...lightbox.querySelectorAll('button')];
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
    }
  });
})();
