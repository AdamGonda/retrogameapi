import { Dir } from '../../../utils'
import { Packman, State, Type } from '../types'

const movementMap = {
  [Dir.RIGHT]: 1,
  [Dir.LEFT]: -1,
  [Dir.UP]: 1,
  [Dir.DOWN]: -1,
}

export const turnPackman = (input: Dir | null) => (state: State) => {
  const { packman, env } = state

  if (input) {
    const isLeftOrRight = input === Dir.LEFT || input === Dir.RIGHT
    const isUpOrDown = input === Dir.UP || input === Dir.DOWN
  
    const walls = env.filter(x => x.tag === Type.Wall)

    const moved = {
      ...packman,
      x: isLeftOrRight ? packman.x + movementMap[input] : packman.x,
      y: isUpOrDown ? packman.y + movementMap[input] : packman.y,
    }

    const collision = !!walls.find(
      obj => moved?.x === obj.x && moved?.y === obj.y,
    )

    return {
      ...state,
      packman: collision ? packman : { ...packman, dir: input },
    }
  }

  return state
}
