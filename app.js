// ==========================================
// SWAD BIHAR - APP STATE & LOGIC
// ==========================================

// 1. MENU DATA
const MENU_ITEMS = [
  {
    id: "hyd-chk-bir",
    name: "Royal Hyderabadi Chicken Biriyani",
    desc: "Aromatic Basmati rice layered with juicy chicken, saffron, caramelized onions, and slow-cooked in a sealed clay handi.",
    price: 380,
    category: "biriyani",
    image: "assets/hero_biriyani.png",
    isVeg: false,
    isBestSeller: true,
    rating: 4.9
  },
  {
    id: "awd-mut-bir",
    name: "Awadhi Mutton Dum Biriyani",
    desc: "Fragrant rice slow-cooked with tender, melt-in-the-mouth mutton pieces marinated in royal Awadhi spices.",
    price: 490,
    category: "biriyani",
    image: "assets/hyderabadi_biriyani.png",
    isVeg: false,
    isBestSeller: true,
    rating: 4.8
  },
  {
    id: "niz-pan-bir",
    name: "Nizami Paneer Dum Biriyani",
    desc: "A vegetarian delight with premium paneer cubes marinated in fresh herbs, cooked in authentic dum style.",
    price: 340,
    category: "biriyani",
    image: "assets/hero_biriyani.png",
    isVeg: true,
    isBestSeller: false,
    rating: 4.6
  },
  {
    id: "kol-chk-bir",
    name: "Kolkata Chicken Dum Biriyani",
    desc: "A lighter, fragrant version of chicken biriyani with soft boiled potato and egg, cooked in light ghee and rose water.",
    price: 360,
    category: "biriyani",
    image: "assets/hyderabadi_biriyani.png",
    isVeg: false,
    isBestSeller: false,
    rating: 4.7
  },
  {
    id: "chk-tik-kebab",
    name: "Royal Tandoori Chicken Tikka",
    desc: "Juicy chicken chunks marinated in high-heat tandoori masala and charred to smoky perfection in clay oven.",
    price: 290,
    category: "starters",
    image: "assets/chicken_tikka.png",
    isVeg: false,
    isBestSeller: true,
    rating: 4.8
  },
  {
    id: "pan-tik-ang",
    name: "Paneer Tikka Angara",
    desc: "Fresh paneer blocks infused with spicy mustard-yogurt marinade, skewered with bell peppers and onions.",
    price: 260,
    category: "starters",
    image: "assets/chicken_tikka.png",
    isVeg: true,
    isBestSeller: false,
    rating: 4.5
  },
  {
    id: "luck-sk-kebab",
    name: "Lucknowi Mutton Seekh Kebab",
    desc: "Finely minced mutton mixed with aromatic spices, skewered and grilled over charcoal embers.",
    price: 350,
    category: "starters",
    image: "assets/chicken_tikka.png",
    isVeg: false,
    isBestSeller: false,
    rating: 4.7
  },
  {
    id: "shah-gul-jam",
    name: "Premium Shahi Gulab Jamun",
    desc: "Soft milk-solid dumplings dipped in warm cardamom and saffron syrup. Served warm (2 Pieces).",
    price: 110,
    category: "dessert",
    image: "assets/gulab_jamun.png",
    isVeg: true,
    isBestSeller: true,
    rating: 4.9
  },
  {
    id: "db-ka-meetha",
    name: "Double Ka Meetha",
    desc: "Hyderabadi bread pudding dessert fried in pure ghee, soaked in saffron syrup, and topped with dry fruits.",
    price: 130,
    category: "dessert",
    image: "assets/gulab_jamun.png",
    isVeg: true,
    isBestSeller: false,
    rating: 4.6
  },
  {
    id: "saf-las",
    name: "Royal Saffron Lassi",
    desc: "Creamy, thick yogurt drink infused with real saffron strands, pistachio bits, and rose essence.",
    price: 90,
    category: "beverages",
    image: "assets/gulab_jamun.png",
    isVeg: true,
    isBestSeller: false,
    rating: 4.7
  },
  {
    id: "mas-moj",
    name: "Mint Masala Mojito",
    desc: "Refreshing lime and fresh mint soda with a unique blend of Indian chaat masala spices.",
    price: 80,
    category: "beverages",
    image: "assets/gulab_jamun.png",
    isVeg: true,
    isBestSeller: false,
    rating: 4.5
  }
];

// 2. STATE VARIABLES
let cart = [];
let activeCategory = "all";
let searchQuery = "";
let currentReviewIndex = 0;
let countdownInterval = null;
let trackerTimeout = [];

// 3. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  initHeaderScroll();
  initMobileNav();
  initSearch();
  initCartSidebar();
  initCustomModal();
  initReviewsCarousel();
  initTableReservation();
  initCheckoutWizard();
});

// 4. FLOATING HEADER & MOBILE NAV
function initHeaderScroll() {
  const header = document.querySelector(".main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initMobileNav() {
  const mobileToggle = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");
  
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = mobileToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.className = "bx bx-x";
    } else {
      icon.className = "bx bx-menu-alt-right";
    }
  });

  // Close nav menu when clicking link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileToggle.querySelector("i").className = "bx bx-menu-alt-right";
    });
  });
}

// 5. SEARCH IMPLEMENTATION
function initSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const menuSearchInput = document.getElementById("menuSearchInput");
  const inlineSearchInput = document.getElementById("inlineSearchInput");

  // Global search button click (header)
  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    menuSearchInput.focus();
  });

  // Close search overlay
  closeSearchBtn.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });

  // Global Search Box Input
  menuSearchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    inlineSearchInput.value = searchQuery; // sync inputs
    renderMenu();
  });

  // Inline Search Box Input
  inlineSearchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    menuSearchInput.value = searchQuery; // sync inputs
    renderMenu();
  });
}

// 6. RENDER MENU CARDS
function renderMenu() {
  const menuGrid = document.getElementById("menuGrid");
  menuGrid.innerHTML = "";

  // Filter items
  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredItems.length === 0) {
    menuGrid.innerHTML = `
      <div class="empty-search text-center margin-top-lg" style="grid-column: 1 / -1; padding: 50px 0;">
        <i class="bx bx-search" style="font-size: 3.5rem; color: var(--border-color); margin-bottom: 15px;"></i>
        <h3>No dishes found</h3>
        <p style="color: var(--text-gray); margin-top: 8px;">Try searching for other keywords like 'mutton', 'paneer' or 'lassi'.</p>
      </div>
    `;
    return;
  }

  filteredItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";
    
    // Veg vs Non-Veg badge
    const vegBadgeHTML = item.isVeg 
      ? `<div class="card-veg-badge" title="Vegetarian"><span class="veg-indicator"></span></div>`
      : `<div class="card-veg-badge" title="Non-Vegetarian"><span class="nonveg-indicator"></span></div>`;

    // Special Tag
    const bestSellerHTML = item.isBestSeller 
      ? `<div class="card-badge-special">Bestseller</div>`
      : "";

    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${item.image}" alt="${item.name}" class="card-img">
        ${vegBadgeHTML}
        <div class="card-badges">
          ${bestSellerHTML}
        </div>
      </div>
      <div class="card-content">
        <div class="card-title-row">
          <h3>${item.name}</h3>
        </div>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <div class="footer-left">
            <span class="card-price">₹${item.price}</span>
          </div>
          <button class="add-to-cart-btn" data-id="${item.id}">
            Add <i class="bx bx-plus"></i>
          </button>
        </div>
      </div>
    `;

    // Add event listener to "Add" button
    card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
      openCustomizationModal(item.id);
    });

    menuGrid.appendChild(card);
  });
}

// Menu Tab clicks
const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    tabBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    activeCategory = e.target.getAttribute("data-category");
    renderMenu();
  });
});

// 7. CART SIDEBAR & STATE OPERATIONS
function initCartSidebar() {
  const cartBtn = document.getElementById("cartBtn");
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCartLink = document.querySelector(".close-cart-link");

  const toggleCart = () => {
    cartSidebar.classList.toggle("active");
    cartOverlay.classList.toggle("active");
  };

  cartBtn.addEventListener("click", toggleCart);
  closeCartBtn.addEventListener("click", toggleCart);
  cartOverlay.addEventListener("click", toggleCart);
  closeCartLink.addEventListener("click", toggleCart);
}

function addToCart(itemId, spiceLevel, portionSize, addons, quantity = 1) {
  const itemData = MENU_ITEMS.find(i => i.id === itemId);
  if (!itemData) return;

  // Calculate pricing based on options
  let basePrice = itemData.price;
  let priceMod = 0;
  
  if (portionSize === "Family Feast") {
    priceMod += 250;
  }

  let addonsPrice = 0;
  addons.forEach(addon => {
    addonsPrice += addon.price;
  });

  const pricePerUnit = basePrice + priceMod + addonsPrice;

  // Find if matching item exists (must match size, spice level, and addons exactly)
  const existingCartIndex = cart.findIndex(cartItem => {
    const isSameId = cartItem.id === itemId;
    const isSameSpice = cartItem.spiceLevel === spiceLevel;
    const isSameSize = cartItem.portionSize === portionSize;
    
    // Compare addons list
    if (cartItem.addons.length !== addons.length) return false;
    const addonsMatch = addons.every(add => cartItem.addons.some(cAdd => cAdd.name === add.name));
    
    return isSameId && isSameSpice && isSameSize && addonsMatch;
  });

  if (existingCartIndex > -1) {
    cart[existingCartIndex].quantity += quantity;
  } else {
    cart.push({
      id: itemId,
      name: itemData.name,
      image: itemData.image,
      spiceLevel: spiceLevel,
      portionSize: portionSize,
      addons: addons,
      quantity: quantity,
      pricePerUnit: pricePerUnit
    });
  }

  renderCart();
  showToast(`Added ${itemData.name} to basket!`, "success");
}

function updateCartItemQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
    showToast("Item removed from basket.", "");
  }
  renderCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  showToast("Item removed from basket.", "");
  renderCart();
}

function getCartSubtotal() {
  return cart.reduce((total, item) => total + (item.pricePerUnit * item.quantity), 0);
}

function renderCart() {
  const container = document.getElementById("cartItemsContainer");
  const cartFooter = document.getElementById("cartFooter");
  const cartBadge = document.getElementById("cartBadge");

  // Total quantity calculation
  const totalQty = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadge.innerText = totalQty;
  if (totalQty > 0) {
    cartBadge.style.transform = "scale(1.2)";
    setTimeout(() => cartBadge.style.transform = "scale(1)", 200);
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view">
        <i class="bx bx-shopping-bag empty-cart-icon"></i>
        <p>Your basket is empty.</p>
        <p class="empty-subtext">Add flavorful delights from our menu to start your order!</p>
        <button class="btn btn-outline" onclick="document.getElementById('closeCartBtn').click();">Browse Menu</button>
      </div>
    `;
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";
  container.innerHTML = "";

  cart.forEach((item, index) => {
    const itemCard = document.createElement("div");
    itemCard.className = "cart-item";

    const addonsText = item.addons.length > 0 
      ? ` + ${item.addons.map(a => a.name).join(', ')}`
      : "";
    const customizationDesc = `Spice: ${item.spiceLevel} | Portion: ${item.portionSize}${addonsText}`;

    itemCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <p class="cart-item-customizations">${customizationDesc}</p>
        <span class="cart-item-price">₹${item.pricePerUnit * item.quantity}</span>
      </div>
      <div class="cart-item-actions">
        <button class="remove-cart-item" data-index="${index}"><i class="bx bx-trash"></i></button>
        <div class="quantity-control">
          <button class="qty-btn dec-btn" data-index="${index}">-</button>
          <span class="qty-num">${item.quantity}</span>
          <button class="qty-btn inc-btn" data-index="${index}">+</button>
        </div>
      </div>
    `;

    // Event listeners
    itemCard.querySelector(".remove-cart-item").addEventListener("click", () => removeCartItem(index));
    itemCard.querySelector(".dec-btn").addEventListener("click", () => updateCartItemQty(index, -1));
    itemCard.querySelector(".inc-btn").addEventListener("click", () => updateCartItemQty(index, 1));

    container.appendChild(itemCard);
  });

  // Calculate pricing values
  const subtotal = getCartSubtotal();
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const delivery = 40; // Flat delivery
  const total = subtotal + tax + delivery;

  document.getElementById("subtotalVal").innerText = `₹${subtotal.toFixed(2)}`;
  document.getElementById("taxVal").innerText = `₹${tax.toFixed(2)}`;
  document.getElementById("deliveryVal").innerText = `₹${delivery.toFixed(2)}`;
  document.getElementById("grandTotalVal").innerText = `₹${total.toFixed(2)}`;
}

// 8. CUSTOMIZATION MODAL LOGIC
function initCustomModal() {
  const modal = document.getElementById("customModal");
  const closeBtn = document.getElementById("closeCustomModal");
  const form = document.getElementById("customizationForm");

  const closeModal = () => {
    modal.classList.remove("active");
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemId = document.getElementById("modalItemId").value;
    const spiceLevel = form.elements["spiceLevel"].value;
    const portionSize = form.elements["portionSize"].value;
    
    // Addons extraction
    const addons = [];
    const checkboxes = form.querySelectorAll('input[name="addons"]:checked');
    checkboxes.forEach(cb => {
      addons.push({
        name: cb.value,
        price: parseInt(cb.getAttribute("data-price"))
      });
    });

    addToCart(itemId, spiceLevel, portionSize, addons);
    closeModal();
    
    // Open Cart Sidebar
    setTimeout(() => {
      document.getElementById("cartSidebar").classList.add("active");
      document.getElementById("cartOverlay").classList.add("active");
    }, 400);
  });
}

function openCustomizationModal(itemId) {
  const itemData = MENU_ITEMS.find(item => item.id === itemId);
  if (!itemData) return;

  const modal = document.getElementById("customModal");
  
  // Populate details
  document.getElementById("modalItemId").value = itemId;
  document.getElementById("modalItemName").innerText = itemData.name;
  document.getElementById("modalItemDesc").innerText = itemData.desc;
  document.getElementById("modalItemPrice").innerText = `Base: ₹${itemData.price}`;

  // Reset form inputs
  const form = document.getElementById("customizationForm");
  form.reset();

  // Show Modal
  modal.classList.add("active");
}

// 9. TESTIMONIALS CAROUSEL
function initReviewsCarousel() {
  const carousel = document.getElementById("reviewsCarousel");
  const dots = document.querySelectorAll("#carouselDots .dot");
  const cards = document.querySelectorAll(".review-card");

  const slideTo = (index) => {
    dots.forEach(d => d.classList.remove("active"));
    cards.forEach(c => c.classList.remove("active"));
    
    dots[index].classList.add("active");
    cards[index].classList.add("active");
    carousel.style.transform = `translateX(-${index * 100}%)`;
    currentReviewIndex = index;
  };

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"));
      slideTo(idx);
    });
  });

  // Auto slide every 6 seconds
  setInterval(() => {
    let nextIndex = currentReviewIndex + 1;
    if (nextIndex >= cards.length) {
      nextIndex = 0;
    }
    slideTo(nextIndex);
  }, 6000);
}

// 10. TABLE RESERVATION
function initTableReservation() {
  const form = document.getElementById("tableReservationForm");
  
  // Set minimum date to today
  const dateInput = document.getElementById("resDate");
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("resName").value;
    const phone = document.getElementById("resPhone").value;
    const date = document.getElementById("resDate").value;
    const time = document.getElementById("resTime").value;

    showToast(`Table booked for ${name} on ${date} at ${time}!`, "success");
    form.reset();
  });
}

// 11. CHECKOUT WIZARD & LIVE TRACKER
function initCheckoutWizard() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeCheckoutModal = document.getElementById("closeCheckoutModal");
  const deliveryForm = document.getElementById("deliveryForm");
  const paymentForm = document.getElementById("paymentForm");
  const payMethodRadios = document.getElementsByName("payMethod");
  const backToDeliveryBtn = document.getElementById("backToDeliveryBtn");
  const btnBrowseMore = document.getElementById("btnBrowseMore");

  // Open Checkout
  checkoutBtn.addEventListener("click", () => {
    // Close cart first
    document.getElementById("cartSidebar").classList.remove("active");
    document.getElementById("cartOverlay").classList.remove("active");

    // Populate billing values
    const subtotal = getCartSubtotal();
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax + 40;
    document.getElementById("payableVal").innerText = `₹${total.toFixed(2)}`;
    
    // Update COD placeholder text
    const codPlaceholders = document.querySelectorAll(".cod-amount-placeholder");
    codPlaceholders.forEach(el => el.innerText = total.toFixed(2));

    // Show step 1
    showCheckoutStep(1);
    checkoutModal.classList.add("active");
  });

  // Close Checkout
  const closeAndResetCheckout = () => {
    checkoutModal.classList.remove("active");
    // clear active timeouts if order was completed
    trackerTimeout.forEach(clearTimeout);
    trackerTimeout = [];
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  };

  closeCheckoutModal.addEventListener("click", closeAndResetCheckout);
  btnBrowseMore.addEventListener("click", closeAndResetCheckout);

  // Delivery Submit
  deliveryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Validate delivery
    showCheckoutStep(2);
  });

  // Payment Option Toggles
  payMethodRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      // Toggle active design styles on labels
      document.querySelectorAll(".pay-option").forEach(lbl => lbl.classList.remove("active"));
      e.target.closest(".pay-option").classList.add("active");

      // Toggle form panels
      const value = e.target.value;
      document.querySelectorAll(".payment-panel").forEach(p => p.classList.remove("active"));
      
      if (value === "Card") {
        document.getElementById("cardPaymentPanel").classList.add("active");
      } else if (value === "UPI") {
        document.getElementById("upiPaymentPanel").classList.add("active");
      } else if (value === "COD") {
        document.getElementById("codPaymentPanel").classList.add("active");
      }
    });
  });

  // Back Button
  backToDeliveryBtn.addEventListener("click", () => {
    showCheckoutStep(1);
  });

  // Place Order Submit
  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Perform payment validation
    const method = paymentForm.elements["payMethod"].value;
    
    if (method === "Card") {
      const cardNum = document.getElementById("cardNum").value.trim();
      const cardExpiry = document.getElementById("cardExpiry").value.trim();
      const cardCvv = document.getElementById("cardCvv").value.trim();
      
      if (cardNum.length < 15 || cardExpiry.length < 5 || cardCvv.length < 3) {
        showToast("Please enter valid card details.", "");
        return;
      }
    } else if (method === "UPI") {
      const upiId = document.getElementById("upiId").value.trim();
      if (!upiId.includes("@")) {
        showToast("Please enter a valid UPI ID (e.g. name@upi).", "");
        return;
      }
    }

    // Success!
    showCheckoutStep(3);
    
    // Clear cart state
    cart = [];
    renderCart();

    // Start Live Order Tracking simulation
    startOrderTrackingSimulation();
  });
}

function showCheckoutStep(stepNumber) {
  // Toggle forms active classes
  document.querySelectorAll(".checkout-step-content").forEach(content => {
    content.classList.remove("active");
  });
  document.getElementById(`checkoutStep${stepNumber}`).classList.add("active");

  // Toggle indicator active state
  document.querySelectorAll(".checkout-steps .step").forEach((stepEl, idx) => {
    if (idx + 1 <= stepNumber) {
      stepEl.classList.add("active");
    } else {
      stepEl.classList.remove("active");
    }
  });
}

function startOrderTrackingSimulation() {
  // Generate random order ID
  const orderId = "#SB-" + Math.floor(10000 + Math.random() * 90000);
  document.getElementById("lblOrderId").innerText = orderId;

  // Reset steps
  const steps = [
    document.getElementById("timelineStep1"),
    document.getElementById("timelineStep2"),
    document.getElementById("timelineStep3"),
    document.getElementById("timelineStep4")
  ];

  steps.forEach(step => {
    step.className = "timeline-step";
  });
  
  // Set first step active
  steps[0].classList.add("active");
  steps[0].classList.add("current-step");

  // Timer countdown: 30 minutes
  let timeRemainingSeconds = 30 * 60;
  const timeLabel = document.getElementById("deliveryTimeCounter");
  const phoneContainer = document.getElementById("courierPhoneContainer");
  phoneContainer.style.display = "none";
  
  if (countdownInterval) clearInterval(countdownInterval);
  
  countdownInterval = setInterval(() => {
    timeRemainingSeconds--;
    if (timeRemainingSeconds <= 0) {
      clearInterval(countdownInterval);
      timeLabel.innerText = "Feast Delivered!";
      return;
    }
    const minutes = Math.floor(timeRemainingSeconds / 60);
    const seconds = timeRemainingSeconds % 60;
    timeLabel.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);

  // Simulated tracker advancement
  // Step 2 (Cooking): after 7 seconds
  trackerTimeout.push(setTimeout(() => {
    steps[0].classList.remove("current-step");
    steps[1].classList.add("active");
    steps[1].classList.add("current-step");
    showToast("Our Nizam Chefs have started cooking your order!", "success");
  }, 7000));

  // Step 3 (Dispatched): after 15 seconds
  trackerTimeout.push(setTimeout(() => {
    steps[1].classList.remove("current-step");
    steps[2].classList.add("active");
    steps[2].classList.add("current-step");
    phoneContainer.style.display = "inline-flex";
    showToast("Your Biriyani has been dispatched and is on the way!", "success");
  }, 16000));

  // Step 4 (Arrived): after 25 seconds
  trackerTimeout.push(setTimeout(() => {
    steps[2].classList.remove("current-step");
    steps[3].classList.add("active");
    steps[3].classList.add("current-step");
    showToast("Feast Arrived! Your hot royal Dum Biriyani is at your door.", "success");
  }, 26000));
}

// 12. TOAST SYSTEM
function showToast(message, type) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const icon = type === "success" ? "bx bx-check-circle" : "bx bx-info-circle";
  
  toast.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Slide-out and remove toast after 4 seconds
  setTimeout(() => {
    toast.style.transform = "translateX(-150%)";
    toast.style.opacity = "0";
    toast.style.transition = "all 0.4s ease";
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}
