# UNIO Clothing - Modern Fashion E-commerce Website

UNIO Clothing is a fashion storefront prototype for discovering modern everyday clothing. It presents an editorial-style homepage, a browsable catalogue, product details, and a frontend shopping journey from product selection through a demo checkout.

## Project Goals

- Create a cohesive fashion storefront with a clear visual identity.
- Make product discovery and browsing straightforward across screen sizes.
- Demonstrate common e-commerce interactions without requiring a backend.
- Keep the active runtime lightweight and framework-free.

## Key Features

- Responsive homepage with editorial campaign imagery and featured collections.
- Product catalogue with Men, Women, and Unisex collections.
- Search results, category filters, sale filtering, and sorting.
- Product details with image gallery, colour and size choices, and quantity controls.
- Cart with quantity updates, removal, and subtotal/delivery summary.
- Wishlist with add/remove controls and a move-to-cart action.
- Checkout form with browser validation, standard and express delivery, and delivery-fee calculation.
- Demo order confirmation; cart and wishlist persist in browser `localStorage`.
- Newsletter form with local success feedback.
- Hash-based routes, browser history support, and mobile navigation.
- Local product and campaign image assets.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript using ES modules
- Browser `localStorage` and standard DOM, URL, and navigation APIs

The active storefront does not use React or a framework. The repository retains a legacy React/Vite implementation under `src/` and its older build output under `dist/`; neither is loaded by the current root `index.html`.

## Active Project Structure

```text
.
├── index.html
├── assets/
│   └── images/                 # Local product and editorial photography
├── css/
│   └── style.css
├── js/
│   ├── data.js                 # Catalogue and page content
│   └── main.js                 # Hash routing, rendering, and interactions
├── docs/
│   └── screenshots/
│       └── README.md           # Portfolio screenshot checklist
├── README.md
├── PROJECT_ANALYSIS.md
├── PROJECT_CASE_STUDY.md
├── package.json
└── package-lock.json
```

Legacy project files also remain in `src/`, `dist/`, `vite.config.js`, and `.github/workflows/`. They are not required to run the active static storefront.

## Getting Started

The JavaScript entry point imports a local ES module, so serve the project over HTTP rather than opening `index.html` directly as a `file://` URL. No package installation is required for the active storefront.

### Option 1: XAMPP / Apache

Place the project folder under XAMPP's `htdocs`, start Apache, then open the corresponding local URL. For this workspace path:

```text
http://localhost/unio%20clothing/
```

### Option 2: Python static server

With Node.js/npm and Python available on your `PATH`, run this from the project root:

```bash
npm run start
```

Then open `http://localhost:4173/`. The `start` and `dev` scripts both run Python's built-in static HTTP server.

### Validation

```bash
npm run check
```

This checks the syntax of `js/data.js` and `js/main.js`. The active static app has no build step in `package.json`.

## Quality Assurance

The reported browser QA exercised the home, shop, product, cart, checkout, and wishlist routes at **1920, 1440, 1280, 1024, 768, 430, 390, and 360px**. No horizontal overflow was observed in those tested routes. Main navigation, category browsing, search, sorting, product selection, cart and wishlist actions, checkout validation and delivery totals, newsletter feedback, and browser back/forward behavior were exercised.

During the reported browser runs, no page/console errors or failed requests were observed, and no broken images were found among images reported as loaded. Desktop and mobile screenshots were visually spot-checked; these checks are not a formal accessibility audit, performance benchmark, or exhaustive visual review of every asset placement.

`npm run check` passed. No production build was run because the active application has no build script.

## Limitations

- Checkout is a frontend demonstration; there is no payment gateway or backend order processing.
- There is no real user authentication or account service.
- Newsletter submission only displays local success feedback and does not send data to a service.
- Search navigates to submitted results; live suggestions are not implemented.
- The checked-in GitHub Pages workflow currently expects `npm run build` and uploads `dist/`. Those steps do not match the active root static app and have not been verified for deployment.

## Future Improvements

- Add a backend for orders and catalogue administration.
- Integrate secure authentication and a payment provider.
- Connect newsletter signups to a service with appropriate consent handling.
- Add live search suggestions.
- Align and validate the deployment workflow with the active static entry point.

## Author

- **Name:** [Add your name]
- **Portfolio:** [Add your portfolio URL]
- **GitHub:** [Add your GitHub profile]
- **Contact:** [Add your preferred contact information]
