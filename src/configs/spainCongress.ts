import type { AssemblyConfig } from '../types'

/**
 * Congress of Deputies (Congreso de los Diputados) — lower house of
 * the Cortes Generales, 350 seats. Composition from the July 2023
 * general election.
 */
export const spainCongress: AssemblyConfig = {
  id: 'spain-congress',
  name: 'Congress of Deputies (Spain)',
  description:
    'Lower house of the Cortes Generales — 350 deputies elected by closed-list proportional representation.',
  shape: {
    type: 'hemicycle',
    totalSeats: 350,
    rows: 6,
    innerRadius: 110,
    outerRadius: 380,
    seatRadius: 6.5,
    padding: 30,
  },
  groups: [
    { id: 'bildu', label: 'EH Bildu',          color: '#a31c1a', size: 6   },
    { id: 'bng',   label: 'BNG',               color: '#6cb33e', size: 1   },
    { id: 'sumar', label: 'Sumar',             color: '#be3075', size: 27  },
    { id: 'erc',   label: 'ERC',               color: '#faa61a', size: 7   },
    { id: 'psoe',  label: 'PSOE',              color: '#d1242f', size: 121 },
    { id: 'pnv',   label: 'PNV',               color: '#008b3d', size: 5   },
    { id: 'junts', label: 'Junts',             color: '#12b6cf', size: 7   },
    { id: 'cca',   label: 'Coalición Canaria', color: '#003c8f', size: 1   },
    { id: 'pp',    label: 'PP',                color: '#1f6feb', size: 137 },
    { id: 'upn',   label: 'UPN',               color: '#5b3275', size: 1   },
    { id: 'vox',   label: 'Vox',               color: '#5ac035', size: 33  },
    { id: 'other', label: 'Other / Vacant',    color: '#555555', size: 4   },
  ],
}
