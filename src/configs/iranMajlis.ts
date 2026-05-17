import type { AssemblyConfig } from '../types'

/**
 * Islamic Consultative Assembly of Iran (Majlis) — 290 seats, hemicycle.
 *
 * Iranian politics is organised around principlist (conservative) and
 * reformist factions rather than formal parties. Five seats are reserved
 * for recognised religious minorities (Armenian and Assyrian Christians,
 * Jews, Zoroastrians).
 */
export const iranMajlis: AssemblyConfig = {
  id: 'iran-majlis',
  name: 'Islamic Consultative Assembly (Iran)',
  description:
    'Parliament of the Islamic Republic of Iran — 290 members across principlist, reformist, and independent factions.',
  shape: {
    type: 'hemicycle',
    totalSeats: 290,
    rows: 6,
    innerRadius: 110,
    outerRadius: 360,
    seatRadius: 7,
    padding: 30,
  },
  groups: [
    { id: 'reform', label: 'Reformists / Moderates', color: '#3aa55c', size: 17 },
    { id: 'ind',    label: 'Independents',           color: '#8b949e', size: 38 },
    { id: 'cons',   label: 'Principlists',           color: '#1f6feb', size: 230 },
    { id: 'minor',  label: 'Religious Minorities',   color: '#5b3275', size: 5 },
  ],
}
