import type { AssemblyConfig } from '../types'

/**
 * US House of Representatives — 435 voting members in a hemicycle.
 * Composition reflects the 119th Congress (Jan 2025–) as sworn in.
 */
export const usHouse: AssemblyConfig = {
  id: 'us-house',
  name: 'US House of Representatives',
  description:
    'Lower chamber of the United States Congress — 435 voting members elected from single-member districts.',
  shape: {
    type: 'hemicycle',
    totalSeats: 435,
    rows: 7,
    innerRadius: 110,
    outerRadius: 420,
    seatRadius: 7,
    padding: 30,
  },
  groups: [
    { id: 'dem', label: 'Democrats',   color: '#1f6feb', size: 213 },
    { id: 'rep', label: 'Republicans', color: '#d1242f', size: 220 },
  ],
}
