import { products, categories, formatPrice, infoContent } from './data.js?v=2';

const app = document.getElementById('app');

const state = {
  cart: readStorage('unio-cart', []),
  wishlist: readStorage('unio-wishlist', []),
  menuOpen: false,
  searchOpen: false,
  searchValue: '',
  newsletterMessage: '',
  checkoutDelivery: 'standard',
  productSelections: {},
};

const navItems = [
  ['Shop', '/shop'],
  ['New arrivals', '/new-arrivals'],
  ['Men', '/men'],
  ['Women', '/women'],
  ['Unisex', '/unisex'],
];

const categoryImages = [
  ['T-Shirts', 'core-tee.jpg'],
  ['Hoodies', 'form-hoodie.jpg'],
  ['Shirts', 'daily-shirt.jpg'],
  ['Pants', 'pleated-trouser.jpg'],
  ['Outerwear', 'workroom-jacket.jpg'],
  ['Accessories', 'daily-cap.jpg'],
];

const socialImages = [
  'wide-leg-denim.jpg',
  'studio-tee.jpg',
  'everyday-short.jpg',
  'core-tee.jpg',
];

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    if (!Array.isArray(value)) return fallback;

    if (key === 'unio-cart') {
      return value.filter((item) =>
        item &&
        typeof item.key === 'string' &&
        item.product &&
        typeof item.product.id === 'string' &&
        products.some((product) => product.id === item.product.id) &&
        typeof item.product.name === 'string' &&
        typeof item.product.price === 'number' &&
        Array.isArray(item.product.images) &&
        item.product.images.length > 0 &&
        Number.isFinite(item.quantity) &&
        item.quantity > 0
      );
    }

    if (key === 'unio-wishlist') {
      return value.filter((item) =>
        item &&
        typeof item.id === 'string' &&
        products.some((product) => product.id === item.id)
      );
    }

    return value;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentRoute() {
  const rawHash = window.location.hash || '#/';
  const cleanHash = rawHash.startsWith('#') ? rawHash.slice(1) : rawHash;
  const [path, query = ''] = cleanHash.split('?');
  return {
    path: path || '/',
    search: new URLSearchParams(query),
  };
}

function navigate(path, params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const hash = queryString ? `${path}?${queryString}` : path;
  window.location.hash = hash;
}

function isActivePath(path) {
  const route = getCurrentRoute().path;
  if (path === '/shop') {
    return ['/shop', '/new-arrivals', '/men', '/women', '/unisex', '/t-shirts', '/oversized-t-shirts', '/shirts', '/hoodies', '/sweatshirts', '/pants', '/cargo-pants', '/jeans', '/shorts', '/jackets', '/outerwear', '/caps', '/bags', '/belts', '/accessories'].includes(route);
  }
  return route === path;
}

function icon(name, size = 19, stroke = 1.8) {
  const common = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"`;

  switch (name) {
    case 'search':
      return `<svg ${common}><circle cx="11" cy="11" r="6"></circle><path d="m16 16 5 5"></path></svg>`;
    case 'heart':
      return `<svg ${common}><path d="M12 21s-7.5-4.35-9.5-8.19C1.09 10.67 2.34 6 6.8 6c2.3 0 3.5 1.4 4.2 2.3.7-.9 1.9-2.3 4.2-2.3 4.45 0 5.71 4.67 4.3 6.81C19.5 16.65 12 21 12 21Z"></path></svg>`;
    case 'bag':
      return `<svg ${common}><path d="M6 9h12l-1 10H7L6 9Z"></path><path d="M9 9V7a3 3 0 1 1 6 0v2"></path></svg>`;
    case 'menu':
      return `<svg ${common}><path d="M3 6h18M3 12h18M3 18h18"></path></svg>`;
    case 'close':
      return `<svg ${common}><path d="M6 6l12 12M18 6L6 18"></path></svg>`;
    case 'arrow-right':
      return `<svg ${common}><path d="M5 12h14"></path><path d="m13 5 7 7-7 7"></path></svg>`;
    case 'arrow-left':
      return `<svg ${common}><path d="M19 12H5"></path><path d="m11 5-7 7 7 7"></path></svg>`;
    case 'chevron-down':
      return `<svg ${common}><path d="m6 9 6 6 6-6"></path></svg>`;
    case 'user':
      return `<svg ${common}><circle cx="12" cy="8" r="4"></circle><path d="M5 20c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5"></path></svg>`;
    case 'trash':
      return `<svg ${common}><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path></svg>`;
    case 'plus':
      return `<svg ${common}><path d="M12 5v14M5 12h14"></path></svg>`;
    case 'minus':
      return `<svg ${common}><path d="M5 12h14"></path></svg>`;
    case 'sliders':
      return `<svg ${common}><path d="M4 6h16"></path><path d="M7 12h10"></path><path d="M10 18h4"></path><circle cx="7" cy="6" r="2"></circle><circle cx="17" cy="12" r="2"></circle><circle cx="12" cy="18" r="2"></circle></svg>`;
    default:
      return `''`;
  }
}

function getProductSelection(productId) {
  const product = products.find((item) => item.id === productId) || products[0];
  const existing = state.productSelections[productId];
  if (existing) return existing;
  const defaultSelection = {
    color: product.colors?.[0] || '',
    size: product.sizes?.[0] || '',
    quantity: 1,
    imageIndex: 0,
  };
  state.productSelections[productId] = defaultSelection;
  return defaultSelection;
}

function isWishlisted(id) {
  return state.wishlist.some((item) => item.id === id);
}

function addToCart(product, options = {}) {
  const key = `${product.id}-${options.size || product.sizes?.[0] || 'one'}-${options.color || product.colors?.[0] || 'default'}`;
  const existing = state.cart.find((item) => item.key === key);

  if (existing) {
    existing.quantity += options.quantity || 1;
  } else {
    state.cart.push({
      key,
      product,
      size: options.size || product.sizes?.[0],
      color: options.color || product.colors?.[0],
      quantity: options.quantity || 1,
    });
  }

  saveStorage('unio-cart', state.cart);
  render();
}

function updateCartQuantity(key, nextQuantity) {
  state.cart = state.cart
    .map((item) => (item.key === key ? { ...item, quantity: nextQuantity } : item))
    .filter((item) => item.quantity > 0);
  saveStorage('unio-cart', state.cart);
  render();
}

function removeFromCart(key) {
  state.cart = state.cart.filter((item) => item.key !== key);
  saveStorage('unio-cart', state.cart);
  render();
}

function toggleWishlist(product) {
  const exists = isWishlisted(product.id);
  state.wishlist = exists
    ? state.wishlist.filter((item) => item.id !== product.id)
    : [...state.wishlist, product];
  saveStorage('unio-wishlist', state.wishlist);
  render();
}

function renderProductCard(product) {
  const wishlistActive = isWishlisted(product.id);

  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <a href="#/product/${product.id}">
          <img src="${product.images[0]}" alt="${product.name}" />
          <img class="product-image-hover" src="${product.images[1] || product.images[0]}" alt="" />
        </a>

        <div class="product-flags">
          ${product.isNew ? '<span>New</span>' : ''}
          ${product.isSale ? '<span class="sale-flag">Sale</span>' : ''}
        </div>

        <button class="wishlist-button ${wishlistActive ? 'active' : ''}" type="button" aria-label="${wishlistActive ? 'Remove from wishlist' : 'Add to wishlist'}" data-action="toggle-wishlist" data-product-id="${product.id}">
          ${icon('heart', 17, 2)}
        </button>

        <button class="quick-add" type="button" data-action="quick-add" data-product-id="${product.id}">
          Quick add
          ${icon('plus', 15, 2)}
        </button>
      </div>

      <div class="product-info">
        <a href="#/product/${product.id}"><h3>${product.name}</h3></a>
        <span>${product.category}</span>
        <div>
          <strong>${formatPrice(product.price)}</strong>
          ${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ''}
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid(items) {
  return `
    <div class="product-grid">
      ${items.map((product) => renderProductCard(product)).join('')}
    </div>
  `;
}

function renderHeader() {
  const route = getCurrentRoute();
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return `
    <div class="announcement">
      Free islandwide delivery on orders over Rs. 10,000
      <span>·</span>
      Easy exchanges within 14 days
    </div>

    <header class="site-header">
      <button class="icon-button mobile-only" type="button" aria-label="${state.menuOpen ? 'Close menu' : 'Open menu'}" aria-expanded="${state.menuOpen}" aria-controls="mobile-menu" data-action="toggle-menu">
        ${icon('menu', 21, 2)}
      </button>

      <a class="logo" href="#/" data-action="home">unio<span>clothing</span></a>

      <nav class="desktop-nav">
        ${navItems.map(([label, path]) => `<a href="#${path}" class="${isActivePath(path) ? 'active' : ''}">${label}</a>`).join('')}
        <a href="#/shop" class="${isActivePath('/shop') ? 'active' : ''}">Collections</a>
        <a href="#/shop?sale=true" class="sale-link ${getCurrentRoute().search.get('sale') === 'true' ? 'active' : ''}">Sale</a>
      </nav>

      <div class="header-actions">
        <button class="icon-button" type="button" aria-label="Search" data-action="toggle-search">
          ${icon('search', 19, 2)}
        </button>

        <a class="icon-button desktop-only" href="#/account" aria-label="Account">
          ${icon('user', 19, 2)}
        </a>

        <a class="icon-button count-wrap" href="#/wishlist" aria-label="Wishlist, ${wishlistCount} items">
          ${icon('heart', 19, 2)}
          ${wishlistCount > 0 ? `<b>${wishlistCount}</b>` : ''}
        </a>

        <a class="icon-button count-wrap" href="#/cart" aria-label="Cart, ${cartCount} items">
          ${icon('bag', 19, 2)}
          ${cartCount > 0 ? `<b>${cartCount}</b>` : ''}
        </a>
      </div>
    </header>

    ${state.searchOpen ? `
      <div class="search-layer">
        <form data-form="search">
          ${icon('search', 22, 2)}
          <input data-search-input type="search" value="${state.searchValue}" placeholder="Search the collection" aria-label="Search the collection" autofocus />
          <button class="icon-button" type="button" aria-label="Close search" data-action="toggle-search">
            ${icon('close', 18, 2)}
          </button>
        </form>
      </div>
    ` : ''}

    ${state.menuOpen ? `
      <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-top">
          <a class="logo" href="#/" data-action="home">unio<span>clothing</span></a>
          <button class="icon-button" type="button" aria-label="Close menu" data-action="toggle-menu">
            ${icon('close', 20, 2)}
          </button>
        </div>

        ${navItems.map(([label, path]) => `<a href="#${path}" data-action="close-menu">${label}${icon('arrow-right', 16, 2)}</a>`).join('')}
        <a href="#/account" data-action="close-menu">Account${icon('arrow-right', 16, 2)}</a>

        <div class="mobile-category">
          <span>Categories</span>
          ${categories.slice(0, 8).map((category) => `<a href="#/shop?category=${encodeURIComponent(category)}">${category}</a>`).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

function renderFooter() {
  return `
    <footer>
      <div class="footer-main">
        <div>
          <a class="logo" href="#/" data-action="home">unio<span>clothing</span></a>
          <p>Modern essentials designed for everyone.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <a href="#/men">Men</a>
          <a href="#/women">Women</a>
          <a href="#/unisex">Unisex</a>
          <a href="#/new-arrivals">New arrivals</a>
        </div>

        <div>
          <h4>Help</h4>
          <a href="#/contact">Contact</a>
          <a href="#/faq">FAQ</a>
          <a href="#/size-guide">Size guide</a>
          <a href="#/contact">Shipping &amp; returns</a>
        </div>

        <div>
          <h4>Company</h4>
          <a href="#/about">About us</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
        </div>

        <div class="newsletter">
          <h4>Stay in the loop</h4>
          <p>First access to new drops and quiet surprises.</p>
          <form data-form="newsletter">
            <label class="sr-only" for="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" required placeholder="Your email address" />
            <button class="button button-dark" type="submit">Join ${icon('arrow-right', 15, 2)}</button>
          </form>
          ${state.newsletterMessage ? `<p class="newsletter-message" role="status">${state.newsletterMessage}</p>` : ''}
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 unioclothing, Colombo, Sri Lanka</span>
        <span><a href="#/privacy">Privacy</a> <a href="#/terms">Terms</a></span>
        <span>Made for every body.</span>
      </div>
    </footer>
  `;
}

function renderHome() {
  const featured = products.filter((product) => product.isNew).slice(0, 4);

  return `
    <section class="hero">
      <img src="./assets/images/hero.jpg" alt="Friends wearing modern neutral clothing in a sunlit studio" />
      <div class="hero-content">
        <p class="eyebrow">The everyday edit / 01</p>
        <h1>Wear<br /><em>your way.</em></h1>
        <p>Modern essentials designed for everyone.</p>
        <div class="hero-actions">
          <a class="button button-light" href="#/men">Shop men ${icon('arrow-right', 16, 2)}</a>
          <a class="button button-light" href="#/women">Shop women ${icon('arrow-right', 16, 2)}</a>
          <a class="button button-outline-light" href="#/unisex">Shop unisex</a>
        </div>
      </div>
      <span class="hero-index">01 / 03</span>
    </section>

    <section class="section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Just landed</p>
          <h2>New arrivals</h2>
        </div>
        <a class="text-link" href="#/new-arrivals">View all ${icon('arrow-right', 15, 2)}</a>
      </div>
      ${renderProductGrid(featured)}
    </section>

    <section class="category-band">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Find your uniform</p>
          <h2>Shop by category</h2>
        </div>
      </div>

      <div class="category-grid">
        ${categoryImages.map(([label, photo]) => `
          <a class="category-card" href="#/shop?category=${encodeURIComponent(label)}">
            <img src="./assets/images/${photo}" alt="${label}" />
            <span>${label} ${icon('arrow-right', 16, 2)}</span>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="editorial">
      <img src="./assets/images/editorial.jpg" alt="Model in relaxed unisex tailoring" />
      <div class="editorial-copy">
        <p class="eyebrow">The unisex collection</p>
        <h2>Made for<br /><em>everyone.</em></h2>
        <p>Minimal silhouettes. Everyday comfort. No boundaries.</p>
        <a class="button button-light" href="#/unisex">Explore unisex ${icon('arrow-right', 16, 2)}</a>
      </div>
    </section>

    <section class="section trending">
      <div class="section-heading">
        <div>
          <p class="eyebrow">In rotation</p>
          <h2>Trending now</h2>
        </div>
        <a class="text-link" href="#/shop">Shop the edit ${icon('arrow-right', 15, 2)}</a>
      </div>
      ${renderProductGrid(products.slice(8, 12))}
    </section>

    <section class="statement">
      <p>We believe in clothes<br />that let <em>you</em> be seen.</p>
      <a class="text-link" href="#/about">Our story ${icon('arrow-right', 15, 2)}</a>
    </section>

    <section class="social-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">@unioclothing</p>
          <h2>In the wild</h2>
        </div>
        <a class="text-link" href="https://instagram.com" target="_blank" rel="noreferrer">Follow along ${icon('arrow-right', 15, 2)}</a>
      </div>

      <div class="social-grid">
        ${socialImages.map((photo, index) => `<img src="./assets/images/${photo}" alt="unioclothing community style ${index + 1}" />`).join('')}
      </div>
    </section>
  `;
}

function renderListing(options = {}) {
  const route = getCurrentRoute();
  const title = options.title || 'Shop all';
  const filterGroup = options.group || '';
  const forcedCategory = options.category || '';
  const selectedCategory = route.search.get('category') || forcedCategory;
  const query = route.search.get('q') || options.query || '';
  const sort = route.search.get('sort') || 'Featured';
  const isNewArrival = title === 'New arrivals';

  let items = products.filter((product) => {
    const matchesGroup = !filterGroup || product.group === filterGroup;
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesNew = !isNewArrival || product.isNew;
    const searchableText = `${product.name} ${product.category} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
    const matchesQuery = !query || searchableText.includes(query.toLowerCase());
    return matchesGroup && matchesCategory && matchesNew && matchesQuery;
  });

  if (route.search.get('sale') === 'true') {
    items = items.filter((product) => product.isSale);
  }

  if (sort === 'Price low to high') {
    items = [...items].sort((a, b) => a.price - b.price);
  } else if (sort === 'Price high to low') {
    items = [...items].sort((a, b) => b.price - a.price);
  } else if (sort === 'Newest') {
    items = [...items].sort((a, b) => Number(b.isNew) - Number(a.isNew));
  }

  return `
    <section class="listing section">
      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <span>${title}</span>
      </div>

      <div class="listing-title">
        <div>
          <p class="eyebrow">The collection</p>
          <h1>${title}</h1>
          <p class="muted">${items.length} pieces to make your own.</p>
        </div>
        <button class="filter-mobile button button-outline" type="button" data-action="toggle-filters">
          ${icon('sliders', 16, 2)}
          Filters
        </button>
      </div>

      <div class="listing-toolbar">
        <div class="filter-links ${state.menuOpen ? 'open' : ''}">
          <button type="button" class="${!selectedCategory ? 'selected' : ''}" data-action="clear-category">All</button>
          ${categories.map((item) => `<button type="button" class="${selectedCategory === item ? 'selected' : ''}" data-action="select-category" data-category="${item}">${item}</button>`).join('')}
        </div>

        <label class="sort-label">
          Sort by
          <select data-sort-select>
            <option ${sort === 'Featured' ? 'selected' : ''}>Featured</option>
            <option ${sort === 'Newest' ? 'selected' : ''}>Newest</option>
            <option ${sort === 'Price low to high' ? 'selected' : ''}>Price low to high</option>
            <option ${sort === 'Price high to low' ? 'selected' : ''}>Price high to low</option>
          </select>
          ${icon('chevron-down', 14, 2)}
        </label>
      </div>

      ${items.length ? renderProductGrid(items) : `
        <div class="empty-state">
          <h2>Nothing here yet.</h2>
          <p>Try a different category or search term.</p>
          <a class="button button-dark" href="#/shop">View all pieces</a>
        </div>
      `}
    </section>
  `;
}

function renderProductPage() {
  const route = getCurrentRoute();
  const productId = route.path.replace(/^\/product\//, '');
  const product = products.find((item) => item.id === productId);
  if (!product) return renderNotFound();
  const selection = getProductSelection(product.id);

  return `
    <section class="product-page section">
      <div class="breadcrumbs">
        <a href="#/shop">Shop</a>
        <span>/</span>
        <span>${product.name}</span>
      </div>

      <div class="product-detail">
        <div class="gallery">
          <div class="gallery-main">
            <img src="${product.images[selection.imageIndex] || product.images[0]}" alt="${product.name}" />
          </div>
          <div class="thumbnail-row">
            ${product.images.map((src, index) => `
              <button type="button" class="${selection.imageIndex === index ? 'selected' : ''}" data-action="set-product-image" data-image-index="${index}" data-product-id="${product.id}" aria-label="Show ${product.name} image ${index + 1}">
                <img src="${src}" alt="${product.name} view ${index + 1}" />
              </button>
            `).join('')}
          </div>
        </div>

        <div class="product-copy">
          <p class="eyebrow">${product.category} / ${product.group}</p>
          <h1>${product.name}</h1>
          <div class="rating">★★★★★<span>${product.rating} · ${product.reviews} reviews</span></div>
          <div class="detail-price">
            <strong>${formatPrice(product.price)}</strong>
            ${product.oldPrice ? `<del>${formatPrice(product.oldPrice)}</del>` : ''}
          </div>
          <p class="detail-description">${product.description}</p>

          <div class="option-block">
            <div class="option-heading">
              <span>Colour</span>
              <strong>${selection.color}</strong>
            </div>
            <div class="swatches">
              ${product.colors.map((item) => `
                <button type="button" class="${selection.color === item ? 'selected' : ''}" aria-label="Select ${item} colour" aria-pressed="${selection.color === item}" data-action="set-product-color" data-color="${item}" data-product-id="${product.id}">
                  <span style="background: ${['cream', 'white'].includes(item.toLowerCase()) ? '#eee9df' : item.toLowerCase()};"></span>
                </button>
              `).join('')}
            </div>
          </div>

          ${product.sizes.length > 1 ? `
            <div class="option-block">
              <div class="option-heading">
                <span>Size</span>
                <a href="#/size-guide">Size guide</a>
              </div>
              <div class="sizes">
                ${product.sizes.map((item) => `
                  <button type="button" class="${selection.size === item ? 'selected' : ''}" aria-pressed="${selection.size === item}" data-action="set-product-size" data-size="${item}" data-product-id="${product.id}">${item}</button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="buy-row">
            <div class="quantity">
              <button type="button" aria-label="Decrease quantity" data-action="decrement-quantity" data-product-id="${product.id}">${icon('minus', 15, 2)}</button>
              <span>${selection.quantity}</span>
              <button type="button" aria-label="Increase quantity" data-action="increment-quantity" data-product-id="${product.id}">${icon('plus', 15, 2)}</button>
            </div>
            <button class="button button-dark add-button" type="button" data-action="add-to-bag" data-product-id="${product.id}">Add to bag ${icon('bag', 16, 2)}</button>
            <button class="icon-button detail-wish ${isWishlisted(product.id) ? 'active' : ''}" type="button" aria-label="Wishlist" data-action="toggle-wishlist" data-product-id="${product.id}">
              ${icon('heart', 19, 2)}
            </button>
          </div>

          <div class="detail-accordions">
            <details open>
              <summary>Details ${icon('plus', 15, 2)}</summary>
              <p>${product.description} Made to be worn often, washed well, and lived in. Explore the full fit and material notes in our size guide.</p>
            </details>
            <details>
              <summary>Shipping &amp; returns ${icon('plus', 15, 2)}</summary>
              <p>Islandwide delivery is complimentary over Rs. 10,000. Exchanges are accepted within 14 days of delivery.</p>
            </details>
          </div>
        </div>
      </div>

      <div class="section related">
        <div class="section-heading">
          <h2>You may also like</h2>
        </div>
        ${renderProductGrid(products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4))}
      </div>
    </section>
  `;
}

function renderCart() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal >= 10000 || subtotal === 0 ? 0 : 450;

  return `
    <section class="section cart-page">
      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <span>Shopping bag</span>
      </div>

      <h1>Your bag <span>(${state.cart.length})</span></h1>

      ${state.cart.length ? `
        <div class="cart-layout">
          <div class="cart-items">
            ${state.cart.map((item) => `
              <div class="cart-item" key="${item.key}">
                <img src="${item.product.images[0]}" alt="${item.product.name}" />
                <div class="cart-item-copy">
                  <a href="#/product/${item.product.id}"><h3>${item.product.name}</h3></a>
                  <p>${item.color} / ${item.size}</p>
                  <strong>${formatPrice(item.product.price)}</strong>
                  <div class="cart-controls">
                    <div class="quantity">
                      <button type="button" aria-label="Decrease quantity" data-action="update-cart-quantity" data-key="${item.key}" data-quantity="${item.quantity - 1}">${icon('minus', 13, 2)}</button>
                      <span>${item.quantity}</span>
                      <button type="button" aria-label="Increase quantity" data-action="update-cart-quantity" data-key="${item.key}" data-quantity="${item.quantity + 1}">${icon('plus', 13, 2)}</button>
                    </div>
                    <button class="remove-button" type="button" data-action="remove-cart-item" data-key="${item.key}">${icon('trash', 14, 2)} Remove</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <aside class="summary">
            <h2>Summary</h2>
            <div><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div>
            <div><span>Delivery</span><strong>${delivery ? formatPrice(delivery) : 'Free'}</strong></div>
            <hr />
            <div class="summary-total"><span>Total</span><strong>${formatPrice(subtotal + delivery)}</strong></div>
            <a class="button button-dark full-button" href="#/checkout">Proceed to checkout ${icon('arrow-right', 16, 2)}</a>
            <a class="continue-link" href="#/shop">${icon('arrow-left', 15, 2)} Continue shopping</a>
          </aside>
        </div>
      ` : `
        <div class="empty-state cart-empty">
          ${icon('bag', 35, 1.2)}
          <h2>Your bag is waiting.</h2>
          <p>It looks better with a few essentials in it.</p>
          <a class="button button-dark" href="#/shop">Explore the collection</a>
        </div>
      `}
    </section>
  `;
}

function renderWishlist() {
  return `
    <section class="section wishlist-page">
      <div class="breadcrumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <span>Wishlist</span>
      </div>

      <h1>Your wishlist <span>(${state.wishlist.length})</span></h1>

      ${state.wishlist.length ? `
        <div class="product-grid">
          ${state.wishlist.map((product) => `
            <div class="wish-card">
              ${renderProductCard(product)}
              <button class="wish-move" type="button" data-action="move-to-bag" data-product-id="${product.id}">Move to bag ${icon('arrow-right', 15, 2)}</button>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state">
          ${icon('heart', 35, 1.2)}
          <h2>Save what speaks to you.</h2>
          <p>Tap the heart on any piece to keep it close.</p>
          <a class="button button-dark" href="#/shop">Explore the collection</a>
        </div>
      `}
    </section>
  `;
}

function renderCheckout() {
  const route = getCurrentRoute();
  const placed = route.search.get('placed') === '1';
  const { subtotal, standardDelivery, delivery, total } = getCheckoutTotals();
  const selectedDelivery = state.checkoutDelivery;

  if (placed) {
    return `
      <section class="success-page section">
        <div>
          <span class="success-mark">✓</span>
          <p class="eyebrow">Order received</p>
          <h1>Thank you<br /><em>for choosing unio.</em></h1>
          <p>Your order is on its way to becoming part of your everyday. We’ll send confirmation details to your email.</p>
          <a class="button button-dark" href="#/shop">Continue shopping ${icon('arrow-right', 16, 2)}</a>
        </div>
      </section>
    `;
  }

  return `
    <section class="section checkout-page">
      <div class="breadcrumbs">
        <a href="#/cart">Your bag</a>
        <span>/</span>
        <span>Checkout</span>
      </div>

      <div class="checkout-layout">
        <div>
          <h1>Checkout</h1>
          <form data-form="checkout">
            <fieldset>
              <legend>01 / Contact</legend>
              <div class="form-grid">
                <label>Full name<input required placeholder="Your full name" /></label>
                <label>Email address<input required type="email" placeholder="you@example.com" /></label>
                <label>Phone number<input required placeholder="+94 77 000 0000" /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>02 / Delivery address</legend>
              <div class="form-grid">
                <label class="wide">Address<input required placeholder="Street address" /></label>
                <label>City<input required placeholder="Colombo" /></label>
                <label>District<select required>
                  <option value="" selected disabled>Select district</option>
                  <option>Colombo</option>
                  <option>Gampaha</option>
                  <option>Kandy</option>
                  <option>Galle</option>
                  <option>Other</option>
                </select></label>
                <label>Postal code<input required placeholder="00000" /></label>
              </div>
            </fieldset>

            <fieldset>
              <legend>03 / Delivery method</legend>
              <label class="radio-row"><input type="radio" name="delivery" value="standard" ${selectedDelivery === 'standard' ? 'checked' : ''} /> Standard delivery <span>${standardDelivery === 0 ? 'Free' : formatPrice(standardDelivery)}</span></label>
              <label class="radio-row"><input type="radio" name="delivery" value="express" ${selectedDelivery === 'express' ? 'checked' : ''} /> Express delivery <span>Rs. 850</span></label>
            </fieldset>

            <fieldset>
              <legend>04 / Payment</legend>
              <label class="radio-row"><input type="radio" name="payment" checked /> Cash on delivery</label>
              <label class="radio-row"><input type="radio" name="payment" /> Card on delivery</label>
              <label class="radio-row"><input type="radio" name="payment" /> Bank transfer</label>
            </fieldset>

            <button class="button button-dark place-order" type="submit">Place order ${icon('arrow-right', 16, 2)}</button>
          </form>
        </div>

        <aside class="summary checkout-summary">
          <h2>Order summary</h2>
          ${state.cart.length ? state.cart.map((item) => `
            <div class="mini-item">
              <img src="${item.product.images[0]}" alt="" />
              <span>${item.product.name}<small>${item.color} / ${item.size} · Qty ${item.quantity}</small></span>
              <strong>${formatPrice(item.product.price * item.quantity)}</strong>
            </div>
          `).join('') : '<p class="muted">Your bag is empty.</p>'}
          <hr />
          <div><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div>
          <div><span>Delivery</span><strong data-checkout-delivery>${delivery === 0 ? 'Free' : formatPrice(delivery)}</strong></div>
          <div class="summary-total"><span>Total</span><strong data-checkout-total>${formatPrice(total)}</strong></div>
        </aside>
      </div>
    </section>
  `;
}

function renderInfo(type) {
  const content = infoContent[type] || infoContent.about;
  const [title, lead, paragraph1, paragraph2] = content;

  const sizeTable = type === 'size-guide' ? `
    <div class="size-table">
      <div><span>Size</span><span>Chest</span><span>Waist</span></div>
      ${[['XS', '86–91 cm', '71–76 cm'], ['S', '91–96 cm', '76–81 cm'], ['M', '96–101 cm', '81–86 cm'], ['L', '101–106 cm', '86–91 cm'], ['XL', '106–111 cm', '91–96 cm']].map((row) => `<div>${row.map((cell) => `<span>${cell}</span>`).join('')}</div>`).join('')}
    </div>
  ` : '';

  return `
    <section class="section info-page">
      <div class="info-intro">
        <p class="eyebrow">${title}</p>
        <h1>${lead}</h1>
        <p class="info-lead">${paragraph1}</p>
      </div>

      <div class="info-body">
        <p>${paragraph2}</p>
        ${type === 'size-guide' ? sizeTable : ''}
      </div>
    </section>
  `;
}

function renderNotFound() {
  return `
    <section class="not-found section">
      <p class="eyebrow">404 / Page not found</p>
      <h1>Looks like<br /><em>you took a wrong turn.</em></h1>
      <a class="button button-dark" href="#/">Back to home ${icon('arrow-right', 16, 2)}</a>
    </section>
  `;
}

function renderCurrentPage() {
  const route = getCurrentRoute();
  const path = route.path;

  switch (path) {
    case '/':
      return renderHome();
    case '/shop':
      return renderListing({ title: 'Shop all' });
    case '/new-arrivals':
      return renderListing({ title: 'New arrivals' });
    case '/men':
      return renderListing({ title: 'Men', group: 'Men' });
    case '/women':
      return renderListing({ title: 'Women', group: 'Women' });
    case '/unisex':
      return renderListing({ title: 'Unisex', group: 'Unisex' });
    case '/t-shirts':
      return renderListing({ title: 'T-Shirts', category: 'T-Shirts' });
    case '/oversized-t-shirts':
      return renderListing({ title: 'Oversized T-Shirts', category: 'Oversized T-Shirts' });
    case '/shirts':
      return renderListing({ title: 'Shirts', category: 'Shirts' });
    case '/hoodies':
      return renderListing({ title: 'Hoodies', category: 'Hoodies' });
    case '/sweatshirts':
      return renderListing({ title: 'Sweatshirts', category: 'Sweatshirts' });
    case '/pants':
      return renderListing({ title: 'Pants', category: 'Pants' });
    case '/cargo-pants':
      return renderListing({ title: 'Cargo Pants', category: 'Cargo Pants' });
    case '/jeans':
      return renderListing({ title: 'Jeans', category: 'Jeans' });
    case '/shorts':
      return renderListing({ title: 'Shorts', category: 'Shorts' });
    case '/jackets':
      return renderListing({ title: 'Jackets', category: 'Jackets' });
    case '/outerwear':
      return renderListing({ title: 'Outerwear', category: 'Outerwear' });
    case '/caps':
      return renderListing({ title: 'Caps', category: 'Caps' });
    case '/bags':
      return renderListing({ title: 'Bags', category: 'Bags' });
    case '/belts':
      return renderListing({ title: 'Belts', category: 'Belts' });
    case '/accessories':
      return renderListing({ title: 'Accessories', category: 'Accessories' });
    case '/cart':
      return renderCart();
    case '/wishlist':
      return renderWishlist();
    case '/checkout':
      return renderCheckout();
    case '/search':
      return renderListing({ title: 'Search results', query: route.search.get('q') || '' });
    case '/account':
      return renderInfo('account');
    case '/about':
      return renderInfo('about');
    case '/contact':
      return renderInfo('contact');
    case '/faq':
      return renderInfo('faq');
    case '/size-guide':
      return renderInfo('size-guide');
    case '/privacy':
      return renderInfo('privacy');
    case '/terms':
      return renderInfo('terms');
    default:
      if (path.startsWith('/product/')) {
        return renderProductPage();
      }
      return renderNotFound();
  }
}

function getCheckoutTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const standardDelivery = subtotal >= 10000 || subtotal === 0 ? 0 : 450;
  const delivery = subtotal === 0
    ? 0
    : state.checkoutDelivery === 'express'
      ? 850
      : standardDelivery;

  return { subtotal, standardDelivery, delivery, total: subtotal + delivery };
}

function render() {
  app.innerHTML = `
    ${renderHeader()}
    <main>${renderCurrentPage()}</main>
    ${renderFooter()}
  `;
  document.body.classList.toggle('menu-open', state.menuOpen);
}

function scrollToTop() {
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });
}

const fallbackSvg = (label = 'UNIO') =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#e8e1d6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#20201e" font-family="sans-serif" font-size="42">${label}</text></svg>`
  )}`;

document.addEventListener('error', (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied === 'true') return;
  image.dataset.fallbackApplied = 'true';
  image.src = fallbackSvg('unio clothing');
}, true);

document.addEventListener('click', (event) => {
  const actionElement = event.target.closest('[data-action]');
  if (!actionElement) return;

  const { action, productId, category, key, quantity, size, color, imageIndex } = actionElement.dataset;

  switch (action) {
    case 'home':
      event.preventDefault();
      state.menuOpen = false;
      state.searchOpen = false;
      if (window.location.hash !== '#/') {
        window.location.hash = '#/';
      } else {
        render();
        scrollToTop();
      }
      break;
    case 'toggle-menu':
      state.menuOpen = !state.menuOpen;
      render();
      break;
    case 'close-menu':
      state.menuOpen = false;
      render();
      break;
    case 'toggle-search':
      state.searchOpen = !state.searchOpen;
      state.searchValue = state.searchOpen ? state.searchValue : '';
      render();
      break;
    case 'toggle-filters': {
      const filterLinks = document.querySelector('.filter-links');
      if (filterLinks) {
        filterLinks.classList.toggle('open');
      }
      break;
    }
    case 'clear-category':
      navigate('/shop');
      break;
    case 'select-category':
      navigate('/shop', { category });
      break;
    case 'toggle-wishlist': {
      const product = products.find((item) => item.id === productId);
      if (product) toggleWishlist(product);
      break;
    }
    case 'quick-add': {
      const product = products.find((item) => item.id === productId);
      if (product) addToCart(product, { quantity: 1 });
      break;
    }
    case 'add-to-bag': {
      const product = products.find((item) => item.id === productId);
      const selection = getProductSelection(productId);
      if (product) {
        addToCart(product, {
          size: selection.size || product.sizes?.[0],
          color: selection.color || product.colors?.[0],
          quantity: selection.quantity || 1,
        });
      }
      break;
    }
    case 'update-cart-quantity': {
      if (Number(quantity) > 0) {
        updateCartQuantity(key, Number(quantity));
      } else {
        removeFromCart(key);
      }
      break;
    }
    case 'remove-cart-item':
      removeFromCart(key);
      break;
    case 'move-to-bag': {
      const product = products.find((item) => item.id === productId);
      if (product) {
        addToCart(product, { quantity: 1 });
        toggleWishlist(product);
      }
      break;
    }
    case 'set-product-color': {
      const product = products.find((item) => item.id === productId);
      if (!product) break;
      const selection = getProductSelection(productId);
      selection.color = color;
      render();
      break;
    }
    case 'set-product-size': {
      const selection = getProductSelection(productId);
      selection.size = size;
      render();
      break;
    }
    case 'set-product-image': {
      const selection = getProductSelection(productId);
      selection.imageIndex = Number(imageIndex);
      render();
      break;
    }
    case 'increment-quantity': {
      const selection = getProductSelection(productId);
      selection.quantity += 1;
      render();
      break;
    }
    case 'decrement-quantity': {
      const selection = getProductSelection(productId);
      selection.quantity = Math.max(1, selection.quantity - 1);
      render();
      break;
    }
    default:
      break;
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target;

  if (form.matches('[data-form="search"]')) {
    event.preventDefault();
    const value = form.querySelector('[data-search-input]')?.value?.trim();
    state.searchOpen = false;
    state.searchValue = '';
    if (value) {
      navigate('/search', { q: value });
    } else {
      navigate('/shop');
    }
    return;
  }

  if (form.matches('[data-form="newsletter"]')) {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    state.newsletterMessage = input?.value
      ? 'Thank you. You’re on the list.'
      : '';
    if (input) input.value = '';
    render();
  }

  if (form.matches('[data-form="checkout"]')) {
    event.preventDefault();
    if (state.cart.length === 0) {
      navigate('/cart');
      return;
    }
    state.cart = [];
    saveStorage('unio-cart', state.cart);
    navigate('/checkout', { placed: 1 });
  }
});

document.addEventListener('input', (event) => {
  if (event.target.matches('[data-search-input]')) {
    state.searchValue = event.target.value;
  }
});

document.addEventListener('change', (event) => {
  if (event.target.matches('[data-sort-select]')) {
    const route = getCurrentRoute();
    const params = new URLSearchParams(route.search);
    params.set('sort', event.target.value);
    navigate(route.path || '/shop', Object.fromEntries(params.entries()));
  }

  if (event.target.matches('input[name="delivery"]')) {
    state.checkoutDelivery = event.target.value;
    const { delivery, total } = getCheckoutTotals();
    const deliveryAmount = document.querySelector('[data-checkout-delivery]');
    const totalAmount = document.querySelector('[data-checkout-total]');
    if (deliveryAmount) deliveryAmount.textContent = delivery === 0 ? 'Free' : formatPrice(delivery);
    if (totalAmount) totalAmount.textContent = formatPrice(total);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (state.searchOpen || state.menuOpen) {
    state.searchOpen = false;
    state.menuOpen = false;
    render();
  }
});

window.addEventListener('hashchange', () => {
  state.searchOpen = false;
  state.menuOpen = false;
  render();
  scrollToTop();
});

if (!window.location.hash) {
  window.location.hash = '#/';
} else {
  render();
}
