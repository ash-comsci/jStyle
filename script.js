/* ===========================
   j-SWAG | script.js
   Page navigation & product detail logic
   =========================== */

// ── Product Data ──────────────────────────────────────────────
const products = [
  {
    id: 0,
    name: "Classic Match Jersey",
    tag: "Apparel",
    desc: "Our signature performance-cut soccer jersey is crafted from ultra-lightweight moisture-wicking fabric that keeps you cool on and off the pitch. Features a clean V-collar, bold j-Swag chest branding, and reinforced stitching built to last season after season.",
    colors: [
      { hex: "#CC0000" },
      { hex: "#111111" },
      { hex: "#ffffff", border: true }
    ],
    features: [
      "100% recycled moisture-wicking polyester",
      "Athletic performance cut",
      "Sublimated number & logo graphics",
      "Available in Red/Black and White/Red colorways"
    ]
  },
  {
    id: 1,
    name: "Street Hoodie",
    tag: "Outerwear",
    desc: "The j-Swag Street Hoodie blends soccer culture with streetwear attitude. Constructed from 380gsm heavyweight cotton-fleece blend, it features a spacious kangaroo pocket, ribbed cuffs and hem, a double-lined hood with woven drawstrings, and an embroidered j-Swag logo on the chest.",
    colors: [
      { hex: "#111111" },
      { hex: "#CC0000" }
    ],
    features: [
      "380gsm heavyweight cotton-fleece blend",
      "Embroidered j-Swag chest logo",
      "Double-lined hood with woven drawcord",
      "Ribbed cuffs, waistband & hem"
    ]
  },
  {
    id: 2,
    name: "Pro Training Shorts",
    tag: "Bottoms",
    desc: "Built for the pitch and the street, our Pro Training Shorts feature bold side stripes, an elastic drawstring waistband, and built-in inner mesh lining. Lightweight construction means maximum freedom of movement whether you're drilling or just repping the brand.",
    colors: [
      { hex: "#ffffff", border: true },
      { hex: "#CC0000" },
      { hex: "#111111" }
    ],
    features: [
      "Lightweight 100% polyester construction",
      "Bold contrast side stripe panels",
      "Elastic waistband with internal drawcord",
      "Built-in inner mesh lining for comfort"
    ]
  },
  {
    id: 3,
    name: "Signature Snapback",
    tag: "Accessories",
    desc: "The j-Swag Signature Snapback is a clean structured 6-panel cap with a flat brim, premium embroidered front patch logo, and an adjustable snap closure at the back. Finished with a tonal underbrim and sweat-absorbing inner band — your everyday cap, elevated.",
    colors: [
      { hex: "#CC0000" },
      { hex: "#111111" }
    ],
    features: [
      "Structured 6-panel flat-brim design",
      "Embroidered j-Swag logo patch",
      "Adjustable snap closure — one size fits most",
      "Moisture-wicking inner sweatband"
    ]
  }
];

// ── DOM References ─────────────────────────────────────────────
const pageHome    = document.getElementById('page-home');
const pageDetail  = document.getElementById('page-detail');
const backBtn     = document.getElementById('back-btn');
const logoHome    = document.getElementById('logo-home');
const navLinks    = document.querySelectorAll('.nav-link');
const productCards = document.querySelectorAll('.product-card');

// Detail elements
const detailImage  = document.getElementById('detail-image');
const detailTag    = document.getElementById('detail-tag');
const detailName   = document.getElementById('detail-name');
const detailDesc   = document.getElementById('detail-desc');
const detailColors = document.getElementById('detail-colors');
const detailFeats  = document.getElementById('detail-features');

// ── Get the thumbnail SVG innerHTML from a card ────────────────
function getThumbnailSVG(productIndex) {
  const thumbEl = document.querySelector(`.product-card[data-product="${productIndex}"] .product-thumb svg`);
  return thumbEl ? thumbEl.outerHTML : '';
}

// ── Show product detail page ───────────────────────────────────
function showDetail(productIndex) {
  const product = products[productIndex];

  // --- Populate image (larger version of the same SVG) ---
  detailImage.innerHTML = getThumbnailSVG(productIndex);
  // Scale SVG to fill the container neatly
  const svgEl = detailImage.querySelector('svg');
  if (svgEl) {
    svgEl.setAttribute('width', '100%');
    svgEl.setAttribute('height', '100%');
    svgEl.style.width  = '100%';
    svgEl.style.height = '100%';
  }

  // --- Tag / Badge ---
  detailTag.textContent = product.tag;

  // --- Name ---
  detailName.textContent = product.name;

  // --- Description ---
  detailDesc.textContent = product.desc;

  // --- Colors ---
  detailColors.innerHTML = '';
  product.colors.forEach(c => {
    const dot = document.createElement('span');
    dot.className = 'color-dot';
    dot.style.background = c.hex;
    if (c.border) dot.style.border = '1px solid #ccc';
    detailColors.appendChild(dot);
  });

  // --- Features ---
  detailFeats.innerHTML = '';
  product.features.forEach(f => {
    const item = document.createElement('div');
    item.className = 'feature-item';
    item.innerHTML = `<span class="feature-dot"></span><span>${f}</span>`;
    detailFeats.appendChild(item);
  });

  // --- Page switch ---
  pageHome.classList.add('hidden');
  pageDetail.classList.remove('hidden');
  pageDetail.classList.remove('fade-in');
  void pageDetail.offsetWidth; // force reflow for re-trigger
  pageDetail.classList.add('fade-in');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update nav
  setActiveNav(null);
}

// ── Show home page ─────────────────────────────────────────────
function showHome() {
  pageDetail.classList.add('hidden');
  pageHome.classList.remove('hidden');
  pageHome.classList.remove('fade-in');
  void pageHome.offsetWidth;
  pageHome.classList.add('fade-in');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setActiveNav('home');
}

// ── Set active nav link ────────────────────────────────────────
function setActiveNav(page) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
}

// ── Size button toggle ─────────────────────────────────────────
function initSizeBtns() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ── Event Listeners ────────────────────────────────────────────

// Product cards
productCards.forEach(card => {
  card.addEventListener('click', () => {
    const productIndex = parseInt(card.dataset.product, 10);
    showDetail(productIndex);
  });
});

// Back button
backBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showHome();
});

// Logo → home
logoHome.addEventListener('click', () => {
  showHome();
});

// Nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (link.dataset.page === 'home') {
      showHome();
    } else {
      // Placeholder for About / Contact pages
      setActiveNav(link.dataset.page);
    }
  });
});

// ── Keyboard: Escape goes back ─────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !pageDetail.classList.contains('hidden')) {
    showHome();
  }
});

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSizeBtns();
  setActiveNav('home');
});
