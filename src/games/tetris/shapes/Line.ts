import { Angle } from '../types'

export const angleToLine = {
  [Angle.NORTH]: North,
  [Angle.EAST]: East,
  [Angle.SOUTH]: North,
  [Angle.WEST]: East,
}

function North(x: number, y: number) {
  return [
    { x, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
    { x, y: y - 2 },
  ]
}

function East(x: number, y: number) {
  return [
    { x, y },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x + 2, y },
  ]
}
