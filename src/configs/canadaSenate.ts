import type { AssemblyConfig } from '../types'

/**
 * Senate of Canada — 105 seats, Westminster-style opposing benches.
 *
 * Most senators sit as independents organised into three groups (ISG,
 * CSG, PSG) rather than along strict party lines. Only the Conservative
 * caucus operates as a formal party group. Vacancies are common as
 * appointments lag retirements.
 */
export const canadaSenate: AssemblyConfig = {
  id: 'canada-senate',
  name: 'Senate of Canada',
  description:
    'Upper house of the Parliament of Canada — appointed senators across independent groups and one party caucus.',
  shape: {
    type: 'opposing-benches',
    rowsPerSide: 4,
    seatsPerRow: 14,
    benchGap: 70,
    rowSpacing: 22,
    seatSpacing: 16,
    seatRadius: 7,
    padding: 30,
  },
  groups: [
    // Left side — opposition and non-affiliated
    { id: 'csg', label: 'Canadian Senators Group', color: '#faa61a', size: 18, side: 'left'  },
    { id: 'con', label: 'Conservative',            color: '#1f6feb', size: 12, side: 'left'  },
    { id: 'non', label: 'Non-affiliated',          color: '#8b949e', size: 5,  side: 'left'  },
    // Right side — government-affiliated independents
    { id: 'isg', label: 'Independent Senators Group', color: '#5b3275', size: 38, side: 'right' },
    { id: 'psg', label: 'Progressive Senate Group',   color: '#3aa55c', size: 17, side: 'right' },
  ],
}
