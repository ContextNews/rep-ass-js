import type { AssemblyConfig } from '../types'

/**
 * UK House of Commons — stylised opposing-benches layout.
 *
 * The real chamber seats ~427 MPs across 5 rows of benches on each side,
 * with 650 MPs in total. This config is a faithful-feeling stylisation
 * (5 rows per side × 28 seats = 280 positions) and uses approximate post-2024
 * general election party sizes. Members without a declared side appear
 * as cross-bench / vacant tail.
 */
export const ukCommons: AssemblyConfig = {
  id: 'uk-commons',
  name: 'UK House of Commons',
  description:
    'House of Commons — opposing benches with the Speaker at one end of the aisle.',
  shape: {
    type: 'opposing-benches',
    rowsPerSide: 5,
    seatsPerRow: 28,
    benchGap: 80,
    rowSpacing: 22,
    seatSpacing: 16,
    seatRadius: 7,
    padding: 30,
  },
  // Government (Labour) sits on the Speaker's right; rendered here on the
  // right of the diagram. Opposition + minor parties on the left.
  groups: [
    // Right side — Government
    { id: 'lab',     label: 'Labour',             color: '#d1242f', size: 130, side: 'right' },
    { id: 'lab-coop',label: 'Labour Co-operative',color: '#660033', size: 10,  side: 'right' },
    // Left side — Opposition
    { id: 'con',     label: 'Conservative',       color: '#1f6feb', size: 80,  side: 'left'  },
    { id: 'libdem',  label: 'Liberal Democrat',   color: '#faa61a', size: 30,  side: 'left'  },
    { id: 'snp',     label: 'SNP',                color: '#ffcc00', size: 12,  side: 'left'  },
    { id: 'grn',     label: 'Green',              color: '#3aa55c', size: 6,   side: 'left'  },
    { id: 'ref',     label: 'Reform UK',          color: '#12b6cf', size: 4,   side: 'left'  },
  ],
}
