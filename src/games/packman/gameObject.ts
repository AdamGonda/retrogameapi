import { Coins } from './coin'
import { GameObject, Type } from './types'
import { Walls } from './walls'

let id = 0

export function getGameObject(x: number, y: number, tag: Type) {
  return {
    x,
    y,
    tag,
    id: id++
  }
}

export function initGameObjects(width: number, height: number): GameObject[] {
  const objects: GameObject[] = []

  objects.push(...Walls(width, height))
  objects.push(...Coins(width, height, objects))

  return objects
}
