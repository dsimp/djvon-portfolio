# Copilot Instructions for djvon-portfolio

## Project Overview

- This is a React single-page application (SPA) bootstrapped with Create React App.
- The app uses React Router for navigation and Framer Motion for page and component animations.
- 3D elements are rendered using @react-three/fiber and @react-three/drei, with a custom interactive Cube component as a central UI/UX feature.

## Key Architecture & Patterns

- **Routing:** All main navigation is handled in `src/App.js` using `<Router>`, `<Routes>`, and `<Route>`. Pages are in `src/pages/`.
- **3D Cube Navigation:** The `Cube` component (in `src/Components/Cube.js`) is interactive. Hovering or interacting with different faces triggers display of different sections (Skills, Experience, Projects, Bio, Connect) via state in `Home.js`.
- **Component Structure:**
  - `src/Components/` contains reusable UI elements (Cube, Navigation, Sidenav, Slideshow, etc).
  - `src/pages/` contains top-level route views (Home, Skills, Experience, Projects).
- **Animations:** Framer Motion is used for page transitions and animated elements (see `App.js`, `Projects.js`, `JourneyAnimation.js`).
- **Navigation:** There are two navigation UIs: a top nav (`Navigation.js`) and a side nav (`Sidenav.js`). Both use react-icons for branding/social links.
- **Media:** The Cube's front face can play a video (see `Cube.js`, `VIDEO_URL`).

## Developer Workflows

- **Start Dev Server:** `npm start` (runs on http://localhost:3000)
- **Run Tests:** `npm test` (Jest + React Testing Library)
- **Build for Production:** `npm run build` (outputs to `build/`)
- **Eject (advanced):** `npm run eject` (irreversible, exposes config)

## Conventions & Tips

- **Component Naming:** Capitalized, one component per file, grouped by function.
- **State Management:** Local state via React hooks; no global state library.
- **3D/Canvas:** All 3D logic is in `Cube.js` and related components. Use `@react-three/fiber` idioms.
- **Styling:** CSS files are colocated with components (e.g., `Sidenav.css`, `Slideshow.css`).
- **External Links:** Social/profile links are hardcoded in nav components.
- **No Redux/MobX:** State is kept simple and local.

## Integration Points

- **Dependencies:**
  - 3D: `three`, `@react-three/fiber`, `@react-three/drei`
  - Animation: `framer-motion`
  - Routing: `react-router-dom`
  - Icons: `react-icons`
- **Testing:** Uses React Testing Library and Jest (see `setupTests.js`).

## Examples

- To add a new page: create a file in `src/pages/`, add a `<Route>` in `App.js`, and link it in nav components.
- To add a new Cube face: update `FACE_NAMES` and logic in `Cube.js` and `Home.js`.

## References

- Main entry: `src/App.js`
- 3D logic: `src/Components/Cube.js`
- Routing: `src/pages/`
- Navigation: `src/Components/Navigation.js`, `src/Components/Sidenav.js`
- Animations: `src/Components/JourneyAnimation.js`, Framer Motion usage throughout

---

For more, see the [README.md](../README.md) or the Create React App docs.
