# unioclothing

Frontend-only React + Vite storefront for a modern Sri Lankan unisex fashion brand. The experience uses original unioclothing branding, curated static demo products, LKR pricing, and local browser state for cart and wishlist interactions.

## Features

- Responsive editorial homepage, category pages, search, sorting, product details, wishlist, cart, and checkout UI.
- 24 centralized products with variant selection, sale/new labels, related products, and image hover states.
- Cart and wishlist persistence through `localStorage` only.
- Accessible labels, semantic forms, keyboard-friendly controls, responsive mobile navigation, and empty states.
- Hash-based routing for GitHub Pages compatibility.

## Technologies

React, Vite, React Router, JavaScript, CSS, Lucide React, and remote Unsplash development imagery.

## Installation and development

```bash
npm install
npm run dev
```

Create a production bundle with:

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.jsx` contains the route-level pages and reusable storefront components.
- `src/data/products.js` is the centralized demo catalog.
- `src/context/StoreContext.jsx` owns cart and wishlist state.
- `src/styles.css` contains the responsive design system and page styling.

## GitHub Pages deployment

1. Push the repository to GitHub.
2. Run `npm run build` and publish the generated `dist` directory with GitHub Actions or a Pages deployment workflow.
3. In the repository settings, set Pages to deploy from the workflow or the published branch.

The Vite config uses a relative base path and the app uses `HashRouter`, so nested storefront routes continue to work on static hosting without server rewrites.
