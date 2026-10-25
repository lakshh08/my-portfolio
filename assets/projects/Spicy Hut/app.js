const menuItems = [
  { id: "lantern-pizza", name: "Lantern Pizza", category: "mains", price: 16, description: "Roasted peppers, basil, whipped ricotta, a little chili honey.", tag: "A little spicy", rating: "4.9", image: "photo-1579751626657-72bc17010498" },
  { id: "crispy-chicken", name: "Crispy Goodness", category: "mains", price: 18, description: "Buttermilk chicken, crunchy slaw, pickles, house sauce.", tag: "Guest favorite", rating: "5.0", image: "photo-1606755962773-d324e0a13086" },
  { id: "market-bowl", name: "The Market Bowl", category: "mains", price: 15, description: "Warm grains, greens, seasonal veggies, lemon tahini.", tag: "Plant happy", rating: "4.8", image: "photo-1512621776951-a57141f2eefd" },
  { id: "little-gems", name: "Little Gem Salad", category: "small-bites", price: 11, description: "Crisp leaves, shaved pear, toasted seeds, herby dressing.", tag: "Fresh & lovely", rating: "4.8", image: "photo-1512621776951-a57141f2eefd" },
  { id: "golden-fries", name: "Golden Hour Fries", category: "small-bites", price: 8, description: "Hand-cut potatoes, rosemary salt, sunny aioli.", tag: "Perfect for sharing", rating: "4.9", image: "photo-1573080496219-bb080dd4f877" },
  { id: "honey-cake", name: "Honey, Honey Cake", category: "sweet", price: 9, description: "Soft honey cake, vanilla cream, a little flaky salt.", tag: "Save room", rating: "5.0", image: "photo-1578985545062-69928b1d9587" },
  { id: "berry-sundae", name: "Berry Nice Sundae", category: "sweet", price: 8, description: "Vanilla bean scoop, summer berries, crunchy crumble.", tag: "Made for smiles", rating: "4.9", image: "photo-1563805042-7684c019e1cb" },
  { id: "citrus-fizz", name: "Citrus Garden Fizz", category: "drinks", price: 6, description: "Fresh citrus, garden mint, bubbles, zero proof.", tag: "Bright & bubbly", rating: "4.9", image: "photo-1544145945-f90425340c7e" }
].map(item => ({ ...item, imageUrl: `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=700&q=80` }));

const menuGrid = document.querySelector("#menu-grid");
const menuSearch = document.querySelector("#menu-search");
const noResults = document.querySelector("#no-results");
const toast = document.querySelector("#toast");
let activeCategory = "all";
let toastTimeout;

function renderMenu() {
  const query = menuSearch.value.trim().toLowerCase();
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = `${item.name} ${item.description} ${item.tag}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  menuGrid.innerHTML = filteredItems.map((item, index) => `
    <article class="menu-card" style="animation-delay:${Math.min(index * 45, 250)}ms">
      <div class="menu-card-image">
        <img src="${item.imageUrl}" alt="${item.name}" loading="lazy">
        <span class="menu-tag">${item.tag}</span>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-title-row"><h3>${item.name}</h3><span class="menu-price">$${item.price.toFixed(2)}</span></div>
        <p>${item.description}</p>
        <div class="menu-card-footer">
          <span class="menu-rating"><span>★★★★★</span> ${item.rating}</span>
        </div>
      </div>
    </article>`).join("");

  noResults.hidden = filteredItems.length > 0;
  menuGrid.hidden = filteredItems.length === 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function showConfirmation(title, message) {
  document.querySelector("#dialog-title").textContent = title;
  document.querySelector("#dialog-message").textContent = message;
  document.querySelector("#confirmation-dialog").showModal();
}

document.querySelector(".filter-list").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".filter-button").forEach(filter => filter.classList.toggle("active", filter === button));
  renderMenu();
});

menuSearch.addEventListener("input", renderMenu);
document.querySelector("#clear-search").addEventListener("click", () => {
  menuSearch.value = "";
  activeCategory = "all";
  document.querySelectorAll(".filter-button").forEach(button => button.classList.toggle("active", button.dataset.category === "all"));
  renderMenu();
  menuSearch.focus();
});

document.querySelector("#header-whatsapp-order").addEventListener("click", () => {
  showConfirmation("A pretend message, sent.", "This WhatsApp order is a demo. No real message was sent and no real order was placed.");
  showToast("WhatsApp order demo opened");
});

document.querySelector("#whatsapp-order").addEventListener("click", () => {
  showConfirmation("A pretend message, sent.", "This WhatsApp button is part of the demo. No message was sent and no real order was placed.");
});
document.querySelector("#close-dialog").addEventListener("click", () => document.querySelector("#confirmation-dialog").close());
document.querySelector("#done-dialog").addEventListener("click", () => document.querySelector("#confirmation-dialog").close());

document.querySelector(".search-toggle").addEventListener("click", () => {
  document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => menuSearch.focus(), 450);
});

const mobileMenuToggle = document.querySelector("#mobile-menu-toggle");
mobileMenuToggle.addEventListener("click", () => {
  const nav = document.querySelector(".main-nav");
  const isOpen = nav.classList.toggle("open");
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  mobileMenuToggle.textContent = isOpen ? "×" : "☰";
});
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("open");
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  mobileMenuToggle.setAttribute("aria-label", "Open navigation");
  mobileMenuToggle.textContent = "☰";
}));

renderMenu();
