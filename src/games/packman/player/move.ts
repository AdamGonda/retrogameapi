import { Dir } from '../../../utils'
import { Packman, State, Type } from '../types'

const movementMap = {
  [Dir.RIGHT]: 1,
  [Dir.LEFT]: -1,
  [Dir.UP]: 1,
  [Dir.DOWN]: -1,
}

export function movePackman(state: State): State {
  const { packman, env } = state

  const isLeftOrRight = packman.dir === Dir.LEFT || packman.dir === Dir.RIGHT
  const isUpOrDown = packman.dir === Dir.UP || packman.dir === Dir.DOWN

  const walls = env.filter(x => x.tag === Type.Wall)

  if (packman.dir) {
    const moved = {
      ...packman,
      x: isLeftOrRight ? packman.x + movementMap[packman.dir] : packman.x,
      y: isUpOrDown ? packman.y + movementMap[packman.dir] : packman.y,
    }

    const collision = !!walls.find(
      obj => moved?.x === obj.x && moved?.y === obj.y,
    )

    return {
      ...state,
      packman: collision ? { ...packman, dir: null } : moved,
    }
  }

  return state
}