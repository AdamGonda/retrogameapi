import { Dir } from "../../utils"
import { Bullet, State } from "./types"

export function moveShip(input: Dir | null = null) {
  return (state: State) => {
    const { ship } = state
    const toValue = {
      [Dir.RIGHT]: 1,
      [Dir.LEFT]: -1,
    }
    return {
      ...state,
      ship: {
        ...ship,
        x:
          input == Dir.LEFT || input == Dir.RIGHT
            ? ship.x + toValue[input]
            : ship.x,
      },
    }
  }
}

export function moveEnemies(state: State) {
  const toValue = {
    [Dir.RIGHT]: 1,
    [Dir.LEFT]: -1,
  }
  const { enemies } = state
  return {
    ...state,
    enemies: {
      ...enemies,
      instances: enemies.instances.map((enemy) => {
        return {
          ...enemy,
          // @ts-ignore
          x: enemy.x + toValue[enemies.dir],
        }
      }),
    },
  }
}

export function moveBullets(state: State) {
  const toAx = {
    [Dir.UP]: -1,
    [Dir.DOWN]: 1,
  }
  const moveBullets = (bullets: Bullet[]) =>
    // @ts-ignore
    bullets.map((bullet) => ({ ...bullet, y: bullet.y + toAx[bullet.dir] }))

  const shipBullets = state.ship.bullets
  const enemyBullets = state.enemies.bullets
  return {
    ...state,
    ship: {
      ...state.ship,
      bullets: moveBullets(shipBullets),
    },
    enemies: {
      ...state.enemies,
      bullets: moveBullets(enemyBullets),
    },
  }
}