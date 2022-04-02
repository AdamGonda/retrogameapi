import { Item, Mark, State } from './types'
import { Dir } from '../../utils'
import { addShapeToCollisionMap, getCollisionPoints } from './collision'
import { getRandomShape } from './shapes'
import _ from 'lodash'

export function moveShapeDown(state: State) {
  const { active, collisionMap, view } = state

  const moved = {
    ...active,
    items: active.items.map(item => moveItem(item, Dir.DOWN)),
  }

  const relevantCollisionPoints = getCollisionPoints(
    moved,
    collisionMap,
  ).filter(point => point.mark === Mark.FLOOR || point.mark === Mark.ITEM)

  if (relevantCollisionPoints.length > 0) {
    return {
      ..._.cloneDeep(state),
      active: getRandomShape(view),
      collisionMap: addShapeToCollisionMap(active, collisionMap),
    }
  }

  return {
    ..._.cloneDeep(state),
    active: moved,
  }
}

export function moveShapeLeftOrRight(input: Dir) {
  return (state: State): State => {
    const { active, collisionMap, view } = state

    const moved = {
      ...active,
      items: active.items.map(item => moveItem(item, input)),
    }

    const relevantCollisionPoints = getCollisionPoints(
      moved,
      collisionMap,
    ).filter(point => point.mark === Mark.WALL || point.mark === Mark.ITEM)

    if (relevantCollisionPoints.length > 0) {
      return {
        ..._.cloneDeep(state),
        active,
      }
    }

    return {
      ..._.cloneDeep(state),
      active: moved,
    }
  }
}

export function instantDown(input: Dir) {
  return (state: State) => {
    if (input === Dir.DOWN) {
      const { active, collisionMap, view } = state

      let curr = active
      let prev = active

      while (true) {
        prev = curr
        curr = {
          ...curr,
          items: curr.items.map(item => moveItem(item, Dir.DOWN)),
        }

        const relevantCollisionPoints = getCollisionPoints(
          curr,
          collisionMap,
        ).filter(point => point.mark === Mark.FLOOR || point.mark === Mark.ITEM)

        if (relevantCollisionPoints.length > 0) {
          return {
            ..._.cloneDeep(state),
            active: getRandomShape(view),
            collisionMap: addShapeToCollisionMap(prev, collisionMap),
          }
        }
      }
    }

    return state
  }
}

function moveItem(item: Item, input: Dir) {
  switch (input) {
    case Dir.RIGHT:
      return {
        ...item,
        x: item.x + 1,
      }
    case Dir.LEFT:
      return {
        ...item,
        x: item.x - 1,
      }
    case Dir.DOWN:
      return {
        ...item,
        y: item.y - 1,
      }
    default:
      return item
  }
}
