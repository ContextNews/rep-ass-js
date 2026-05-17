import type { AssemblyConfig } from '../types'

/**
 * US Senate — 100 seats arranged as a 4-row hemicycle.
 *
 * Stylised composition (figures approximate; tweak as desired).
 */
export const usSenate: AssemblyConfig = {
  id: 'us-senate',
  name: 'US Senate',
  description: 'The United States Senate — 100 members, 4-row hemicycle.',
  shape: {
    type: 'hemicycle',
    totalSeats: 100,
    rows: 4,
    innerRadius: 100,
    outerRadius: 320,
    seatRadius: 9,
    padding: 30,
  },
  groups: [
    { id: 'dem', label: 'Democrats',     color: '#1f6feb', size: 47 },
    { id: 'ind', label: 'Independent',   color: '#8b949e', size: 4  },
    { id: 'rep', label: 'Republicans',   color: '#d1242f', size: 49 },
  ],
}
