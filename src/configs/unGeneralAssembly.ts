import type { AssemblyConfig } from '../types'

/**
 * United Nations General Assembly — 193 member states.
 *
 * The real chamber uses a horseshoe layout with each delegation at its
 * own desk; the hemicycle here groups members by the UN's five regional
 * groupings used for elections. The United States is technically a
 * member of no regional group, though it sits with WEOG for election
 * purposes.
 */
export const unGeneralAssembly: AssemblyConfig = {
  id: 'un-general-assembly',
  name: 'UN General Assembly',
  description:
    'The 193 member states of the UN, grouped by the five regional groupings used in UN elections.',
  shape: {
    type: 'hemicycle',
    totalSeats: 193,
    rows: 5,
    innerRadius: 110,
    outerRadius: 360,
    seatRadius: 8,
    padding: 30,
  },
  groups: [
    { id: 'african', label: 'African Group',             color: '#faa61a', size: 54 },
    { id: 'aspac',   label: 'Asia-Pacific Group',        color: '#d1242f', size: 54 },
    { id: 'eeg',     label: 'Eastern European Group',    color: '#3aa55c', size: 23 },
    { id: 'grulac',  label: 'Latin America & Caribbean', color: '#5b3275', size: 33 },
    { id: 'weog',    label: 'Western Europe & Others',   color: '#1f6feb', size: 28 },
    { id: 'na',      label: 'No Group',                  color: '#8b949e', size: 1 },
  ],
}
