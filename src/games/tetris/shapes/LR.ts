import { Angle } from '../types'

export const angleToLR = {
  [Angle.NORTH]: North,
  [Angle.EAST]: East,
  [Angle.SOUTH]: South,
  [Angle.WEST]: West,
}

function North(x: number, y: number) {
  return [
    { x, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
    { x: x - 1, y: y - 1 },
  ]
}

function West(x: number, y: number) {
  return [
    { x, y },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x + 1, y: y - 1 },
  ]
}

function South(x: number, y: number) {
  return [
    { x, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
    { x: x + 1, y: y + 1 },
  ]
}

function East(x: number, y: number) {
  return [
    { x, y },
    { x: x + 1, y },
    { x: x - 1, y },
    { x: x - 1, y: y + 1 },
  ]
}
