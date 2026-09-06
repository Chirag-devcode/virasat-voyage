# Virasat AI holographic landing view

## Build
- Add a full-screen landing experience before the current dashboard without changing its tabs, data, APIs, or business logic.
- Create a client-rendered Three.js hologram of an Indian heritage monument with cyan and amber wireframe lighting, scan rings, particles, and restrained motion.
- Overlay the Virasat AI identity and a prominent “Get Started” control that smoothly reveals the existing dashboard on the same route.
- Preserve accessibility and reduced-motion behavior, with a lightweight visual fallback while the 3D scene loads.

## Technical details
- Install React Three Fiber and Drei versions compatible with the existing React 19 app.
- Keep the existing `/` route and dashboard component structure; gate only the initial presentation using local UI state.
- Add all new visual colors and effects as semantic design tokens/utilities in the global stylesheet.
- Verify build/type safety and test desktop and mobile interactions in the live preview.
