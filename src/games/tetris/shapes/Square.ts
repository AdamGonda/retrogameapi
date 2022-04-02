import { Angle } from "../types"

export const angleToSquare = {
  [Angle.NORTH]: North,
  [Angle.EAST]: North,
  [Angle.SOUTH]: North,
  [Angle.WEST]: North,
}

function North(x: number, y: number) {
  return [
    { x, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x: x + 1, y: y - 1 },
  ]
}
