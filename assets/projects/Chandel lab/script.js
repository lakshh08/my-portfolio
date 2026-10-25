(() => {
  "use strict";

  // Add Chandel Lab's verified WhatsApp number in international format:
  // digits only, with country code and without +, spaces, or punctuation.
  const WHATSAPP_PHONE = "2222222222";

  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-navigation");
  const form = document.querySelector("#appointment-form");
  const formStatus = document.querySelector("#form-status");
  const interactionStatus = document.querySelector("#interaction-status");
  const preferredDate = document.querySelector("#preferred-date");
  const currentYear = document.querySelector("#copyright-year");
  let statusTimeout;

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  if (preferredDate) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    preferredDate.min = localToday;
  }

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNav.classList.remove("is-open");
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      primaryNav.classList.toggle("is-open", !isOpen);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  function showInteractionStatus(message) {
    if (!interactionStatus) return;
    interactionStatus.textContent = message;
    interactionStatus.classList.add("is-visible");
    window.clearTimeout(statusTimeout);
    statusTimeout = window.setTimeout(() => {
      interactionStatus.classList.remove("is-visible");
    }, 6000);
  }

  function openWhatsApp(message) {
    if (!/^\d{8,15}$/.test(WHATSAPP_PHONE) || /X/i.test(WHATSAPP_PHONE)) {
      showInteractionStatus("WhatsApp booking is not configured. Add Chandel Lab's verified number in script.js.");
      return false;
    }
    const whatsappWindow = window.open(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    if (!whatsappWindow) {
      showInteractionStatus("Your browser blocked the WhatsApp window. Allow pop-ups for this site, then try again.");
      return false;
    }
    whatsappWindow.opener = null;
    return true;
  }

  document.querySelectorAll(".whatsapp-action").forEach((button) => {
    button.addEventListener("click", () => {
      openWhatsApp(button.dataset.message || "Hello, I would like to enquire about diagnostic services.");
    });
  });

  document.querySelectorAll("[data-map-placeholder]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showInteractionStatus("The map link is not configured. Add Chandel Lab's verified Google Maps URL.");
    });
  });

  document.querySelectorAll("[data-test]").forEach((link) => {
    link.addEventListener("click", () => {
      const testSelect = document.querySelector("#test-select");
      if (testSelect) testSelect.value = link.dataset.test || "";
    });
  });

  if (form && formStatus) {
    const fields = {
      name: form.querySelector("#patient-name"),
      phone: form.querySelector("#patient-phone"),
      test: form.querySelector("#test-select"),
      date: form.querySelector("#preferred-date")
    };
    const errors = {
      name: form.querySelector("#name-error"),
      phone: form.querySelector("#phone-error"),
      test: form.querySelector("#test-error"),
      date: form.querySelector("#date-error")
    };

    function setFieldError(fieldName, message) {
      const field = fields[fieldName];
      const error = errors[fieldName];
      if (!field || !error) return;
      error.textContent = message;
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }

    Object.entries(fields).forEach(([fieldName, field]) => {
      if (!field) return;
      field.addEventListener("input", () => setFieldError(fieldName, ""));
      field.addEventListener("change", () => setFieldError(fieldName, ""));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formStatus.textContent = "";
      formStatus.classList.remove("is-error");

      const name = fields.name.value.trim();
      const phone = fields.phone.value.trim();
      const phoneDigits = phone.replace(/\D/g, "");
      const selectedDate = fields.date.value;
      const errorsByField = {
        name: name.length < 2 ? "Please enter a name with at least 2 characters." : "",
        phone: phoneDigits.length < 7 || phoneDigits.length > 15
          ? "Enter a valid phone number with 7 to 15 digits."
          : "",
        test: fields.test.value ? "" : "Please select a test or package.",
        date: !selectedDate || selectedDate < preferredDate.min
          ? "Choose today or a future preferred date."
          : ""
      };

      Object.entries(errorsByField).forEach(([fieldName, message]) => {
        setFieldError(fieldName, message);
      });

      const firstInvalidField = Object.keys(errorsByField).find((fieldName) => errorsByField[fieldName]);
      if (firstInvalidField) {
        formStatus.textContent = "Please review the highlighted fields. No information has been sent.";
        formStatus.classList.add("is-error");
        fields[firstInvalidField].focus();
        return;
      }

      const message = [
        "Hello, I would like to request an appointment.",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Test or package: ${fields.test.value}`,
        `Preferred date: ${selectedDate}`,
        "",
        "Please confirm availability and any preparation instructions. I understand this request is not confirmed until the laboratory replies."
      ].join("\n");

      if (openWhatsApp(message)) {
        formStatus.textContent = "WhatsApp opened with your request. Review it and press Send in WhatsApp. The laboratory must confirm your appointment.";
      } else {
        formStatus.textContent = "WhatsApp booking is not configured yet. Please contact the laboratory through a confirmed channel.";
        formStatus.classList.add("is-error");
      }
    });
  }
})();
