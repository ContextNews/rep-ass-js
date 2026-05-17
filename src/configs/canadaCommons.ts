import type { AssemblyConfig } from '../types'

/**
 * House of Commons of Canada — 343 seats (post-2025 redistribution),
 * Westminster-style opposing benches.
 */
export const canadaCommons: AssemblyConfig = {
  id: 'canada-commons',
  name: 'House of Commons of Canada',
  description:
    "Lower house of the Parliament of Canada — opposing benches with government on the Speaker's right.",
  shape: {
    type: 'opposing-benches',
    rowsPerSide: 5,
    seatsPerRow: 35,
    benchGap: 80,
    rowSpacing: 22,
    seatSpacing: 13,
    seatRadius: 5.5,
    padding: 30,
  },
  groups: [
    // Left side — opposition
    { id: 'con', label: 'Conservative',     color: '#1f6feb', size: 144, side: 'left' },
    { id: 'bq',  label: 'Bloc Québécois',   color: '#12b6cf', size: 22,  side: 'left' },
    { id: 'ndp', label: 'NDP',              color: '#faa61a', size: 7,   side: 'left' },
    { id: 'grn', label: 'Green',            color: '#3aa55c', size: 1,   side: 'left' },
    // Right side — government
    { id: 'lib', label: 'Liberal',          color: '#d1242f', size: 169, side: 'right' },
  ],
}
