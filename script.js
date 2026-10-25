// Store WhatsApp as international digits only, including country code, with no plus sign or spaces.
document.documentElement.classList.add("js-enabled");

const siteConfig = {
  whatsappNumber: "919781970410",
  email: "lakshaythakur175040@gmail.com",
  phone: "9781970410",
  projectSettings: {
    canonicalUrl: "https://lakshay.dev/"
  }
};

const projects = [
  {
    title: "Spicy Hut",
    category: "Restaurants & Cafes",
    description: "A restaurant website demo with a browsable menu, category filters, and a simulated WhatsApp ordering flow.",
    image: "restaurant",
    demoUrl: "assets/projects/Spicy%20Hut/index.html",
    status: "Demo website",
    technologies: ["HTML5", "CSS3", "JavaScript"]
  },
  {
    title: "Purpal Spa Saloon",
    category: "Salons & Beauty",
    description: "A multi-page salon and spa website demo with service discovery, a gallery, and appointment enquiry flows.",
    image: "salon",
    demoUrl: "assets/projects/Purpal%20Spa%20Saloon/index.html",
    status: "Demo website",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript"]
  },
  {
    title: "Chandel Lab",
    category: "Healthcare",
    description: "A diagnostic laboratory website demo presenting service information and enquiry paths for a local audience.",
    image: "lab",
    demoUrl: "assets/projects/Chandel%20lab/index.html",
    status: "Demo website",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript"]
  },
  {
    title: "Mandi Growth Co.",
    category: "Business Websites",
    description: "A general local business site concept built to explain services, trust points, and direct contact steps.",
    image: "business",
    demoUrl: "",
    status: "Demo concept",
    technologies: ["Business", "Lead Gen", "Custom UI"]
  }
];

const projectGrid = document.getElementById("projectsGrid");
const projectEmptyState = document.getElementById("projectEmptyState");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("formStatus");
const mainLinks = document.querySelectorAll(".main-nav a");
const currentYear = document.getElementById("currentYear");

const whatsappLinks = document.querySelectorAll(".whatsapp-link");
const emailLinks = document.querySelectorAll(".email-link");
const phoneLinks = document.querySelectorAll(".phone-link");
const sitePhoneLinks = document.querySelectorAll(".site-phone-link");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

function updateContactLinks() {
  const emailValue = siteConfig.email && siteConfig.email.trim();
  const phoneValue = siteConfig.phone && siteConfig.phone.trim();

  if (emailValue) {
    emailLinks.forEach((link) => {
      link.href = `mailto:${emailValue}`;
      link.classList.remove("hidden");
      link.textContent = emailValue;
    });
  }

  if (phoneValue) {
    phoneLinks.forEach((link) => {
      link.href = `tel:${phoneValue}`;
      link.classList.remove("hidden");
      link.textContent = phoneValue;
    });

    sitePhoneLinks.forEach((link) => {
      link.href = `tel:${phoneValue}`;
      link.textContent = `Call ${phoneValue}`;
    });
  }

  whatsappLinks.forEach((link) => {
    link.href = createWhatsAppLink({ message: "Hi Lakshay, I would like to discuss a new website project." });
  });
}

function applyCanonicalUrl() {
  const configuredUrl = siteConfig.projectSettings.canonicalUrl.trim();
  if (!configuredUrl) return;

  let canonicalUrl;
  try {
    canonicalUrl = new URL(configuredUrl);
  } catch (error) {
    console.error("The configured canonical URL is invalid.", error);
    return;
  }

  if (canonicalUrl.protocol !== "https:") {
    console.error("The canonical URL must use HTTPS.");
    return;
  }

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    const pageName = window.location.pathname.split("/").pop();
    canonicalLink.href = pageName && pageName !== "index.html"
      ? new URL(pageName, canonicalUrl).href
      : canonicalUrl.href;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createWhatsAppLink({ message, number = siteConfig.whatsappNumber }) {
  if (!number || !/^\d{10,15}$/.test(number)) {
    return "#";
  }

  const encodedMessage = encodeURIComponent(message || "Hello Lakshay, I would like to discuss a website project.");
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

function createGeneralInquiryMessage() {
  return "Hi Lakshay, I would like to discuss a website for my business.";
}

function createProjectInquiryMessage(serviceName = "website") {
  return `Hi Lakshay, I am interested in a ${serviceName} for my business and would like to discuss the project details.`;
}

function createPackageInquiryMessage(packageName, startingPrice) {
  const labels = {
    starter: "Starter Website",
    business: "Business Website",
    premium: "Premium Website"
  };

  return `Hi Lakshay! I'm interested in the ${labels[packageName] || "website package"} (${startingPrice}). Please share the details and next steps.`;
}

function createContactFormMessage(formData) {
  const lines = [
    "Hi Lakshay, I have a website enquiry.",
    `Name: ${formData.name}`,
    `Mobile number: ${formData.customerPhone}`,
    `Business: ${formData.businessName}`,
    `Category: ${formData.businessCategory}`,
    `Preferred service: ${formData.preferredService}`,
    formData.budget ? `Budget: ${formData.budget}` : "Budget: Not specified",
    `Requirements: ${formData.requirements}`
  ];

  return lines.join("\n");
}

function renderProjects(filter = "all") {
  if (!projectGrid) return;

  projectGrid.innerHTML = "";

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter((project) => project.category === filter);

  if (!filteredProjects.length) {
    projectGrid.innerHTML = "";
    projectEmptyState.classList.remove("hidden");
    return;
  }

  projectEmptyState.classList.add("hidden");

  filteredProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    const demoLink = project.demoUrl
      ? `<a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link inline-link">Open website demo</a>`
      : `<span class="project-link is-disabled">Demo coming soon</span>`;
    const projectPreview = project.demoUrl
      ? `<iframe src="${escapeHtml(project.demoUrl)}" title="${escapeHtml(project.title)} website preview" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>`
      : `<div class="project-mockup" aria-hidden="true">
          <div class="mockup-browser"><span></span><span></span><span></span><small>mandigrowth.co</small></div>
          <div class="mockup-content">
            <div class="mockup-nav"><strong>MANDI<span> GROWTH</span></strong><span>ABOUT&nbsp;&nbsp; SERVICES&nbsp;&nbsp; CONTACT</span></div>
            <p class="mockup-eyebrow">A LOCAL BUSINESS, ONLINE</p>
            <strong class="mockup-headline">Good work deserves<br>a great website.</strong>
            <span class="mockup-cta">Explore services&nbsp; ↗</span>
          </div>
        </div>`;

    card.innerHTML = `
      <div class="project-visual project--${project.image}">
        <div class="project-header">
          <span class="project-badge">${escapeHtml(project.status)}</span>
          <span class="project-badge">Preview</span>
        </div>
        ${projectPreview}
      </div>
      <div class="project-info">
        <div class="project-meta">
          <span class="project-category">${escapeHtml(project.category)}</span>
          <span class="project-status">${escapeHtml(project.status)}</span>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tech-stack">
          ${project.technologies.map((tech) => `<span>${escapeHtml(tech)}</span>`).join("")}
        </div>
        <div class="project-actions">
          ${demoLink}
          <a href="contact.html#contact" class="project-link inline-link">Discuss a similar website</a>
        </div>
      </div>
    `;

    projectGrid.appendChild(card);
  });

  revealOnScroll();
}

function revealOnScroll() {
  const revealItems = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}

function validateField(field) {
  const value = field.value.trim();
  const name = field.name;
  const errorElement = document.querySelector(`[data-error-for="${field.id}"]`);

  if (!field.required || name === "budget") {
    if (errorElement) errorElement.textContent = "";
    return true;
  }

  if (!value) {
    if (errorElement) errorElement.textContent = "This field is required.";
    field.setAttribute("aria-invalid", "true");
    return false;
  }

  if (name === "customerPhone") {
    const phoneDigits = value.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      if (errorElement) errorElement.textContent = "Enter a valid phone number with 7 to 15 digits.";
      field.setAttribute("aria-invalid", "true");
      return false;
    }
  }

  if (errorElement) errorElement.textContent = "";
  field.removeAttribute("aria-invalid");
  return true;
}

function showStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = "form-status";
  if (type) statusMessage.classList.add(type);
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const data = {
    name: String(formData.get("name") || "").trim(),
    customerPhone: String(formData.get("customerPhone") || "").trim(),
    businessName: String(formData.get("businessName") || "").trim(),
    businessCategory: String(formData.get("businessCategory") || "").trim(),
    preferredService: String(formData.get("preferredService") || "").trim(),
    budget: String(formData.get("budget") || "").trim(),
    requirements: String(formData.get("requirements") || "").trim()
  };

  const requiredFields = [
    document.getElementById("name"),
    document.getElementById("customerPhone"),
    document.getElementById("businessName"),
    document.getElementById("businessCategory"),
    document.getElementById("preferredService"),
    document.getElementById("requirements")
  ];

  let valid = true;
  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      valid = false;
    }
  });

  if (!valid) {
    showStatus("Please fix the highlighted fields before sending your enquiry.", "error");
    return;
  }

  const whatsappNumber = siteConfig.whatsappNumber;
  if (!whatsappNumber || !/^\d{10,15}$/.test(whatsappNumber)) {
    showStatus("WhatsApp is not configured. Update the international number in the site configuration before sending enquiries.", "error");
    return;
  }

  const message = createContactFormMessage(data);
  const url = createWhatsAppLink({ number: whatsappNumber, message });
  window.open(url, "_blank", "noopener");
  showStatus("Open WhatsApp to send your enquiry.", "success");
}

function toggleNav() {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function setActiveLinkFromHash() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  mainLinks.forEach((link) => {
    const isActive = link.dataset.page === page.replace(".html", "") && !link.closest(".nav-cta");
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateScrollTopButton() {
  if (!backToTop) return;

  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

function attachFaqHandlers() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("is-open");
        faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function attachConceptTabs() {
  const tabs = document.querySelectorAll(".concept-tab");
  const items = document.querySelectorAll(".menu-item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("is-active"));
      tab.classList.add("is-active");

      const type = tab.dataset.demoTab;
      items.forEach((item) => {
        const isHidden = type === "menu" ? false : true;
        item.style.display = isHidden ? "none" : "flex";
      });
    });
  });
}

function attachQuantityHandlers() {
  document.querySelectorAll(".qty-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".menu-item");
      const qty = item.querySelector(".qty-value");
      const currentValue = Number(qty.textContent || "1");
      const direction = button.dataset.direction === "increase" ? 1 : -1;
      const nextValue = Math.max(1, currentValue + direction);
      qty.textContent = String(nextValue);
    });
  });
}

function attachServiceButtons() {
  const serviceButtons = document.querySelectorAll(".service-cta, .package-cta");
  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.dataset.service || button.dataset.package;
      if (!service) return;
      const targetSection = document.getElementById("contact");
      targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });

      const isPackage = ["starter", "business", "premium"].includes(service);
      const message = isPackage
        ? createPackageInquiryMessage(service, button.dataset.price || "starting price shown on the website")
        : createProjectInquiryMessage(service);

      const url = createWhatsAppLink({ message });
      if (url !== "#") {
        window.open(url, "_blank", "noopener");
      } else {
        showStatus("WhatsApp is not configured. Update the international number in the site configuration before sending enquiries.", "error");
      }
    });
  });
}

function attachGeneralWhatsAppLinks() {
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const message = link.dataset.whatsappMessage || createGeneralInquiryMessage();
      const url = createWhatsAppLink({ message });
      if (url === "#") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
        showStatus("WhatsApp is not configured. Update the international number in the site configuration before sending enquiries.", "error");
        return;
      }
      window.open(url, "_blank", "noopener");
    });
  });
}

function handleNavLinks() {
  mainLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initBackToTop() {
  if (!backToTop) return;

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      renderProjects(button.dataset.filter);
    });
  });

  renderProjects("all");
}

if (navToggle && mainNav) {
  navToggle.addEventListener("click", toggleNav);
}

if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);
}

window.addEventListener("hashchange", setActiveLinkFromHash);
window.addEventListener("scroll", updateScrollTopButton);

handleNavLinks();
setActiveLinkFromHash();
attachFaqHandlers();
attachConceptTabs();
attachQuantityHandlers();
attachServiceButtons();
attachGeneralWhatsAppLinks();
updateContactLinks();
applyCanonicalUrl();
initBackToTop();
initProjectFilters();
updateScrollTopButton();

revealOnScroll();
