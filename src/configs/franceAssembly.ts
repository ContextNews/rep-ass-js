import type { AssemblyConfig } from '../types'

/**
 * National Assembly of France — 577 seats, 17th legislature.
 *
 * Composition reflects the July 2024 snap election, with the left-wing
 * Nouveau Front Populaire (NFP) bloc broken out by component party.
 * Groups are ordered left-to-right by political alignment.
 */
export const franceAssembly: AssemblyConfig = {
  id: 'france-assembly',
  name: 'National Assembly (France)',
  description:
    'Lower house of the French Parliament — 577 deputies, ordered hémicycle-style from far-left to far-right.',
  shape: {
    type: 'hemicycle',
    totalSeats: 577,
    rows: 8,
    innerRadius: 110,
    outerRadius: 420,
    seatRadius: 5.5,
    padding: 30,
  },
  groups: [
    { id: 'pcf',    label: 'Communist (PCF)',       color: '#722c1d', size: 9   },
    { id: 'lfi',    label: 'La France Insoumise',   color: '#a31c1a', size: 71  },
    { id: 'eco',    label: 'Greens (Écologistes)',  color: '#3aa55c', size: 33  },
    { id: 'ps',     label: 'Socialists (PS)',       color: '#d1242f', size: 66  },
    { id: 'liot',   label: 'LIOT',                  color: '#8b949e', size: 21  },
    { id: 'ens',    label: 'Ensemble',              color: '#faa61a', size: 166 },
    { id: 'lr',     label: 'Les Républicains',      color: '#1f6feb', size: 47  },
    { id: 'udr',    label: 'UDR',                   color: '#5b3275', size: 16  },
    { id: 'rn',     label: 'Rassemblement National',color: '#1b3050', size: 126 },
    { id: 'other',  label: 'Other / Vacant',        color: '#555555', size: 22  },
  ],
}
