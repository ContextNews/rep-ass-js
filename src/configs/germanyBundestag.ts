import type { AssemblyConfig } from '../types'

/**
 * Bundestag — German federal parliament, 21st convocation.
 *
 * 630 seats after the 2023 electoral reform reduced the chamber from
 * its previous variable size. Composition reflects the February 2025
 * federal election.
 */
export const germanyBundestag: AssemblyConfig = {
  id: 'germany-bundestag',
  name: 'Bundestag (Germany)',
  description:
    'Federal parliament of Germany — 630 members in the 21st Bundestag, elected by mixed-member proportional representation.',
  shape: {
    type: 'hemicycle',
    totalSeats: 630,
    rows: 9,
    innerRadius: 120,
    outerRadius: 440,
    seatRadius: 5,
    padding: 30,
  },
  groups: [
    { id: 'linke',  label: 'Die Linke', color: '#be3075', size: 64  },
    { id: 'spd',    label: 'SPD',       color: '#d1242f', size: 120 },
    { id: 'gruene', label: 'Grüne',     color: '#3aa55c', size: 85  },
    { id: 'ssw',    label: 'SSW',       color: '#003c8f', size: 1   },
    { id: 'cdu',    label: 'CDU/CSU',   color: '#2c2c2c', size: 208 },
    { id: 'afd',    label: 'AfD',       color: '#009ee0', size: 152 },
  ],
}
