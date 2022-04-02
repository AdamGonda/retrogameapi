export enum ShapeId {
  SQUARE = 'SQUARE',
  LINE = 'LINE',
  L = 'L',
  T = 'T',
  Z = 'Z',
  LR = 'LR',
  ZR = 'ZR',
}

export enum Angle {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
}

export type View = {
  width: number
  height: number
}

export type Item = {
  x: number
  y: number
  mark?: Mark | boolean
  isCollided?: boolean
}

export type Shape = {
  items: Item[]
  id: ShapeId
  angle: Angle
}

export enum Mark {
  ITEM = 'ITEM',
  WALL = 'WALL',
  FLOOR = 'FLOOR',
}

export type CollisionMap = Record<number, Record<number, Mark>>

export type State = {
  active: Shape
  collisionMap: CollisionMap
  view: View
  isGameOver: boolean
}
