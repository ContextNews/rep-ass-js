import type { AssemblyConfig } from '../types'

/**
 * UK House of Lords — stylised opposing-benches with ~800 capacity.
 *
 * In the real chamber, Crossbench peers sit perpendicular to the main
 * banks of benches at the south end. In this 2-sided layout they sit
 * alongside the government with the Lords Spiritual on the right.
 */
export const ukLords: AssemblyConfig = {
  id: 'uk-lords',
  name: 'UK House of Lords',
  description:
    'Upper chamber of the UK Parliament — appointed peers across government, opposition, crossbench, and the Lords Spiritual.',
  shape: {
    type: 'opposing-benches',
    rowsPerSide: 5,
    seatsPerRow: 80,
    benchGap: 70,
    rowSpacing: 22,
    seatSpacing: 9,
    seatRadius: 4,
    padding: 30,
  },
  groups: [
    // Left side — opposition + non-aligned
    { id: 'con',     label: 'Conservative',     color: '#0087dc', size: 273, side: 'left'  },
    { id: 'libdem',  label: 'Liberal Democrat', color: '#faa61a', size: 78,  side: 'left'  },
    { id: 'non-aff', label: 'Non-affiliated',   color: '#555555', size: 39,  side: 'left'  },
    // Right side — government + crossbench + bishops
    { id: 'lab',     label: 'Labour',           color: '#d1242f', size: 187, side: 'right' },
    { id: 'lord-sp', label: 'Lords Spiritual',  color: '#5b3275', size: 25,  side: 'right' },
    { id: 'cross',   label: 'Crossbench',       color: '#8b949e', size: 184, side: 'right' },
  ],
}
