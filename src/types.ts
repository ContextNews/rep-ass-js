export interface Group {
  id: string
  label?: string
  color?: string
  size: number
}

export interface SeatOverride {
  id?: string
  groupId: string
  label?: string
}

export interface AssemblyData {
  groups: Group[]
  seats?: SeatOverride[]
}

export interface Seat {
  id: string
  x: number
  y: number
  r: number
  angle?: number
  row?: number
  col?: number
  group: Group
  label?: string
}

export interface Layout {
  (data: AssemblyData): Seat[]
}
