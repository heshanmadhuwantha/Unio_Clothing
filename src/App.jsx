import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { categories, formatPrice, products } from './data/products'
import { useStore } from './context/StoreContext'

const navItems = [
  ['Shop', '/shop'],
  ['New arrivals', '/new-arrivals'],
  ['Men', '/men'],
  ['Women', '/women'],
  ['Unisex', '/unisex'],
]

const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#e8e1d6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#20201e" font-family="sans-serif" font-size="42">unioclothing</text></svg>'
)}`

const handleImageError = (event, fallback) => {
  const image = event.currentTarget

  if (image.dataset.fallbackApplied === 'true') {
    image.src = FALLBACK_IMAGE
    return
  }

  image.dataset.fallbackApplied = 'true'
  image.src = fallback || FALLBACK_IMAGE
}

function Header() {
  const { cart, wishlist } = useStore()

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const navigate = useNavigate()

  const submitSearch = (event) => {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
    }

    setSearchOpen(false)
  }

  return (
    <>
      <div className="announcement">
        Free islandwide delivery on orders over Rs. 10,000
        <span>·</span>
        Easy exchanges within 14 days
      </div>

      <header className="site-header">
        <button
          className="icon-button mobile-only"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={21} />
        </button>

        <Link className="logo" to="/">
          unio<span>clothing</span>
        </Link>

        <nav className="desktop-nav">
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path}>
              {label}
            </NavLink>
          ))}

          <NavLink to="/shop">Collections</NavLink>

          <NavLink className="sale-link" to="/shop?sale=true">
            Sale
          </NavLink>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={19} />
          </button>

          <Link
            className="icon-button desktop-only"
            aria-label="Account"
            to="/account"
          >
            <User size={19} />
          </Link>

          <Link
            className="icon-button count-wrap"
            aria-label={`Wishlist, ${wishlist.length} items`}
            to="/wishlist"
          >
            <Heart size={19} />

            {wishlist.length > 0 && <b>{wishlist.length}</b>}
          </Link>

          <Link
            className="icon-button count-wrap"
            aria-label={`Cart, ${cart.length} items`}
            to="/cart"
          >
            <ShoppingBag size={19} />

            {cart.length > 0 && <b>{cart.length}</b>}
          </Link>
        </div>
      </header>

      {searchOpen && (
        <div className="search-layer">
          <form onSubmit={submitSearch}>
            <Search size={22} />

            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the collection"
            />

            <button
              type="button"
              className="icon-button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              <X />
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <Link
              className="logo"
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              unio<span>clothing</span>
            </Link>

            <button
              className="icon-button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X />
            </button>
          </div>

          {navItems.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <ArrowRight size={16} />
            </Link>
          ))}

          <Link
            to="/account"
            onClick={() => setMenuOpen(false)}
          >
            Account
            <ArrowRight size={16} />
          </Link>

          <div className="mobile-category">
            <span>Categories</span>

            {categories.slice(0, 8).map((category) => (
              <Link
                key={category}
                to={`/shop?category=${encodeURIComponent(category)}`}
                onClick={() => setMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Link className="logo" to="/">
            unio<span>clothing</span>
          </Link>

          <p>Modern essentials designed for everyone.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/unisex">Unisex</Link>
          <Link to="/new-arrivals">New arrivals</Link>
        </div>

        <div>
          <h4>Help</h4>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/size-guide">Size guide</Link>
          <Link to="/contact">Shipping & returns</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link to="/about">About us</Link>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
          >
            TikTok
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className="newsletter">
          <h4>Stay in the loop</h4>

          <p>
            First access to new drops and quiet surprises.
          </p>

          <form onSubmit={(event) => event.preventDefault()}>
            <label
              className="sr-only"
              htmlFor="newsletter-email"
            >
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email address"
            />

            <button
              className="button button-dark"
              type="submit"
            >
              Join
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 unioclothing, Colombo, Sri Lanka</span>

        <span>
          <Link to="/privacy">Privacy</Link>{' '}
          <Link to="/terms">Terms</Link>
        </span>

        <span>Made for every body.</span>
      </div>
    </footer>
  )
}

function Layout({ children }) {
  const location = useLocation()

  /*
   * IMPORTANT:
   * Keep this useEffect synchronous.
   * Never make the effect callback async.
   * Never return window.scrollTo() because React expects
   * undefined or a cleanup function.
   */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

function ProductCard({ product }) {
  const {
    toggleWishlist,
    isWishlisted,
    addToCart,
  } = useStore()

  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)

    setAdded(true)

    window.setTimeout(() => {
      setAdded(false)
    }, 1200)
  }

  const wishlisted = isWishlisted(product.id)

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            onError={(event) =>
              handleImageError(event, product.images[1])
            }
          />

          <img
            className="product-image-hover"
            src={product.images[1]}
            alt=""
            onError={(event) =>
              handleImageError(event, product.images[0])
            }
          />
        </Link>

        <div className="product-flags">
          {product.isNew && <span>New</span>}

          {product.isSale && (
            <span className="sale-flag">Sale</span>
          )}
        </div>

        <button
          className={`wishlist-button ${wishlisted ? 'active' : ''}`}
          aria-label={
            wishlisted
              ? 'Remove from wishlist'
              : 'Add to wishlist'
          }
          onClick={() => toggleWishlist(product)}
        >
          <Heart
            size={17}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>

        <button
          className="quick-add"
          onClick={handleAdd}
        >
          {added ? 'Added to bag' : 'Quick add'}
          <Plus size={15} />
        </button>
      </div>

      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        <span>{product.category}</span>

        <div>
          <strong>{formatPrice(product.price)}</strong>

          {product.oldPrice && (
            <del>{formatPrice(product.oldPrice)}</del>
          )}
        </div>
      </div>
    </article>
  )
}

function ProductGrid({ items }) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

function Home() {
  const featured = products
    .filter((product) => product.isNew)
    .slice(0, 4)

  const categoryImages = [
    ['T-Shirts', 'photo-1521572163474-6864f9cf17ab'],
    ['Hoodies', 'photo-1556821840-3a63f95609a7'],
    ['Shirts', 'photo-1602810318383-e386cc2a3ccf'],
    ['Pants', 'photo-1473966968600-fa801b869a1a'],
    ['Outerwear', 'photo-1551028719-00167b16eac5'],
    ['Accessories', 'photo-1521369909029-2afed882baee'],
  ]

  const socialImages = [
    'photo-1529139574466-a303027c1d8b',
    'photo-1485968579580-b6d095142e6e',
    'photo-1483985988355-763728e1935b',
    'photo-1521572163474-6864f9cf17ab',
  ]

  return (
    <>
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85"
          alt="Friends wearing modern neutral clothing in a sunlit studio"
          onError={(event) => handleImageError(event)}
        />

        <div className="hero-content">
          <p className="eyebrow">
            The everyday edit / 01
          </p>

          <h1>
            Wear
            <br />
            <em>your way.</em>
          </h1>

          <p>
            Modern essentials designed for everyone.
          </p>

          <div className="hero-actions">
            <Link
              className="button button-light"
              to="/men"
            >
              Shop men
              <ArrowRight size={16} />
            </Link>

            <Link
              className="button button-light"
              to="/women"
            >
              Shop women
              <ArrowRight size={16} />
            </Link>

            <Link
              className="button button-outline-light"
              to="/unisex"
            >
              Shop unisex
            </Link>
          </div>
        </div>

        <span className="hero-index">
          01 / 03
        </span>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Just landed</p>
            <h2>New arrivals</h2>
          </div>

          <Link
            className="text-link"
            to="/new-arrivals"
          >
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <ProductGrid items={featured} />
      </section>

      <section className="category-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              Find your uniform
            </p>
            <h2>Shop by category</h2>
          </div>
        </div>

        <div className="category-grid">
          {categoryImages.map(([label, photo]) => (
            <Link
              className="category-card"
              key={label}
              to={`/shop?category=${encodeURIComponent(label)}`}
            >
              <img
                src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=700&q=85`}
                alt={label}
                onError={(event) =>
                  handleImageError(event)
                }
              />

              <span>
                {label}
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="editorial">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85"
          alt="Model in relaxed unisex tailoring"
          onError={(event) =>
            handleImageError(event)
          }
        />

        <div className="editorial-copy">
          <p className="eyebrow">
            The unisex collection
          </p>

          <h2>
            Made for
            <br />
            <em>everyone.</em>
          </h2>

          <p>
            Minimal silhouettes. Everyday comfort.
            No boundaries.
          </p>

          <Link
            className="button button-light"
            to="/unisex"
          >
            Explore unisex
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section trending">
        <div className="section-heading">
          <div>
            <p className="eyebrow">In rotation</p>
            <h2>Trending now</h2>
          </div>

          <Link
            className="text-link"
            to="/shop"
          >
            Shop the edit
            <ArrowRight size={15} />
          </Link>
        </div>

        <ProductGrid items={products.slice(8, 12)} />
      </section>

      <section className="statement">
        <p>
          We believe in clothes
          <br />
          that let <em>you</em> be seen.
        </p>

        <Link
          to="/about"
          className="text-link"
        >
          Our story
          <ArrowRight size={15} />
        </Link>
      </section>

      <section className="social-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">@unioclothing</p>
            <h2>In the wild</h2>
          </div>

          <a
            className="text-link"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Follow along
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="social-grid">
          {socialImages.map((photo, index) => (
            <img
              key={photo}
              src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=700&q=85`}
              alt={`unioclothing community style ${index + 1}`}
              onError={(event) =>
                handleImageError(event)
              }
            />
          ))}
        </div>
      </section>
    </>
  )
}

function Listing({
  title = 'Shop all',
  filterGroup,
  forcedCategory,
}) {
  const [params, setParams] = useSearchParams()
  const [sort, setSort] = useState('Featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const category =
    params.get('category') || forcedCategory

  const query = params.get('q') || ''

  const isNewArrival = title === 'New arrivals'

  let items = products.filter((product) => {
    const matchesGroup =
      !filterGroup ||
      product.group === filterGroup

    const matchesCategory =
      !category ||
      product.category === category

    const matchesNew =
      !isNewArrival ||
      product.isNew

    const searchableText = `
      ${product.name}
      ${product.category}
      ${product.description}
      ${product.tags.join(' ')}
    `.toLowerCase()

    const matchesQuery =
      !query ||
      searchableText.includes(query.toLowerCase())

    return (
      matchesGroup &&
      matchesCategory &&
      matchesNew &&
      matchesQuery
    )
  })

  if (params.get('sale') === 'true') {
    items = items.filter(
      (product) => product.isSale
    )
  }

  if (sort === 'Price low to high') {
    items = [...items].sort(
      (a, b) => a.price - b.price
    )
  }

  if (sort === 'Price high to low') {
    items = [...items].sort(
      (a, b) => b.price - a.price
    )
  }

  if (sort === 'Newest') {
    items = [...items].sort(
      (a, b) =>
        Number(b.isNew) - Number(a.isNew)
    )
  }

  const clearCategory = () => {
    const nextParams = new URLSearchParams(params)
    nextParams.delete('category')
    setParams(nextParams)
    setFiltersOpen(false)
  }

  const selectCategory = (item) => {
    const nextParams = new URLSearchParams()
    nextParams.set('category', item)
    setParams(nextParams)
    setFiltersOpen(false)
  }

  return (
    <section className="listing section">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{title}</span>
      </div>

      <div className="listing-title">
        <div>
          <p className="eyebrow">
            The collection
          </p>

          <h1>{title}</h1>

          <p className="muted">
            {items.length} pieces to make your own.
          </p>
        </div>

        <button
          className="filter-mobile button button-outline"
          aria-expanded={filtersOpen}
          onClick={() =>
            setFiltersOpen((open) => !open)
          }
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="listing-toolbar">
        <div
          className={`filter-links ${
            filtersOpen ? 'open' : ''
          }`}
        >
          <button
            className={!category ? 'selected' : ''}
            onClick={clearCategory}
          >
            All
          </button>

          {categories.map((item) => (
            <button
              className={
                category === item
                  ? 'selected'
                  : ''
              }
              key={item}
              onClick={() =>
                selectCategory(item)
              }
            >
              {item}
            </button>
          ))}
        </div>

        <label className="sort-label">
          Sort by

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option>Featured</option>
            <option>Newest</option>
            <option>
              Price low to high
            </option>
            <option>
              Price high to low
            </option>
          </select>

          <ChevronDown size={14} />
        </label>
      </div>

      {items.length ? (
        <ProductGrid items={items} />
      ) : (
        <div className="empty-state">
          <h2>Nothing here yet.</h2>

          <p>
            Try a different category or search term.
          </p>

          <Link
            className="button button-dark"
            to="/shop"
          >
            View all pieces
          </Link>
        </div>
      )}
    </section>
  )
}

function ProductPage() {
  const { id } = useParams()

  const product =
    products.find((item) => item.id === id) ||
    products[0]

  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useStore()

  const [size, setSize] = useState('')
  const [color, setColor] = useState(
    product.colors[0]
  )
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [imageIndex, setImageIndex] = useState(0)

  const handleAdd = () => {
    if (
      product.sizes.length > 1 &&
      !size
    ) {
      setError(
        'Please select a size before adding to bag.'
      )
      return
    }

    addToCart(product, {
      size: size || product.sizes[0],
      color,
      quantity,
    })

    setError('Added to your bag.')

    window.setTimeout(() => {
      setError('')
    }, 1800)
  }

  const wishlisted = isWishlisted(product.id)

  return (
    <section className="product-page section">
      <div className="breadcrumbs">
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail">
        <div className="gallery">
          <div className="gallery-main">
            <img
              src={product.images[imageIndex]}
              alt={product.name}
              onError={(event) =>
                handleImageError(
                  event,
                  product.images[
                    (imageIndex + 1) %
                      product.images.length
                  ]
                )
              }
            />
          </div>

          <div className="thumbnail-row">
            {product.images.map((src, index) => (
              <button
                type="button"
                key={src}
                className={
                  imageIndex === index
                    ? 'selected'
                    : ''
                }
                aria-label={`Show ${product.name} image ${
                  index + 1
                }`}
                onClick={() =>
                  setImageIndex(index)
                }
              >
                <img
                  src={src}
                  alt={`${product.name} view ${
                    index + 1
                  }`}
                  onError={(event) =>
                    handleImageError(event)
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="product-copy">
          <p className="eyebrow">
            {product.category} / {product.group}
          </p>

          <h1>{product.name}</h1>

          <div className="rating">
            ★★★★★
            <span>
              {product.rating} · {product.reviews}{' '}
              reviews
            </span>
          </div>

          <div className="detail-price">
            <strong>
              {formatPrice(product.price)}
            </strong>

            {product.oldPrice && (
              <del>
                {formatPrice(product.oldPrice)}
              </del>
            )}
          </div>

          <p className="detail-description">
            {product.description}
          </p>

          <div className="option-block">
            <div className="option-heading">
              <span>Colour</span>
              <strong>{color}</strong>
            </div>

            <div className="swatches">
              {product.colors.map((item) => {
                const selected =
                  color === item

                return (
                  <button
                    type="button"
                    key={item}
                    className={
                      selected
                        ? 'selected'
                        : ''
                    }
                    aria-label={`Select ${item} colour`}
                    aria-pressed={selected}
                    onClick={() =>
                      setColor(item)
                    }
                  >
                    <span
                      style={{
                        background:
                          item.toLowerCase() ===
                            'cream' ||
                          item.toLowerCase() ===
                            'white'
                            ? '#eee9df'
                            : item.toLowerCase(),
                      }}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {product.sizes.length > 1 && (
            <div className="option-block">
              <div className="option-heading">
                <span>Size</span>

                <Link to="/size-guide">
                  Size guide
                </Link>
              </div>

              <div className="sizes">
                {product.sizes.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={
                      size === item
                        ? 'selected'
                        : ''
                    }
                    aria-pressed={size === item}
                    onClick={() => {
                      setSize(item)
                      setError('')
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="buy-row">
            <div className="quantity">
              <button
                aria-label="Decrease quantity"
                onClick={() =>
                  setQuantity(
                    Math.max(1, quantity - 1)
                  )
                }
              >
                <Minus size={15} />
              </button>

              <span>{quantity}</span>

              <button
                aria-label="Increase quantity"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              className="button button-dark add-button"
              onClick={handleAdd}
            >
              Add to bag
              <ShoppingBag size={16} />
            </button>

            <button
              className={`icon-button detail-wish ${
                wishlisted ? 'active' : ''
              }`}
              aria-label="Wishlist"
              onClick={() =>
                toggleWishlist(product)
              }
            >
              <Heart
                size={19}
                fill={
                  wishlisted
                    ? 'currentColor'
                    : 'none'
                }
              />
            </button>
          </div>

          {error && (
            <p
              className="form-message"
              role="status"
            >
              {error}
            </p>
          )}

          <div className="detail-accordions">
            <details open>
              <summary>
                Details
                <Plus size={15} />
              </summary>

              <p>
                {product.description} Made to be
                worn often, washed well, and lived in.
                Explore the full fit and material notes
                in our size guide.
              </p>
            </details>

            <details>
              <summary>
                Shipping & returns
                <Plus size={15} />
              </summary>

              <p>
                Islandwide delivery is complimentary
                over Rs. 10,000. Exchanges are accepted
                within 14 days of delivery.
              </p>
            </details>
          </div>
        </div>
      </div>

      <div className="section related">
        <div className="section-heading">
          <h2>You may also like</h2>
        </div>

        <ProductGrid
          items={products
            .filter(
              (item) =>
                item.id !== product.id &&
                item.category === product.category
            )
            .slice(0, 4)}
        />
      </div>
    </section>
  )
}

function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
  } = useStore()

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      item.product.price * item.quantity,
    0
  )

  const delivery =
    subtotal >= 10000 || subtotal === 0
      ? 0
      : 450

  return (
    <section className="section cart-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Shopping bag</span>
      </div>

      <h1>
        Your bag <span>({cart.length})</span>
      </h1>

      {cart.length ? (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.key}
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  onError={(event) =>
                    handleImageError(
                      event,
                      item.product.images[1]
                    )
                  }
                />

                <div className="cart-item-copy">
                  <Link
                    to={`/product/${item.product.id}`}
                  >
                    <h3>{item.product.name}</h3>
                  </Link>

                  <p>
                    {item.color} / {item.size}
                  </p>

                  <strong>
                    {formatPrice(
                      item.product.price
                    )}
                  </strong>

                  <div className="cart-controls">
                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.key,
                            item.quantity - 1
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.key,
                            item.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeFromCart(item.key)
                      }
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="summary">
            <h2>Summary</h2>

            <div>
              <span>Subtotal</span>
              <strong>
                {formatPrice(subtotal)}
              </strong>
            </div>

            <div>
              <span>Delivery</span>
              <strong>
                {delivery
                  ? formatPrice(delivery)
                  : 'Free'}
              </strong>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>
                {formatPrice(
                  subtotal + delivery
                )}
              </strong>
            </div>

            <Link
              className="button button-dark full-button"
              to="/checkout"
            >
              Proceed to checkout
              <ArrowRight size={16} />
            </Link>

            <Link
              className="continue-link"
              to="/shop"
            >
              <ChevronLeft size={15} />
              Continue shopping
            </Link>
          </aside>
        </div>
      ) : (
        <div className="empty-state cart-empty">
          <ShoppingBag
            size={35}
            strokeWidth={1}
          />

          <h2>Your bag is waiting.</h2>

          <p>
            It looks better with a few essentials in
            it.
          </p>

          <Link
            className="button button-dark"
            to="/shop"
          >
            Explore the collection
          </Link>
        </div>
      )}
    </section>
  )
}

function Wishlist() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
  } = useStore()

  return (
    <section className="section wishlist-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Wishlist</span>
      </div>

      <h1>
        Your wishlist{' '}
        <span>({wishlist.length})</span>
      </h1>

      {wishlist.length ? (
        <div className="product-grid">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="wish-card"
            >
              <ProductCard product={product} />

              <button
                className="wish-move"
                onClick={() => {
                  addToCart(product)
                  toggleWishlist(product)
                }}
              >
                Move to bag
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart
            size={35}
            strokeWidth={1}
          />

          <h2>
            Save what speaks to you.
          </h2>

          <p>
            Tap the heart on any piece to keep it
            close.
          </p>

          <Link
            className="button button-dark"
            to="/shop"
          >
            Explore the collection
          </Link>
        </div>
      )}
    </section>
  )
}

function Checkout() {
  const { cart } = useStore()

  const [placed, setPlaced] =
    useState(false)

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      item.product.price * item.quantity,
    0
  )

  if (placed) {
    return (
      <section className="success-page section">
        <div>
          <span className="success-mark">
            ✓
          </span>

          <p className="eyebrow">
            Order received
          </p>

          <h1>
            Thank you
            <br />
            <em>for choosing unio.</em>
          </h1>

          <p>
            Your order is on its way to becoming part
            of your everyday. We’ll send confirmation
            details to your email.
          </p>

          <Link
            className="button button-dark"
            to="/shop"
          >
            Continue shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section checkout-page">
      <div className="breadcrumbs">
        <Link to="/cart">
          Your bag
        </Link>

        <span>/</span>

        <span>Checkout</span>
      </div>

      <div className="checkout-layout">
        <div>
          <h1>Checkout</h1>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              setPlaced(true)
            }}
          >
            <fieldset>
              <legend>
                01 / Contact
              </legend>

              <div className="form-grid">
                <label>
                  Full name
                  <input
                    required
                    placeholder="Your full name"
                  />
                </label>

                <label>
                  Email address
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label>
                  Phone number
                  <input
                    required
                    placeholder="+94 77 000 0000"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                02 / Delivery address
              </legend>

              <div className="form-grid">
                <label className="wide">
                  Address
                  <input
                    required
                    placeholder="Street address"
                  />
                </label>

                <label>
                  City
                  <input
                    required
                    placeholder="Colombo"
                  />
                </label>

                <label>
                  District
                  <select
                    required
                    defaultValue=""
                  >
                    <option
                      value=""
                      disabled
                    >
                      Select district
                    </option>
                    <option>
                      Colombo
                    </option>
                    <option>
                      Gampaha
                    </option>
                    <option>
                      Kandy
                    </option>
                    <option>
                      Galle
                    </option>
                    <option>
                      Other
                    </option>
                  </select>
                </label>

                <label>
                  Postal code
                  <input
                    required
                    placeholder="00000"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                03 / Delivery method
              </legend>

              <label className="radio-row">
                <input
                  type="radio"
                  name="delivery"
                  defaultChecked
                />
                Standard delivery
                <span>Rs. 450</span>
              </label>

              <label className="radio-row">
                <input
                  type="radio"
                  name="delivery"
                />
                Express delivery
                <span>Rs. 850</span>
              </label>
            </fieldset>

            <fieldset>
              <legend>
                04 / Payment
              </legend>

              <label className="radio-row">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />
                Cash on delivery
              </label>

              <label className="radio-row">
                <input
                  type="radio"
                  name="payment"
                />
                Card on delivery
              </label>

              <label className="radio-row">
                <input
                  type="radio"
                  name="payment"
                />
                Bank transfer
              </label>
            </fieldset>

            <button
              className="button button-dark place-order"
              type="submit"
            >
              Place order
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <aside className="summary checkout-summary">
          <h2>Order summary</h2>

          {cart.length ? (
            cart.map((item) => (
              <div
                className="mini-item"
                key={item.key}
              >
                <img
                  src={item.product.images[0]}
                  alt=""
                  onError={(event) =>
                    handleImageError(
                      event,
                      item.product.images[1]
                    )
                  }
                />

                <span>
                  {item.product.name}

                  <small>
                    {item.color} / {item.size} · Qty{' '}
                    {item.quantity}
                  </small>
                </span>

                <strong>
                  {formatPrice(
                    item.product.price *
                      item.quantity
                  )}
                </strong>
              </div>
            ))
          ) : (
            <p className="muted">
              Your bag is empty.
            </p>
          )}

          <hr />

          <div>
            <span>Subtotal</span>
            <strong>
              {formatPrice(subtotal)}
            </strong>
          </div>

          <div>
            <span>Delivery</span>
            <strong>
              {subtotal >= 10000
                ? 'Free'
                : formatPrice(450)}
            </strong>
          </div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              {formatPrice(
                subtotal +
                  (subtotal >= 10000
                    ? 0
                    : 450)
              )}
            </strong>
          </div>
        </aside>
      </div>
    </section>
  )
}

function InfoPage({ type }) {
  const content = {
    account: [
      'Account',
      'Your space, kept simple.',
      'This frontend portfolio demo does not collect account credentials or provide authentication. Your cart and wishlist stay saved locally in this browser.',
      'Continue browsing, or reach out to our customer care team if you need help with an order.',
    ],

    about: [
      'About unioclothing',
      'Clothes with room for a life.',
      'unioclothing is a modern Sri Lankan clothing brand creating considered essentials for every body. We design with a quieter kind of confidence: pieces that feel familiar, fit beautifully, and stay in rotation.',
      'We believe style is personal, not prescribed. Every collection begins in Colombo and is shaped by the people, places, and everyday rituals around us.',
    ],

    contact: [
      'Contact us',
      'We’re here to help.',
      'Questions about a size, an order, or what to wear next? Reach us at hello@unioclothing.lk and we’ll get back to you within one working day.',
      'Our customer care hours are Monday to Friday, 9am to 5pm. For delivery updates, include your order number in your message.',
    ],

    faq: [
      'FAQ',
      'A few things, answered.',
      'How long does delivery take? Standard delivery takes 2–4 working days in Colombo and 3–6 working days islandwide.',
      'Can I exchange an item? Yes. Contact us within 14 days of delivery while the item is unworn and has its original tags attached.',
    ],

    'size-guide': [
      'Size guide',
      'Find your fit.',
      'Our pieces are designed with an easy, comfortable fit. Compare your measurements below and choose the size that feels right for you.',
      'For more specific fit notes, each product page includes material and silhouette details.',
    ],

    privacy: [
      'Privacy policy',
      'Your trust matters.',
      'We only use information needed to process your order, respond to your requests, and improve your shopping experience. We do not sell personal information.',
      'This frontend demo does not collect or transmit personal data.',
    ],

    terms: [
      'Terms & conditions',
      'The fine print.',
      'unioclothing is a frontend shopping experience for demonstration purposes. Product details, prices, and availability are examples and no real order will be processed.',
      'By using this site you agree to use it for personal, non-commercial browsing.',
    ],
  }

  const item =
    content[type] || content.about

  return (
    <section className="info-page section">
      <div className="info-intro">
        <p className="eyebrow">
          unioclothing /{' '}
          {type.replace('-', ' ')}
        </p>

        <h1>{item[0]}</h1>

        <p className="info-lead">
          {item[1]}
        </p>
      </div>

      <div className="info-body">
        <p>{item[2]}</p>
        <p>{item[3]}</p>

        {type === 'size-guide' && (
          <div className="size-table">
            <div>
              <span>Size</span>
              <span>Chest</span>
              <span>Waist</span>
            </div>

            {[
              [
                'XS',
                '86–91 cm',
                '71–76 cm',
              ],
              [
                'S',
                '91–96 cm',
                '76–81 cm',
              ],
              [
                'M',
                '96–101 cm',
                '81–86 cm',
              ],
              [
                'L',
                '101–106 cm',
                '86–91 cm',
              ],
              [
                'XL',
                '106–111 cm',
                '91–96 cm',
              ],
            ].map((row) => (
              <div key={row[0]}>
                {row.map((cell) => (
                  <span key={cell}>
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function SearchPage() {
  return <Listing title="Search results" />
}

function NotFound() {
  return (
    <section className="not-found section">
      <p className="eyebrow">
        404 / Page not found
      </p>

      <h1>
        Looks like
        <br />
        <em>you took a wrong turn.</em>
      </h1>

      <Link
        className="button button-dark"
        to="/"
      >
        Back to home
        <ArrowRight size={16} />
      </Link>
    </section>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Listing />}
        />

        <Route
          path="/new-arrivals"
          element={
            <Listing title="New arrivals" />
          }
        />

        <Route
          path="/men"
          element={
            <Listing
              title="Men"
              filterGroup="Men"
            />
          }
        />

        <Route
          path="/women"
          element={
            <Listing
              title="Women"
              filterGroup="Women"
            />
          }
        />

        <Route
          path="/unisex"
          element={
            <Listing
              title="Unisex"
              filterGroup="Unisex"
            />
          }
        />

        <Route
          path="/t-shirts"
          element={
            <Listing
              title="T-Shirts"
              forcedCategory="T-Shirts"
            />
          }
        />

        <Route
          path="/oversized-t-shirts"
          element={
            <Listing
              title="Oversized T-Shirts"
              forcedCategory="Oversized T-Shirts"
            />
          }
        />

        <Route
          path="/shirts"
          element={
            <Listing
              title="Shirts"
              forcedCategory="Shirts"
            />
          }
        />

        <Route
          path="/hoodies"
          element={
            <Listing
              title="Hoodies"
              forcedCategory="Hoodies"
            />
          }
        />

        <Route
          path="/sweatshirts"
          element={
            <Listing
              title="Sweatshirts"
              forcedCategory="Sweatshirts"
            />
          }
        />

        <Route
          path="/pants"
          element={
            <Listing
              title="Pants"
              forcedCategory="Pants"
            />
          }
        />

        <Route
          path="/cargo-pants"
          element={
            <Listing
              title="Cargo Pants"
              forcedCategory="Cargo Pants"
            />
          }
        />

        <Route
          path="/jeans"
          element={
            <Listing
              title="Jeans"
              forcedCategory="Jeans"
            />
          }
        />

        <Route
          path="/shorts"
          element={
            <Listing
              title="Shorts"
              forcedCategory="Shorts"
            />
          }
        />

        <Route
          path="/jackets"
          element={
            <Listing
              title="Jackets"
              forcedCategory="Jackets"
            />
          }
        />

        <Route
          path="/outerwear"
          element={
            <Listing
              title="Outerwear"
              forcedCategory="Outerwear"
            />
          }
        />

        <Route
          path="/caps"
          element={
            <Listing
              title="Caps"
              forcedCategory="Caps"
            />
          }
        />

        <Route
          path="/bags"
          element={
            <Listing
              title="Bags"
              forcedCategory="Bags"
            />
          }
        />

        <Route
          path="/belts"
          element={
            <Listing
              title="Belts"
              forcedCategory="Belts"
            />
          }
        />

        <Route
          path="/accessories"
          element={
            <Listing
              title="Accessories"
              forcedCategory="Accessories"
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductPage />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/search"
          element={<SearchPage />}
        />

        <Route
          path="/account"
          element={
            <InfoPage type="account" />
          }
        />

        <Route
          path="/about"
          element={
            <InfoPage type="about" />
          }
        />

        <Route
          path="/contact"
          element={
            <InfoPage type="contact" />
          }
        />

        <Route
          path="/faq"
          element={
            <InfoPage type="faq" />
          }
        />

        <Route
          path="/size-guide"
          element={
            <InfoPage type="size-guide" />
          }
        />

        <Route
          path="/privacy"
          element={
            <InfoPage type="privacy" />
          }
        />

        <Route
          path="/terms"
          element={
            <InfoPage type="terms" />
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Layout>
  )
}