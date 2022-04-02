import { Dir } from "../../utils"
import { State } from "./types"

export function checkEnemiesCollisionWithWalls(state: State) {
  const { enemies, plane } = state
  const onTheEdge = enemies.instances.filter(
    enemy => enemy.x == 0 || enemy.x == plane.width,
  )
  return {
    ...state,
    enemies: {
      ...enemies,
      instances: enemies.instances.map(enemy => {
        return {
          ...enemy,
          y: !onTheEdge.length ? enemy.y : enemy.y + enemies.downStep,
        }
      }),
      dir: onTheEdge.length
        ? onTheEdge[0].x == 0
          ? Dir.RIGHT
          : Dir.LEFT
        : enemies.dir,
    },
  }
}