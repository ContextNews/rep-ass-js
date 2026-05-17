# rep-ass-js

**Representative Assembly JS** — a D3-style layout module for visualising legislative and representative assemblies (UN General Assembly, US Senate, UK House of Commons, EU Parliament, etc.).

`rep-ass-js` follows the conventions of the D3 ecosystem: it is a **layout generator**, not a charting library. You hand it a seat/group definition and a layout configuration; it returns positioned seats. You draw them with D3 selections (or anything else that can render SVG).

> Status: **early scaffold** — API surface and layouts are being designed. See [`plans/001-initial-design.md`](./plans/001-initial-design.md).

## Why a separate library?

Existing parliament-chart tooling tends to bake in a single shape (usually a hemicycle) and a single rendering path. Real-world assemblies vary widely: the UN sits in a horseshoe, the Commons in opposing benches, the US Senate in a classroom-style semicircle, the EU Parliament in a multi-tier hemicycle. A layout-only library lets the same primitives drive any of them and stays composable with the rest of D3.

## Install

```bash
npm install rep-ass-js d3
```

`d3` (or the specific `d3-selection` / `d3-scale` sub-modules you need to render) is a peer dependency.

## Usage sketch

```ts
import { assembly } from 'rep-ass-js'
import * as d3 from 'd3'

const layout = assembly()
  .shape('hemicycle')
  .rows(8)
  .seatRadius(6)
  .size([800, 400])

const seats = layout({
  groups: [
    { id: 'dem',  label: 'Democrats',   color: '#2b6cb0', size: 47 },
    { id: 'rep',  label: 'Republicans', color: '#c53030', size: 49 },
    { id: 'ind',  label: 'Independent', color: '#718096', size: 4  },
  ],
})

d3.select('#chart')
  .append('svg')
    .attr('viewBox', '0 0 800 400')
  .selectAll('circle')
  .data(seats)
  .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r',  d => d.r)
    .attr('fill', d => d.group.color)
```

For users who don't want to wire D3 selections themselves, an opinionated one-shot renderer will be available:

```ts
import { renderAssembly } from 'rep-ass-js/render'

renderAssembly(document.querySelector('#chart'), {
  shape: 'opposing-benches',
  groups: [...],
})
```

## Planned layouts

| Layout            | Real-world example                  |
| ----------------- | ----------------------------------- |
| `hemicycle`       | US Senate, French National Assembly |
| `horseshoe`       | UN General Assembly                 |
| `opposing-benches`| UK House of Commons / Lords         |
| `classroom`       | Bundestag committee rooms           |
| `grid`            | Generic / electoral-college style   |
| `circle`          | Round-table / G7-style              |

## Project layout

```
rep-ass-js/
├── src/
│   ├── index.ts        # public API
│   ├── types.ts        # Seat, Group, AssemblyData, Layout
│   ├── layouts/        # one file per layout generator
│   └── render.ts       # optional opinionated renderer
├── examples/           # standalone HTML demos per real-world assembly
└── plans/              # design docs & roadmap
```

## Repo

Lives in the `context` GitHub org alongside `context-web-app`, `context-api`, etc. Will eventually be consumed by `context-web-app` for in-app visualisations of named assemblies.

## License

TBD — likely MIT.
