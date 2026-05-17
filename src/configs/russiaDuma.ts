import type { AssemblyConfig } from '../types'

/**
 * State Duma — lower house of the Russian Federal Assembly, 450 seats.
 * Composition from the 2021 election (8th convocation).
 */
export const russiaDuma: AssemblyConfig = {
  id: 'russia-duma',
  name: 'State Duma (Russia)',
  description:
    'Lower house of the Russian Federal Assembly — 450 deputies elected to five-year terms.',
  shape: {
    type: 'hemicycle',
    totalSeats: 450,
    rows: 7,
    innerRadius: 110,
    outerRadius: 400,
    seatRadius: 6,
    padding: 30,
  },
  groups: [
    { id: 'kprf', label: 'KPRF (Communist Party)', color: '#a31c1a', size: 57 },
    { id: 'sr',   label: 'A Just Russia',          color: '#faa61a', size: 28 },
    { id: 'np',   label: 'New People',             color: '#12b6cf', size: 15 },
    { id: 'er',   label: 'United Russia',          color: '#1f6feb', size: 324 },
    { id: 'ldpr', label: 'LDPR',                   color: '#ffcc00', size: 23 },
    { id: 'ind',  label: 'Independent',            color: '#8b949e', size: 3  },
  ],
}
