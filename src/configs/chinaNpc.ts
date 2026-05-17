import type { AssemblyConfig } from '../types'

/**
 * National People's Congress — 2,977 deputies in the 14th NPC.
 *
 * Roughly two-thirds are Communist Party of China members; the rest
 * sit with one of the eight legally recognised "democratic parties" or
 * as independents — all operating under the leadership of the CPC. This
 * is the largest parliament in the world by membership.
 */
export const chinaNpc: AssemblyConfig = {
  id: 'china-npc',
  name: "National People's Congress (China)",
  description:
    "Unicameral national legislature of the People's Republic of China — 2,977 deputies indirectly elected to five-year terms.",
  shape: {
    type: 'hemicycle',
    totalSeats: 2977,
    rows: 14,
    innerRadius: 130,
    outerRadius: 600,
    seatRadius: 3.5,
    padding: 30,
  },
  groups: [
    { id: 'cpc',   label: 'Communist Party of China',          color: '#d1242f', size: 2080 },
    { id: 'other', label: 'Democratic Parties & Independents', color: '#faa61a', size: 897 },
  ],
}
