import type { AssemblyConfig } from '../types'

/**
 * Verkhovna Rada — Ukrainian parliament, 450 seats nominally.
 *
 * Roughly 26 seats from Crimea and parts of Donbas have been vacant
 * since 2014. Composition reflects the 9th convocation (2019 election).
 */
export const ukraineRada: AssemblyConfig = {
  id: 'ukraine-rada',
  name: 'Verkhovna Rada of Ukraine',
  description:
    'Unicameral parliament of Ukraine — 450 seats, with vacancies from territory occupied since 2014.',
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
    { id: 'op-life', label: 'For Life (banned)',     color: '#5b3275', size: 16 },
    { id: 'bat',     label: 'Batkivshchyna',         color: '#1b3050', size: 24 },
    { id: 'restore', label: 'Restoration of Ukraine',color: '#722c1d', size: 17 },
    { id: 'sluha',   label: 'Servant of the People', color: '#3aa55c', size: 234 },
    { id: 'holos',   label: 'Holos',                 color: '#faa61a', size: 16 },
    { id: 'trust',   label: 'Trust',                 color: '#12b6cf', size: 16 },
    { id: 'es',      label: 'European Solidarity',   color: '#1f6feb', size: 26 },
    { id: 'ind',     label: 'Independent',           color: '#8b949e', size: 75 },
  ],
}
