# rep-ass-js

**Representative Assembly JS** — a small TypeScript layout library for visualising legislative and representative assemblies (UN, US Senate, UK Commons, EU Parliament, etc.).

`rep-ass-js` is **config-driven**: you describe an assembly (shape + dimensions + groups) once as a plain object, hand it to `layout()`, and get back positioned seats. You render them with whatever you like — D3 selections, plain DOM, Canvas, React, your own renderer.

**Live examples:** <https://contextnews.github.io/rep-ass-js/>

> Status: **v0.0.1** — 19 built-in configs covering most major world parliaments, three layouts (`hemicycle`, `opposing-benches`, `grid`). See [`plans/001-initial-design.md`](./plans/001-initial-design.md) for the roadmap.

## Install

```bash
npm install rep-ass-js
```

There are no runtime dependencies. The examples use `d3-selection` for rendering, but the core library is renderer-agnostic.

## Usage

```ts
import { layout, usSenate } from 'rep-ass-js'

const { seats, width, height } = layout(usSenate)

// `seats` is Seat[]: { id, index, x, y, r, group: Group | null, ... }
// `width` / `height` are suggested SVG canvas dimensions for the layout.
```

Render with any tool:

```ts
import { select } from 'd3-selection'

const svg = select('#chart')
  .append('svg')
  .attr('viewBox', `0 0 ${width} ${height}`)

svg.selectAll('circle')
  .data(seats)
  .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r',  d => d.r)
    .attr('fill', d => d.group?.color ?? '#888')
```

## Defining your own assembly

A config is a plain object:

```ts
import { layout, type AssemblyConfig } from 'rep-ass-js'

const myAssembly: AssemblyConfig = {
  id: 'my-council',
  name: 'My Council',
  shape: {
    type: 'hemicycle',
    totalSeats: 60,
    rows: 3,
    innerRadius: 80,
    outerRadius: 240,
    seatRadius: 8,
  },
  groups: [
    { id: 'a', label: 'Party A', color: '#1f6feb', size: 25 },
    { id: 'b', label: 'Independents', color: '#888', size: 5 },
    { id: 'c', label: 'Party C', color: '#d1242f', size: 30 },
  ],
}

const result = layout(myAssembly)
```

## Layouts

| Layout              | Shape `type`        | Best for                                        |
| ------------------- | ------------------- | ----------------------------------------------- |
| Hemicycle           | `'hemicycle'`       | US Senate, French National Assembly, EU Parl.   |
| Opposing benches    | `'opposing-benches'`| UK Commons / Lords                              |
| Grid                | `'grid'`            | Generic / electoral-college style               |

### `hemicycle`

```ts
{
  type: 'hemicycle',
  totalSeats: number,
  rows: number,
  innerRadius: number,
  outerRadius: number,
  startAngle?: number,   // default Math.PI (left of horizontal)
  endAngle?: number,     // default 0 (right of horizontal)
  seatRadius?: number,   // default 6
  padding?: number,      // default 24
}
```

Seats are distributed across rows proportionally to row radius (longer arcs get more seats). Integer allocation uses the largest-remainder method, so seat counts always sum to `totalSeats` exactly. Seats are ordered left-to-right around the arc — groups are filled in declaration order, producing the conventional left-to-right ideological flow.

### `opposing-benches`

```ts
{
  type: 'opposing-benches',
  rowsPerSide: number,
  seatsPerRow: number | number[],
  benchGap: number,
  rowSpacing: number,
  seatSpacing: number,
  seatRadius?: number,
  padding?: number,
}
```

Groups must declare a `side: 'left' | 'right'` to be placed. Each side fills its declared groups in order, front bench first, top-to-bottom within each bench.

### `grid`

```ts
{
  type: 'grid',
  rows: number,
  cols: number,
  rowSpacing: number,
  seatSpacing: number,
  seatRadius?: number,
  padding?: number,
}
```

Row-major seat order (left-to-right, top-to-bottom).

## Built-in configs

| Region | Configs |
| --- | --- |
| Supranational | `unGeneralAssembly`, `euParliament` |
| North America | `usSenate`, `usHouse`, `canadaSenate`, `canadaCommons` |
| United Kingdom | `ukCommons`, `ukLords` |
| Continental Europe | `germanyBundestag`, `franceAssembly`, `spainCongress`, `italyChamber`, `polandSejm` |
| Middle East | `israelKnesset`, `iranMajlis` |
| Eastern Europe / Russia | `ukraineRada`, `russiaDuma`, `russiaFedCouncil` |
| Asia | `chinaNpc` |

```ts
import { ukCommons, usSenate, israelKnesset } from 'rep-ass-js'
```

Each is an `AssemblyConfig` with reasonable defaults and stylised composition reflecting current real-world membership (composition figures are approximate and not auto-updated). Tweak them by spreading:

```ts
const customCommons: AssemblyConfig = {
  ...ukCommons,
  groups: [/* your own group sizes */],
}
```

## Examples

```bash
npm install
npm run dev
```

Opens an examples page at <http://127.0.0.1:5180/> showing every built-in config rendered with `d3-selection`.

## Project layout

```
rep-ass-js/
├── src/
│   ├── index.ts             # public API
│   ├── layout.ts            # main layout(config) entry
│   ├── types.ts             # config + seat types
│   ├── assign.ts            # group-to-position assignment
│   ├── layouts/
│   │   ├── hemicycle.ts
│   │   ├── opposingBenches.ts
│   │   └── grid.ts
│   └── configs/             # built-in AssemblyConfig presets
├── examples/                # Vite-served demo page (D3 renderer)
└── plans/                   # design docs & roadmap
```

## License

MIT
