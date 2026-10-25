(() => {
  const config = window.PURPAL_CONFIG;
  const waUrl = (message) => `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const report = (form, text, error = false) => {
    const output = form.querySelector('.form-message');
    output.textContent = text;
    output.classList.toggle('error', error);
    output.setAttribute('role', error ? 'alert' : 'status');
  };
  const validatePhone = (form) => {
    const input = form.elements.phone;
    input.setCustomValidity(/^[+()\d .-]{7,25}$/.test(input.value.trim()) ? '' : 'Enter a valid phone number.');
    return form.reportValidity();
  };
  const openWhatsApp = (message) => {
    const popup = window.open(waUrl(message), '_blank');
    if (!popup) location.href = waUrl(message);
    else popup.opener = null;
  };
  const appointment = document.querySelector('#appointment-form');
  if (appointment) {
    const date = appointment.elements.date;
    date.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    appointment.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validatePhone(appointment)) return;
      if (date.value < date.min) { date.setCustomValidity('Please choose today or a future date.'); date.reportValidity(); date.setCustomValidity(''); return; }
      const data = new FormData(appointment);
      const message = `Hello ${config.businessName}! I would like to request an appointment.\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\nDate: ${data.get('date')}\nTime: ${data.get('time')}\nMessage: ${data.get('message') || 'None'}\n\nPlease confirm my appointment. I understand this is a request and is not confirmed until the salon responds. Thank you!`;
      report(appointment, 'Your WhatsApp booking request is ready. Please send the message in WhatsApp; the salon must confirm your appointment.');
      openWhatsApp(message);
    });
  }
  const enquiry = document.querySelector('#enquiry-form');
  if (enquiry) enquiry.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validatePhone(enquiry)) return;
    const data = new FormData(enquiry);
    const message = `Hello ${config.businessName}! I have an enquiry.\n\nName: ${data.get('name')}\nContact number: ${data.get('phone')}\nTopic: ${data.get('topic')}\nMessage: ${data.get('message')}`;
    report(enquiry, 'Your enquiry is ready in WhatsApp. Please send it to contact the salon.');
    openWhatsApp(message);
  });
})();
