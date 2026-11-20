# UNIO Clothing - Current Project Analysis

## Active runtime

The active storefront is a static HTML, CSS, and Vanilla JavaScript application:

- `index.html` loads `css/style.css` and `js/main.js`.
- `js/main.js` imports catalogue data from `js/data.js`.
- Product and editorial photography is stored locally in `assets/images/`.
- The application uses hash-based routes and browser `localStorage` for cart and wishlist state.

The active storefront does not load the React app.

## Retained legacy files

- `src/` contains the older React implementation.
- `dist/` contains older generated build output.
- `vite.config.js` and `.github/workflows/deploy.yml` still reflect the earlier Vite build setup.

These are retained in the repository but are not part of the current root static runtime. The Pages workflow's `npm run build` step does not correspond to a build script in the current `package.json`; deployment through that workflow has not been verified.

## Routes and features

The hash router provides the homepage, shop and collection listings, product details, search results, cart, wishlist, checkout, informational pages, and a not-found view. The frontend implements category filtering, sorting, product variant/quantity selection, cart updates, wishlist actions, delivery calculations, checkout form validation, and local newsletter feedback.

Order submission, payment, authentication, and newsletter delivery are frontend demonstrations only.

## Local validation

The `npm run check` script runs `node --check` against `js/data.js` and `js/main.js`. No build script is defined for the active static storefront.
