import { GameObject, Type } from './types'
import { getGameObject } from './gameObject'

export function Walls(width: number, height: number): GameObject[] {
  const center = { x: Math.floor(width / 2), y: Math.floor(height / 2) }
  return [
    ...Cage(center),

    // EDGES
    ...TopEdge(center.x, center.y),
    ...BottomEdge(center.x, center.y),
    ...LeftEdge(center.x, center.y),
    ...RightEdge(center.x, center.y),
    // TOP RIGHT EDGE
    getGameObject(center.x + 9, center.y + 9, Type.Wall),
    getGameObject(center.x + 8, center.y + 9, Type.Wall),
    getGameObject(center.x + 9, center.y + 8, Type.Wall),
    // BOTTOM RIGHT EDGE
    getGameObject(center.x + 9, center.y - 8, Type.Wall),
    getGameObject(center.x + 9, center.y - 9, Type.Wall),
    getGameObject(center.x + 9, center.y - 10, Type.Wall),
    getGameObject(center.x + 8, center.y - 10, Type.Wall),
    // TOP LEFT EDGE
    getGameObject(center.x - 8, center.y + 9, Type.Wall),
    getGameObject(center.x - 9, center.y + 9, Type.Wall),
    getGameObject(center.x - 10, center.y + 9, Type.Wall),
    getGameObject(center.x - 10, center.y + 8, Type.Wall),
    // BOTTOM LEFT EDGE
    getGameObject(center.x - 10, center.y - 8, Type.Wall),
    getGameObject(center.x - 10, center.y - 9, Type.Wall),
    getGameObject(center.x - 10, center.y - 10, Type.Wall),
    getGameObject(center.x - 9, center.y - 10, Type.Wall),
    getGameObject(center.x - 8, center.y - 10, Type.Wall),
    
    
    // WALLS
    
    // RIGHT SIDE
    ...VerticalWallSmall(center.x + 4, center.y),
    ...Box(center.x + 6, center.y - 1),
    ...VerticalWallSmall(center.x + 7, center.y + 4),
    ...HorizontalWallSmall(center.x + 3, center.y + 4),
    getGameObject(center.x + 7, center.y + 7, Type.Wall),
    ...HorizontalWallBig(center.x + 3, center.y + 7),
    getGameObject(center.x + 5, center.y + 6, Type.Wall),
    getGameObject(center.x + 3, center.y + 6, Type.Wall),
    ...VerticalWallBig(center.x + 7, center.y - 5),
    ...VerticalWallBig(center.x + 5, center.y - 5),
    ...BoxTall(center.x + 1, center.y - 8),
    getGameObject(center.x + 2, center.y - 3, Type.Wall),
    getGameObject(center.x + 3, center.y - 3, Type.Wall),
    
    
    // LEFT SIDE
    
    ...Box(center.x - 7, center.y - 8),
    ...HorizontalWallSmall(center.x - 2, center.y - 8),
    ...HorizontalWallSmall(center.x - 3, center.y - 6),
    ...VerticalWallTiny(center.x - 4, center.y),
    ...HorizontalWallBig(center.x - 2, center.y + 4),
    ...HorizontalWallBig(center.x - 5, center.y + 7),
    ...BoxExtraTall(center.x - 8, center.y + 1),
    getGameObject(center.x - 8, center.y - 8, Type.Wall),
    getGameObject(center.x - 9, center.y - 6, Type.Wall),
    getGameObject(center.x - 4, center.y + 6, Type.Wall),
    getGameObject(center.x - 2, center.y + 6, Type.Wall),
    getGameObject(center.x - 2, center.y + 7, Type.Wall),
    ...VerticalWallSmall(center.x - 8, center.y - 3),
    getGameObject(center.x - 7, center.y - 1, Type.Wall),
    getGameObject(center.x - 6, center.y - 1, Type.Wall),
    getGameObject(center.x - 6, center.y - 3, Type.Wall),
    getGameObject(center.x - 6, center.y - 4, Type.Wall),
    ...HorizontalWallSmall(center.x - 3, center.y - 4),
    getGameObject(center.x - 3, center.y - 2, Type.Wall),
    getGameObject(center.x - 4, center.y - 2, Type.Wall),
    
    
    
    // LEFT PORTAL NO COINS
    getGameObject(center.x - 10, center.y - 2, Type.NoCoin),
    getGameObject(center.x - 10, center.y - 1, Type.NoCoin),
    getGameObject(center.x - 10, center.y, Type.NoCoin),
    getGameObject(center.x - 10, center.y + 1, Type.NoCoin),
    getGameObject(center.x - 10, center.y + 2, Type.NoCoin),
    
    // RIGHT PORTAL NO COINS
    getGameObject(center.x + 9, center.y - 2, Type.NoCoin),
    getGameObject(center.x + 9, center.y - 1, Type.NoCoin),
    getGameObject(center.x + 9, center.y, Type.NoCoin),
    getGameObject(center.x + 9, center.y + 1, Type.NoCoin),
    getGameObject(center.x + 9, center.y + 2, Type.NoCoin),
  ]
}

export function Cage(center: { x: number, y: number }): GameObject[] {
  const { x, y } = center
  return [
    // bottom
    getGameObject(x, y - 2, Type.Wall),
    getGameObject(x + 1, y - 2, Type.Wall),
    getGameObject(x + 2, y - 2, Type.Wall),
    getGameObject(x - 1, y - 2, Type.Wall),
    getGameObject(x - 2, y - 2, Type.Wall),

    // top
    getGameObject(x, y + 2, Type.Wall),
    getGameObject(x + 1, y + 2, Type.Wall),
    getGameObject(x + 2, y + 2, Type.Wall),
    getGameObject(x - 1, y + 2, Type.Wall),
    getGameObject(x - 2, y + 2, Type.Wall),

    // left
    getGameObject(x - 2, y, Type.Wall),
    getGameObject(x - 2, y + 1, Type.Wall),
    getGameObject(x - 2, y - 1, Type.Wall),

    // right
    getGameObject(x + 2, y + 1, Type.Wall),
    getGameObject(x + 2, y - 1, Type.Wall),
    
    // empty spaces at the middle
    getGameObject(x, y - 1, Type.NoCoin),
    getGameObject(x - 1, y - 1, Type.NoCoin),
    getGameObject(x + 1, y - 1, Type.NoCoin),
    getGameObject(x, y, Type.NoCoin),
    getGameObject(x - 1, y, Type.NoCoin),
    getGameObject(x + 1, y, Type.NoCoin),
    getGameObject(x, y + 1, Type.NoCoin),
    getGameObject(x - 1, y + 1, Type.NoCoin),
    getGameObject(x + 1, y + 1, Type.NoCoin),
    getGameObject(x + 2, y, Type.NoCoin),
  ]
}

export function VerticalWall(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x, y + 1, Type.Wall),
    getGameObject(x, y + 2, Type.Wall),
    getGameObject(x, y - 1, Type.Wall),
    getGameObject(x, y - 2, Type.Wall),
  ]
}

export function VerticalWallBig(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x, y + 1, Type.Wall),
    getGameObject(x, y + 2, Type.Wall),
    getGameObject(x, y - 1, Type.Wall),
    getGameObject(x, y - 2, Type.Wall),
    getGameObject(x, y - 3, Type.Wall),
  ]
}

export function VerticalWallSmall(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x, y + 1, Type.Wall),
    getGameObject(x, y + 2, Type.Wall),
    getGameObject(x, y - 1, Type.Wall),
  ]
}

export function VerticalWallTiny(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x, y + 1, Type.Wall),
    getGameObject(x, y + 2, Type.Wall),
  ]
}

export function Box(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x, y + 1, Type.Wall),
    getGameObject(x, y + 2, Type.Wall),
    getGameObject(x + 1, y + 2, Type.Wall),
    getGameObject(x + 2, y + 2, Type.Wall),
    getGameObject(x + 1, y, Type.Wall),
    getGameObject(x + 2, y, Type.Wall),
    getGameObject(x + 2, y + 1, Type.Wall),

    getGameObject(x + 1, y + 1, Type.Hole),
  ]
}

export function BoxTall(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x, y + 1, Type.Wall),
    getGameObject(x, y + 2, Type.Wall),
    getGameObject(x, y + 3, Type.Wall),
    getGameObject(x + 1, y + 3, Type.Wall),
    getGameObject(x + 2, y + 3, Type.Wall),
    getGameObject(x + 1, y, Type.Wall),
    getGameObject(x + 2, y, Type.Wall),
    getGameObject(x + 2, y + 1, Type.Wall),
    getGameObject(x + 2, y + 2, Type.Wall),
    
    getGameObject(x + 1, y + 1, Type.Hole),
    getGameObject(x + 1, y + 2, Type.Hole),
  ]
}

export function BoxExtraTall(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x, y + 1, Type.Wall),
    getGameObject(x, y + 2, Type.Wall),
    getGameObject(x, y + 3, Type.Wall),
    getGameObject(x, y + 4, Type.Wall),
    getGameObject(x + 1, y + 4, Type.Wall),
    getGameObject(x + 2, y + 4, Type.Wall),
    getGameObject(x + 1, y, Type.Wall),
    getGameObject(x + 2, y, Type.Wall),
    getGameObject(x + 2, y + 1, Type.Wall),
    getGameObject(x + 2, y + 2, Type.Wall),
    getGameObject(x + 2, y + 3, Type.Wall),

    getGameObject(x + 1, y + 1, Type.Hole),
    getGameObject(x + 1, y + 2, Type.Hole),
    getGameObject(x + 1, y + 3, Type.Hole),
  ]
}

export function HorizontalWall(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x + 1, y, Type.Wall),
    getGameObject(x + 2, y, Type.Wall),
    getGameObject(x - 1, y, Type.Wall),
    getGameObject(x - 2, y, Type.Wall),
  ]
}

export function HorizontalWallBig(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x + 1, y, Type.Wall),
    getGameObject(x + 2, y, Type.Wall),
    getGameObject(x - 1, y, Type.Wall),
    getGameObject(x - 2, y, Type.Wall),
    getGameObject(x - 3, y, Type.Wall),
  ]
}

export function HorizontalWallSmall(x: number, y: number): GameObject[] {
  return [
    getGameObject(x, y, Type.Wall),
    getGameObject(x + 1, y, Type.Wall),
    getGameObject(x + 2, y, Type.Wall),
    getGameObject(x - 1, y, Type.Wall),
  ]
}

export function TopEdge(x: number, y: number): GameObject[] {
  const yOffset = 9
  return [
    ...HorizontalWall(x, y + yOffset),
    ...HorizontalWall(x + 5, y + yOffset),
    ...HorizontalWall(x - 5, y + yOffset),
  ]
}

export function BottomEdge(x: number, y: number): GameObject[] {
  const yOffset = 10
  return [
    ...HorizontalWall(x, y - yOffset),
    ...HorizontalWall(x + 5, y - yOffset),
    ...HorizontalWall(x - 5, y - yOffset),
  ]
}

export function LeftEdge(x: number, y: number): GameObject[] {
  return [
    ...VerticalWall(x - 10, y - 5),
    ...VerticalWall(x - 10, y + 5),
  ]
}

export function RightEdge(x: number, y: number): GameObject[] {
  return [
    ...VerticalWall(x + 9, y - 5),
    ...VerticalWall(x + 9, y + 5),
  ]
}
