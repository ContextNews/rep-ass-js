import type { AssemblyData, Seat } from '../types'

export interface HemicycleLayout {
  (data: AssemblyData): Seat[]
  rows(): number
  rows(value: number): HemicycleLayout
  size(): [number, number]
  size(value: [number, number]): HemicycleLayout
  seatRadius(): number
  seatRadius(value: number): HemicycleLayout
}

export function hemicycle(): HemicycleLayout {
  throw new Error('hemicycle: not yet implemented — see plans/001-initial-design.md')
}
