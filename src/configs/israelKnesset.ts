import type { AssemblyConfig } from '../types'

/**
 * Knesset — unicameral parliament of Israel, 120 seats.
 *
 * Composition from the November 2022 election (25th Knesset). The
 * chamber is physically a hemicycle facing the Speaker's chair.
 */
export const israelKnesset: AssemblyConfig = {
  id: 'israel-knesset',
  name: 'Knesset (Israel)',
  description:
    'Unicameral parliament of Israel — 120 members elected by nationwide proportional representation.',
  shape: {
    type: 'hemicycle',
    totalSeats: 120,
    rows: 4,
    innerRadius: 100,
    outerRadius: 320,
    seatRadius: 9,
    padding: 30,
  },
  groups: [
    { id: 'hadash',    label: "Hadash–Ta'al",         color: '#a31c1a', size: 5 },
    { id: 'labor',     label: 'Labor',                color: '#d1242f', size: 4 },
    { id: 'ra-am',     label: 'United Arab List',     color: '#3aa55c', size: 5 },
    { id: 'yesh-atid', label: 'Yesh Atid',            color: '#1f6feb', size: 24 },
    { id: 'nat-unity', label: 'National Unity',       color: '#003c8f', size: 12 },
    { id: 'ybeitenu',  label: 'Yisrael Beytenu',      color: '#5b3275', size: 6 },
    { id: 'likud',     label: 'Likud',                color: '#1b3050', size: 32 },
    { id: 'shas',      label: 'Shas',                 color: '#0b5fa5', size: 11 },
    { id: 'utj',       label: 'United Torah Judaism', color: '#383838', size: 7 },
    { id: 'rz',        label: 'Religious Zionism',    color: '#722c1d', size: 14 },
  ],
}
