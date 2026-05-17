import type { AssemblyConfig } from '../types'

/**
 * Sejm — lower house of the Polish Parliament, 460 seats.
 * Composition from the October 2023 election.
 */
export const polandSejm: AssemblyConfig = {
  id: 'poland-sejm',
  name: 'Sejm (Poland)',
  description:
    'Lower house of the Polish Parliament — 460 deputies elected by open-list proportional representation.',
  shape: {
    type: 'hemicycle',
    totalSeats: 460,
    rows: 7,
    innerRadius: 110,
    outerRadius: 400,
    seatRadius: 6,
    padding: 30,
  },
  groups: [
    { id: 'lewica', label: 'The Left (Lewica)',     color: '#a31c1a', size: 26  },
    { id: 'ko',     label: 'Civic Coalition (KO)',  color: '#faa61a', size: 157 },
    { id: 'td',     label: 'Third Way',             color: '#3aa55c', size: 65  },
    { id: 'pis',    label: 'Law and Justice (PiS)', color: '#1b3050', size: 194 },
    { id: 'konf',   label: 'Confederation',         color: '#5b3275', size: 18  },
  ],
}
