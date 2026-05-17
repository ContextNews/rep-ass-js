import type { AssemblyConfig, Group, Seat, SeatPosition, Side } from './types'

/**
 * Assign groups to positions, producing fully-formed seats.
 *
 * Strategy:
 * - For `opposing-benches`, positions are partitioned by `side`. Groups with
 *   matching `side` are filled in declaration order. Groups without a `side`
 *   are ignored (warning silently — the user should declare a side).
 * - For all other shapes, groups are filled in declaration order against the
 *   position list as-is.
 *
 * If groups oversubscribe the available positions, the surplus is truncated.
 * If positions remain after all groups have been placed, the leftover seats
 * are returned with `group: null` (vacant).
 */
export function assignGroups(
  positions: SeatPosition[],
  config: AssemblyConfig,
): Seat[] {
  if (config.shape.type === 'opposing-benches') {
    return assignBySide(positions, config.groups)
  }
  return assignSequential(positions, config.groups)
}

function assignSequential(positions: SeatPosition[], groups: Group[]): Seat[] {
  const seats: Seat[] = []
  let cursor = 0
  for (const group of groups) {
    const take = Math.min(group.size, positions.length - cursor)
    for (let i = 0; i < take; i++) {
      const pos = positions[cursor + i]
      seats.push(toSeat(pos, group))
    }
    cursor += take
    if (cursor >= positions.length) break
  }
  // Vacant tail
  for (let i = cursor; i < positions.length; i++) {
    seats.push(toSeat(positions[i], null))
  }
  return seats
}

function assignBySide(positions: SeatPosition[], groups: Group[]): Seat[] {
  const bySide: Record<Side, SeatPosition[]> = {
    left: positions.filter((p) => p.side === 'left'),
    right: positions.filter((p) => p.side === 'right'),
  }
  const groupsBySide: Record<Side, Group[]> = {
    left: groups.filter((g) => g.side === 'left'),
    right: groups.filter((g) => g.side === 'right'),
  }

  const out: Seat[] = []
  for (const side of ['left', 'right'] as Side[]) {
    out.push(...assignSequential(bySide[side], groupsBySide[side]))
  }
  // Preserve original index order so consumers can reason about ordering.
  return out.sort((a, b) => a.index - b.index)
}

function toSeat(pos: SeatPosition, group: Group | null): Seat {
  return {
    ...pos,
    id: `seat-${pos.index}`,
    group,
  }
}
