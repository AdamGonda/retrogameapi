import { CollisionMap, State, View } from './types'

export function explodeRow(state: State) {
  const { collisionMap, view } = state

  Object.keys(collisionMap)
    .filter(
      (yKey: string) =>
        Object.keys(collisionMap[parseInt(yKey)]).length == view.width + 3,
    )
    .forEach(handleFullRow(view, collisionMap))

  return state
}

function handleFullRow(view: View, collisionMap: CollisionMap) {
  return (rowKey: string) => {
    for (let i = parseInt(rowKey); i < view.height; i++) {
      collisionMap[i] = collisionMap[i + 1]
    }
  }
}
