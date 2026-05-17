import type { GridShape, SeatPosition } from '../types'

interface GridResult {
  positions: SeatPosition[]
  width: number
  height: number
}

/**
 * Rectangular grid of seats. Useful for generic / electoral-college style
 * visualisations. Seats are ordered row-major (left-to-right, top-to-bottom).
 */
export function layoutGrid(shape: GridShape): GridResult {
  const {
    rows,
    cols,
    rowSpacing,
    seatSpacing,
    seatRadius = 6,
    padding = 24,
  } = shape

  if (rows < 1 || cols < 1) throw new Error('grid: rows and cols must be >= 1')

  const contentWidth = (cols - 1) * seatSpacing
  const contentHeight = (rows - 1) * rowSpacing
  const width = contentWidth + 2 * padding + 2 * seatRadius
  const height = contentHeight + 2 * padding + 2 * seatRadius

  const x0 = padding + seatRadius
  const y0 = padding + seatRadius

  const positions: SeatPosition[] = []
  let index = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({
        index: index++,
        x: x0 + c * seatSpacing,
        y: y0 + r * rowSpacing,
        r: seatRadius,
        row: r,
        col: c,
      })
    }
  }

  return { positions, width, height }
}
