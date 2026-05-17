import type { AssemblyConfig } from '../types'

/**
 * European Parliament — 720 seats in a deep hemicycle (10 rows).
 *
 * Group sizes are approximate post-2024 European election figures. The
 * Parliament's actual seating order roughly runs left-to-right along the
 * political spectrum, which is what the hemicycle layout's natural seat
 * order (leftmost first) produces.
 */
export const euParliament: AssemblyConfig = {
  id: 'eu-parliament',
  name: 'European Parliament',
  description:
    'The European Parliament — 720 MEPs, deep hemicycle, groups ordered left-to-right by political family.',
  shape: {
    type: 'hemicycle',
    totalSeats: 720,
    rows: 10,
    innerRadius: 120,
    outerRadius: 460,
    seatRadius: 5,
    padding: 30,
  },
  groups: [
    { id: 'left',   label: 'The Left',          color: '#7a0a0a', size: 46  },
    { id: 'sd',     label: 'S&D',               color: '#d1242f', size: 136 },
    { id: 'green',  label: 'Greens/EFA',        color: '#3aa55c', size: 53  },
    { id: 'renew',  label: 'Renew Europe',      color: '#faa61a', size: 77  },
    { id: 'epp',    label: 'EPP',               color: '#1f6feb', size: 188 },
    { id: 'ecr',    label: 'ECR',               color: '#7c4dff', size: 78  },
    { id: 'pfe',    label: 'Patriots for Europe', color: '#0b5fa5', size: 84 },
    { id: 'esn',    label: 'Europe of Sovereign Nations', color: '#5a3a1a', size: 25 },
    { id: 'ni',     label: 'Non-attached',      color: '#8b949e', size: 33  },
  ],
}
