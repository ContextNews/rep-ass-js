import type { OpposingBenchesShape, SeatPosition, Side } from '../types'

interface OpposingBenchesResult {
  positions: SeatPosition[]
  width: number
  height: number
}

/**
 * Generate seat positions for an opposing-benches layout
 * (e.g. UK House of Commons, House of Lords).
 *
 * Geometry: a vertical central aisle separates two banks of benches. Each
 * bench (`row`) runs vertically, parallel to the aisle. Row 0 on each side
 * is the front bench (closest to the aisle); higher rows are back-benches.
 * Seats along a bench are ordered top-to-bottom.
 *
 * Seat ordering: all left-side seats first (front bench → back bench, then
 * top → bottom within each bench), followed by all right-side seats in the
 * same intra-side order. This makes group assignment trivial — each side's
 * groups consume that side's positions in declaration order.
 */
export function layoutOpposingBenches(
  shape: OpposingBenchesShape,
): OpposingBenchesResult {
  const {
    rowsPerSide,
    seatsPerRow,
    benchGap,
    rowSpacing,
    seatSpacing,
    seatRadius = 6,
    padding = 24,
  } = shape

  if (rowsPerSide < 1) throw new Error('opposing-benches: rowsPerSide must be >= 1')
  if (benchGap < 0) throw new Error('opposing-benches: benchGap must be >= 0')

  // Resolve per-row seat counts.
  const perRow: number[] =
    typeof seatsPerRow === 'number'
      ? Array(rowsPerSide).fill(seatsPerRow)
      : seatsPerRow.slice()
  if (perRow.length !== rowsPerSide) {
    throw new Error(
      `opposing-benches: seatsPerRow array length (${perRow.length}) must match rowsPerSide (${rowsPerSide})`,
    )
  }
  if (perRow.some((n) => n < 1)) {
    throw new Error('opposing-benches: each row must have >= 1 seat')
  }

  const maxSeats = Math.max(...perRow)
  const contentHeight = (maxSeats - 1) * seatSpacing
  const sideWidth = benchGap / 2 + (rowsPerSide - 1) * rowSpacing
  const contentWidth = sideWidth * 2

  const width = contentWidth + 2 * padding + 2 * seatRadius
  const height = contentHeight + 2 * padding + 2 * seatRadius
  const cx = width / 2
  const cy = height / 2

  const positions: SeatPosition[] = []
  let index = 0

  // Left side first, then right side, so seat indices group naturally by side.
  for (const side of ['left', 'right'] as Side[]) {
    const sign = side === 'left' ? -1 : 1
    for (let r = 0; r < rowsPerSide; r++) {
      const n = perRow[r]
      const x = cx + sign * (benchGap / 2 + r * rowSpacing)
      for (let s = 0; s < n; s++) {
        // Centre the bench's seats vertically around cy.
        const y = cy + (s - (n - 1) / 2) * seatSpacing
        positions.push({
          index: index++,
          x,
          y,
          r: seatRadius,
          row: r,
          col: s,
          side,
        })
      }
    }
  }

  return { positions, width, height }
}
