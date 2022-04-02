import _ from 'lodash'
import { CollisionMap, Item, Mark, Shape } from './types'

export function getCollisionPoints(shape: Shape, collisionMap: CollisionMap): Item[] {
  return shape.items
    .map(item => {
      const { x, y } = item
      const isY = !!collisionMap[y]
      const isX = isY ? !!collisionMap[y][x] : false

      return {
        ...item,
        isCollided: isX && isY,
        mark: isX && isY && collisionMap[y][x],
      }
    })
    .filter(item => item.isCollided)
}

export function getInitialCollisionMap(width: number, height: number): CollisionMap {
  const map: CollisionMap = {}

  // left wall
  for (let y = 0; y <= height; y++) {
    map[y] = { [-1]: Mark.WALL }
  }

  // right wall
  for (let y = 0; y <= height; y++) {
    map[y][width + 1] = Mark.WALL
  }

  // floor
  for (let x = 0; x <= width; x++) {
    if (x == 0) {
      map[-1] = { [x]: Mark.FLOOR }
    } else {
      map[-1][x] = Mark.FLOOR
    }
  }

  return map
}

export function collisionMapToItems(collisionMap: CollisionMap): Item[] {
  const items = []
  for (let y in collisionMap) {
    for (let x in collisionMap[y]) {
      if (collisionMap[y][x] === Mark.ITEM) {
        items.push({ x: parseInt(x), y: parseInt(y) })
      }
    }
  }
  return items
}

export function addShapeToCollisionMap(
  shape: Shape,
  collisionMap: CollisionMap,
): CollisionMap {
  shape.items.forEach(item => {
    const { x, y } = item
    if (y in collisionMap) {
      collisionMap[y][x] = Mark.ITEM
    } else {
      collisionMap[y] = { [x]: Mark.ITEM }
    }
  })

  return _.cloneDeep(collisionMap)
}
