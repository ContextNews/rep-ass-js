# 001 — Initial design

Status: draft
Date: 2026-05-17

## Goal

A small, focused JS/TS library that produces **positioned seat data** for representative-assembly visualisations. The library does not own rendering; it follows D3's `d3-sankey` / `d3-chord` / `d3-hierarchy` model — you give it config + data, it gives you back coordinates, you draw.

A thin optional helper (`renderAssembly`) provides a one-call SVG renderer for users who don't want to wire selections themselves.

## Non-goals

- **Not a charting library.** No axes, legends, tooltips, animations baked in. Those compose on top.
- **Not React-specific.** A React wrapper may follow as a separate package, but the core is framework-agnostic.
- **No data fetching.** Caller supplies seat/group counts; we don't ship UN/US/UK datasets (they may live in `examples/` only).
- **Not a 3D / WebGL lib.** SVG-first. If Canvas becomes useful for very large bodies (>5k seats), revisit.

## Design principles

1. **D3 conventions.** Factory functions returning configurable generators (`assembly().shape(...).rows(...)`), getter/setter chaining, accessor functions where useful.
2. **Pure layouts.** Layout generators are pure functions of `(config, data) → positioned seats`. No DOM, no D3 selection knowledge inside the layout code.
3. **Composable.** Each layout is a standalone module. `import { hemicycle } from 'rep-ass-js/layouts/hemicycle'` works.
4. **TypeScript-first.** Strong types for `Seat`, `Group`, `AssemblyData`, `Layout`. Public API exports `.d.ts`.
5. **Peer-dep D3.** Don't bundle D3. If we need scales/shapes internally, import from `d3-*` sub-modules so consumers can tree-shake.

## Core types (sketch)

```ts
interface Group {
  id: string
  label?: string
  color?: string
  size: number               // number of seats this group holds
}

interface AssemblyData {
  groups: Group[]
  // optional: per-seat overrides (named members, individual colours, etc.)
  seats?: Array<{
    id?: string
    groupId: string
    label?: string
  }>
}

interface Seat {
  id: string
  x: number
  y: number
  r: number                  // seat radius (varies by layout density)
  angle?: number             // for radial layouts; useful for label rotation
  row?: number
  col?: number
  group: Group               // back-reference for convenient styling
  label?: string
}

interface Layout {
  (data: AssemblyData): Seat[]
  // chainable getter/setters
  size(): [number, number]
  size(value: [number, number]): Layout
  // ...etc per layout
}
```

## Layouts to implement

| Layout            | Notes |
| ----------------- | ----- |
| `hemicycle`       | Configurable rows + start/end angle. Workhorse: covers US Senate, French / Spanish / Italian, French regional, French Senate. |
| `horseshoe`       | UN General Assembly — open at the front, multiple curved rows around a central podium. |
| `opposing-benches`| UK Commons / Lords. Two parallel banks of rows facing each other. Configurable rows per side + sword-line gap. |
| `classroom`       | Tiered straight rows facing a podium. Bundestag committee rooms, US House (loose approximation). |
| `grid`            | Rectangular grid — generic / electoral-college style. |
| `circle`          | Single ring around a table — G7, Security Council. |

Each layout factory returns a `Layout` object with shape-specific getters/setters. Common options across all: `.size([w, h])`, `.seatRadius()`, `.padding()`.

## Phases

### Phase 1 — Scaffold (this commit)
- Repo + README + plan + package.json + tsconfig.
- Empty `src/index.ts`, `src/types.ts`, stub layout file.
- No layouts implemented yet.

### Phase 2 — Hemicycle MVP
- Implement `hemicycle` end-to-end.
- One HTML example in `examples/` (US Senate).
- Vite build producing ESM + types.
- Manual visual QA.

### Phase 3 — Layout expansion
- `horseshoe`, `opposing-benches`, `classroom` in that order.
- One example per layout.

### Phase 4 — Renderer helper
- `renderAssembly(node, config)` — opinionated one-call SVG output with sane defaults (seat circles, group colours, hover class).

### Phase 5 — React wrapper (separate package, later)
- `@rep-ass-js/react` — `<Assembly>` component.
- Lives in this repo as a sub-package or alongside; decide when we get there.

### Phase 6 — Integration into context-web-app
- Use it for UN / Security Council / Senate visualisations on Intel or About pages.
- Wire up Wikidata-driven seat data where it exists.

## Open questions

- **Module shape:** single package with sub-imports (`rep-ass-js/layouts/hemicycle`) vs a monorepo of `@rep-ass-js/core`, `@rep-ass-js/react`, etc.? Default to single package for now; split later if needed.
- **Seat assignment ordering:** within a layout, how do groups get arranged? Left-to-right by config order? By size? Configurable via `.groupOrder(...)`. Worth a small abstraction.
- **Named seats vs anonymous seats:** UN has named delegations (each country = one seat); Commons has anonymous benches. The `seats?` override array on `AssemblyData` covers this — but ergonomics need testing.
- **Empty seats / vacancies:** support a sentinel `Group` (`id: 'vacant'`) or first-class `vacancies: number`? Lean towards sentinel — keeps the model uniform.
- **License:** MIT is the default for D3 ecosystem; confirm with Euan before first publish.

## Out of scope (for now)

- Animation between configurations (e.g. election-night seat reallocation).
- Geographic / cartogram-style assemblies (US electoral college tiles by state).
- Accessibility automation (ARIA labelling of seats) — comes with the renderer helper, not the layout core.
