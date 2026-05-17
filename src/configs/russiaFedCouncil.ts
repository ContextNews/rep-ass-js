import type { AssemblyConfig } from '../types'

/**
 * Federation Council — upper house of the Russian Federal Assembly.
 * Senators represent the 89 federal subjects (two each) plus
 * presidential appointees. Members do not formally belong to political
 * parties in this chamber.
 */
export const russiaFedCouncil: AssemblyConfig = {
  id: 'russia-federation-council',
  name: 'Federation Council (Russia)',
  description:
    'Upper house of the Russian Federal Assembly — senators representing federal subjects and presidential appointees.',
  shape: {
    type: 'hemicycle',
    totalSeats: 178,
    rows: 5,
    innerRadius: 110,
    outerRadius: 340,
    seatRadius: 8,
    padding: 30,
  },
  groups: [
    { id: 'fc', label: 'Federation Council Members', color: '#1f6feb', size: 178 },
  ],
}
