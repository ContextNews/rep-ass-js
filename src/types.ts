export type Side = 'left' | 'right'

export interface Group {
  id: string
  label?: string
  color?: string
  /** Number of seats this group occupies. */
  size: number
  /** For opposing-benches layouts: which side of the aisle this group sits on. */
  side?: Side
}

export interface HemicycleShape {
  type: 'hemicycle'
  /** Total number of seat positions to generate. */
  totalSeats: number
  /** Number of concentric arcs (rows of seats). */
  rows: number
  /** Radius of the innermost arc (in canvas units). */
  innerRadius: number
  /** Radius of the outermost arc. */
  outerRadius: number
  /** Start angle in radians. Defaults to Math.PI (left side of the horizontal axis). */
  startAngle?: number
  /** End angle in radians. Defaults to 0 (right side). */
  endAngle?: number
  /** Radius of each seat circle. Defaults to 6. */
  seatRadius?: number
  /** Padding around the layout (canvas units). Defaults to 24. */
  padding?: number
}

export interface OpposingBenchesShape {
  type: 'opposing-benches'
  /** Number of benches (rows) on each side of the aisle. */
  rowsPerSide: number
  /** Seats per bench. A number for uniform rows, or an array for per-row counts. */
  seatsPerRow: number | number[]
  /** Horizontal gap between the two banks of benches (in canvas units). */
  benchGap: number
  /** Distance between adjacent benches on the same side. */
  rowSpacing: number
  /** Distance between adjacent seats on the same bench. */
  seatSpacing: number
  /** Radius of each seat circle. Defaults to 6. */
  seatRadius?: number
  /** Padding around the layout. Defaults to 24. */
  padding?: number
}

export interface GridShape {
  type: 'grid'
  rows: number
  cols: number
  rowSpacing: number
  seatSpacing: number
  seatRadius?: number
  padding?: number
}

export type ShapeConfig = HemicycleShape | OpposingBenchesShape | GridShape

export interface AssemblyConfig {
  id: string
  name: string
  /** Human-readable description shown in examples / docs. */
  description?: string
  shape: ShapeConfig
  /** Political / national groupings. Order matters for non-side-based layouts. */
  groups: Group[]
}

export interface SeatPosition {
  /** Stable index across the whole layout, 0-based. */
  index: number
  x: number
  y: number
  /** Seat radius. */
  r: number
  /** Layout-specific row index (0 = innermost / front bench). */
  row?: number
  /** Layout-specific column index. */
  col?: number
  /** Angle in radians (radial layouts only). */
  angle?: number
  /** Side of the aisle (opposing-benches only). */
  side?: Side
}

export interface Seat extends SeatPosition {
  id: string
  /** The group this seat belongs to, or null if unassigned / vacant. */
  group: Group | null
}

export interface AssemblyLayout {
  /** Positioned, group-assigned seats. */
  seats: Seat[]
  /** Suggested SVG canvas width. */
  width: number
  /** Suggested SVG canvas height. */
  height: number
  /** The config that produced this layout (for downstream rendering). */
  config: AssemblyConfig
}
