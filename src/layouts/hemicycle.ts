import type { HemicycleShape, SeatPosition } from '../types'

interface HemicycleResult {
  positions: SeatPosition[]
  width: number
  height: number
}

/**
 * Generate seat positions for a hemicycle (half-disc) layout.
 *
 * Seats are distributed across `rows` concentric arcs. The number of seats
 * per arc is proportional to the arc's radius (so angular spacing stays
 * roughly constant between rows), with integer allocation by the
 * largest-remainder method.
 *
 * Positions are returned in canvas coordinates (origin at top-left, y-down),
 * pre-translated so the bounding box fits within [0,width] x [0,height].
 * Seat ordering: index 0 is the leftmost seat across all rows, advancing
 * around the arc towards the right.
 */
export function layoutHemicycle(shape: HemicycleShape): HemicycleResult {
  const {
    totalSeats,
    rows,
    innerRadius,
    outerRadius,
    startAngle = Math.PI,
    endAngle = 0,
    seatRadius = 6,
    padding = 24,
  } = shape

  if (rows < 1) throw new Error('hemicycle: rows must be >= 1')
  if (totalSeats < 1) throw new Error('hemicycle: totalSeats must be >= 1')
  if (innerRadius >= outerRadius) {
    throw new Error('hemicycle: innerRadius must be < outerRadius')
  }

  // Row radii — linearly interpolated between inner and outer.
  const radii: number[] = []
  for (let i = 0; i < rows; i++) {
    const t = rows === 1 ? 0.5 : i / (rows - 1)
    radii.push(innerRadius + (outerRadius - innerRadius) * t)
  }

  // Allocate seats per row proportional to row radius (≈ arc length), using
  // largest-remainder integer allocation so totals match exactly.
  const totalWeight = radii.reduce((s, r) => s + r, 0)
  const raw = radii.map((r) => (totalSeats * r) / totalWeight)
  const floors = raw.map(Math.floor)
  let remaining = totalSeats - floors.reduce((s, n) => s + n, 0)
  const fracRanking = raw
    .map((value, i) => ({ i, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac)
  const seatsPerRow = floors.slice()
  for (let k = 0; k < remaining; k++) {
    seatsPerRow[fracRanking[k].i] += 1
  }

  // Place seats. For each row, distribute n seats evenly within the arc.
  // Mid-cell positioning ((s + 0.5) / n) keeps a small margin at each end.
  type Placed = { row: number; radius: number; angle: number }
  const placed: Placed[] = []
  for (let r = 0; r < rows; r++) {
    const n = seatsPerRow[r]
    if (n === 0) continue
    const radius = radii[r]
    for (let s = 0; s < n; s++) {
      const t = n === 1 ? 0.5 : (s + 0.5) / n
      const angle = startAngle + (endAngle - startAngle) * t
      placed.push({ row: r, radius, angle })
    }
  }

  // Sort all seats by angle so index 0 is on the startAngle side.
  // Convention: startAngle > endAngle (e.g. π → 0), so we want angle DESC.
  const angleDir = startAngle >= endAngle ? -1 : 1
  placed.sort((a, b) => angleDir * (a.angle - b.angle))

  // Canvas: the hemicycle is centred horizontally with its flat (diameter)
  // edge at the bottom of the content area.
  const width = 2 * outerRadius + 2 * padding
  const height = outerRadius + 2 * padding
  const cx = width / 2
  const cy = height - padding

  const positions: SeatPosition[] = placed.map((p, idx) => ({
    index: idx,
    x: cx + Math.cos(p.angle) * p.radius,
    y: cy - Math.sin(p.angle) * p.radius,
    r: seatRadius,
    row: p.row,
    angle: p.angle,
  }))

  return { positions, width, height }
}
