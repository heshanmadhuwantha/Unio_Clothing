# UNIO Clothing - Project Case Study

## 1. Project Introduction

UNIO Clothing is a responsive fashion storefront prototype. It brings product discovery, product details, a saved-items list, a shopping cart, and a demo checkout into one frontend experience.

## 2. Project Background

The active site is a static HTML, CSS, and Vanilla JavaScript application served from the repository root. Product and page content live separately from the rendering and interaction logic. A legacy React/Vite implementation and its previous build output are retained in `src/` and `dist/`, but the active `index.html` loads the static app instead.

## 3. Problem Statement

The implementation challenge was to present a coherent retail browsing and purchase journey in a frontend-only application, while keeping navigation, product state, and layouts usable across desktop and mobile screens.

## 4. Project Goals

- Give visitors clear routes into the product catalogue and clothing collections.
- Support common shopping interactions, including product options, cart, and wishlist.
- Maintain a consistent editorial fashion presentation across screen sizes.
- Keep the prototype runnable without a backend or additional runtime framework.

## 5. Target Audience

The interface is intended for people browsing modern everyday fashion. This audience is a design assumption; no interviews, surveys, or demographic research were conducted for this project.

## 6. Design Direction

The visual direction uses warm neutral surfaces, editorial photography, compact navigation, and a restrained type system pairing DM Sans with Playfair Display. Product imagery and campaign assets are stored locally in `assets/images/`. The responsive layouts preserve the same visual language while adapting navigation, grids, and spacing for smaller screens.

## 7. Main Features

- Homepage campaign area, featured products, categories, and editorial sections.
- Men, Women, Unisex, New Arrivals, and sale catalogue views.
- Submitted product search, category filtering, and sorting.
- Product image galleries, colour and size controls, and quantity selection.
- Cart quantity changes, removal, subtotal, and delivery summary.
- Wishlist add/remove and move-to-cart behavior.
- Checkout form validation, standard and express delivery calculations, and a frontend confirmation state.
- Local newsletter success feedback.
- Hash-based navigation, responsive mobile menu, and `localStorage` persistence for cart and wishlist.

## 8. User Journey

1. A visitor arrives at the homepage and follows a collection link or opens the shop.
2. They browse or filter products, sort the listing, or submit a search.
3. On a product page, they inspect gallery images and select available options and quantity.
4. They add the product to the cart or save it to the wishlist; saved items can be moved to the cart.
5. They review the cart and continue to checkout.
6. The demo validates required form fields, calculates delivery, and displays a confirmation state. It does not submit a real order.

## 9. Technology Stack

- **HTML5** for the entry document and semantic page content.
- **CSS3** for branding, layout, responsive rules, focus states, and motion preferences.
- **Vanilla JavaScript (ES modules)** for rendering, hash routing, product interactions, and forms.
- **Browser APIs** including `localStorage`, DOM events, and URL handling.

The active storefront does not depend on React, Vite, or a backend service.

## 10. Development Process

The active implementation separates the catalogue and content (`js/data.js`), rendering and interactions (`js/main.js`), and presentation (`css/style.css`). The existing hash router selects page views without a server-side route configuration. The work included responsive and interaction QA in a browser and syntax validation with the repository's `npm run check` command.

No user research, usability study, conversion experiment, or business-result measurement was performed.

## 11. Responsive Design

The layout adapts the navigation, product grids, category cards, checkout columns, and footer for smaller viewports. Browser QA tested 1920, 1440, 1280, 1024, 768, 430, 390, and 360 pixel widths across the main shopping routes. No horizontal overflow was observed in those tested routes.

## 12. Quality Assurance

Reported browser checks covered the homepage, shop, product detail, cart, checkout, wishlist, category and information routes, invalid routes, and major shopping interactions. The QA exercised mobile navigation and filters, search and sorting, product selection, cart/wishlist changes, checkout validation and delivery totals, newsletter feedback, and browser back/forward behavior.

No page/console errors or failed requests were observed during the reported browser runs. No broken images were found among images reported as loaded. Desktop and mobile screenshots were visually spot-checked; the project has not undergone a formal accessibility audit or performance benchmark.

`npm run check` passed for the active JavaScript files. The active app has no production build script.

## 13. Challenges and Solutions

- **Static navigation:** Hash-based routes keep navigation within the static app and preserve browser history behavior.
- **Persistent demo state:** Cart and wishlist data use browser `localStorage`, with validation for malformed or stale entries.
- **Checkout updates:** Delivery selection updates totals without discarding the user's entered form values; the standard-delivery label reflects free delivery above the configured threshold.
- **Responsive fixed header:** The announcement bar and header remain visible while page content retains an appropriate top offset.

## 14. Current Limitations

- Checkout confirmation is local UI only; there is no payment gateway or backend order processing.
- Account routes do not provide real authentication.
- Newsletter feedback is not connected to a mailing service.
- Search results are submitted explicitly; live suggestions are not present.
- The existing GitHub Pages workflow expects a Vite build command and `dist/`, which do not match the active root static runtime and should not be treated as verified deployment configuration.

## 15. Future Improvements

These are proposed additions, not implemented features:

- Connect checkout to secure order and payment services.
- Add authentication and persistent customer accounts.
- Build catalogue and order-management tools.
- Integrate a newsletter provider and live search suggestions.
- Update and validate the deployment workflow for the active static entry point.
- Conduct formal accessibility and performance testing.

## 16. Final Outcome

The repository provides a functional, responsive frontend demonstration of a fashion shopping journey, with local product assets and browser-persisted cart and wishlist state. Its current scope is a portfolio-ready frontend prototype rather than a production e-commerce service.
