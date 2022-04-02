import _ from 'lodash'
import { Dir } from '../../utils'
import { getCollisionPoints } from './collision'
import { getShape } from './shapes'
import { Angle, Mark, State } from './types'

const rotationMap = {
  [Angle.NORTH]: Angle.EAST,
  [Angle.EAST]: Angle.SOUTH,
  [Angle.SOUTH]: Angle.WEST,
  [Angle.WEST]: Angle.NORTH,
}

export function rotateShape(input: Dir) {
  return (state: State) => {
    const { active, collisionMap } = state
    const {
      id,
      angle,
      items: [firstItem, ...rest],
    } = active
    const { x, y } = firstItem

    if (input === Dir.UP) {
      const rotated = getShape(x, y, id, rotationMap[angle])

      const relevantCollisionPoints = getCollisionPoints(
        rotated,
        collisionMap,
      ).filter(
        point =>
          point.mark === Mark.WALL ||
          point.mark === Mark.ITEM ||
          point.mark === Mark.FLOOR,
      )

      if (relevantCollisionPoints.length > 0) {
        return {
          ..._.cloneDeep(state),
          active,
        }
      }

      return {
        ...state,
        active: rotated,
      }
    }

    return state
  }
}
