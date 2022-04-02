import { Dir, isInRange, isOverlap, randomBool } from "../../utils"
import { Enemies, Ship, State } from "./types"
import { Bullet } from './factories'

export function shootWithShip(input: Dir) {
  return (state: State) => {
    const ship = state.ship
    const bullets = ship.bullets
    return {
      ...state,
      ship: {
        ...ship,
        bullets:
          input == Dir.UP
            ? [...bullets, Bullet(ship.x, ship.y, Dir.UP)]
            : bullets,
      },
    }
  }
}

export function shootWithEnemies(state: State) {
  const { enemies } = state
  return {
    ...state,
    enemies: {
      ...enemies,
      bullets: enemies.instances.reduce((acc, enemy) => {
        return randomBool(enemies.shootChance)
          ? [...enemies.bullets, Bullet(enemy.x, enemy.y, Dir.DOWN)]
          : acc
      }, enemies.bullets),
    },
  }
}

export function checkForHits(state: State) {
  const { ship, enemies } = state
  return {
    ...state,
    enemies: {
      ...enemies,
      instances: enemies.instances.filter(
        enemy =>
          !ship.bullets.reduce(
            (acc, bullet) => (acc ? true : isOverlap(enemy, bullet)),
            false,
          ),
      ),
    },
    ship: {
      ...ship,
      lives:
        ship.lives -
        enemies.bullets.reduce(
          (acc, bullet) => (isOverlap(bullet, ship) ? acc + 1 : acc),
          0,
        ),
    },
  }
}

export function removeOutOfViewBullets(state: State) {
  const filterBullets = (model: Ship | Enemies) =>
    model.bullets.filter(bullet => isInRange(0, bullet.y, plane.height))
  const { ship, enemies, plane } = state
  return {
    ...state,
    ship: {
      ...ship,
      bullets: filterBullets(ship),
    },
    enemies: {
      ...enemies,
      bullets: filterBullets(enemies),
    },
  }
}