import { Angle } from '../types'

export const angleToZ = {
  [Angle.NORTH]: North,
  [Angle.EAST]: East,
  [Angle.SOUTH]: North,
  [Angle.WEST]: East,
}

function North(x: number, y: number) {
  return [
    { x, y },
    { x, y: y + 1 },
    { x: x - 1, y },
    { x: x - 1, y: y - 1 },
  ]
}

function East(x: number, y: number) {
  return [
    { x, y },
    { x: x - 1, y },
    { x, y: y - 1 },
    { x: x + 1, y: y - 1 },
  ]
}
