import type { AssemblyConfig } from '../types'

/**
 * Chamber of Deputies (Camera dei deputati) — lower house of the
 * Italian Parliament, reduced from 630 to 400 members by the 2020
 * constitutional referendum. Composition from the September 2022
 * election.
 */
export const italyChamber: AssemblyConfig = {
  id: 'italy-chamber',
  name: 'Chamber of Deputies (Italy)',
  description:
    'Lower house of the Italian Parliament — 400 deputies after the 2020 constitutional reduction.',
  shape: {
    type: 'hemicycle',
    totalSeats: 400,
    rows: 7,
    innerRadius: 110,
    outerRadius: 390,
    seatRadius: 6.5,
    padding: 30,
  },
  groups: [
    { id: 'avs',   label: 'Greens-Left (AVS)',      color: '#3aa55c', size: 12  },
    { id: 'pd',    label: 'Democratic Party (PD)',  color: '#d1242f', size: 69  },
    { id: 'm5s',   label: 'Five Star Movement',     color: '#ffd400', size: 52  },
    { id: 'aiv',   label: 'Action–Italia Viva',     color: '#5b3275', size: 21  },
    { id: 'fi',    label: 'Forza Italia',           color: '#1f6feb', size: 45  },
    { id: 'lega',  label: 'Lega',                   color: '#00765c', size: 66  },
    { id: 'fdi',   label: 'Brothers of Italy (FdI)',color: '#2c2c2c', size: 119 },
    { id: 'other', label: 'Other / Mixed',          color: '#8b949e', size: 16  },
  ],
}
