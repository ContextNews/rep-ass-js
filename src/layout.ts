import { assignGroups } from './assign'
import { layoutGrid } from './layouts/grid'
import { layoutHemicycle } from './layouts/hemicycle'
import { layoutOpposingBenches } from './layouts/opposingBenches'
import type { AssemblyConfig, AssemblyLayout, SeatPosition } from './types'

/**
 * Compute the full layout for an assembly config.
 *
 * Pipeline:
 *   1. Generate raw seat positions from the shape config.
 *   2. Assign groups to those positions (sequential or side-based).
 *   3. Return seats + suggested canvas dimensions for rendering.
 *
 * Rendering is left to the caller — see `examples/` for a D3-selection
 * driven renderer, but plain DOM / Canvas / React work just as well.
 */
export function layout(config: AssemblyConfig): AssemblyLayout {
  const shaped = generatePositions(config)
  const seats = assignGroups(shaped.positions, config)
  return {
    seats,
    width: shaped.width,
    height: shaped.height,
    config,
  }
}

function generatePositions(config: AssemblyConfig): {
  positions: SeatPosition[]
  width: number
  height: number
} {
  switch (config.shape.type) {
    case 'hemicycle':
      return layoutHemicycle(config.shape)
    case 'opposing-benches':
      return layoutOpposingBenches(config.shape)
    case 'grid':
      return layoutGrid(config.shape)
  }
}
