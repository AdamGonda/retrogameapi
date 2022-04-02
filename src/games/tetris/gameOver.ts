import _ from 'lodash'
import { getCollisionPoints } from './collision'
import { Mark, State } from './types'

export function checkGameOver(state: State): State{
  const { active, collisionMap, view } = state
  const isAtTop = active.items[0].y == view.height
  
  const relevantCollisionPoints = getCollisionPoints(
    active,
    collisionMap,
  ).filter(point => point.mark === Mark.ITEM)

  if(isAtTop && relevantCollisionPoints.length > 0){
    return {
      ..._.cloneDeep(state),
      isGameOver: true
    }
  }

  return state
}
