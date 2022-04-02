import { getGameObject } from './gameObject'
import { GameObject, State, Type } from './types'

function getSpace(width: number, height: number){
  const spaces = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      spaces.push({ x, y })
    }
  }
  return spaces
}

export function Coins(width: number, height: number, objects: GameObject[]): GameObject[] {
  const spaces = getSpace(width, height)
  const freeSpaces = spaces.filter(space => !objects.find(obj => obj.x === space.x && obj.y === space.y))
  return freeSpaces.map(space => {
    const { x, y } = space
    return getGameObject(x, y, Type.Coin)
  })
}

export function collectCoin(state: State): State {
  const { packman, env } = state

  const collidedWith = env.find(obj => obj.x === packman.x && obj.y === packman.y)

  if(collidedWith){   
    return {
      ...state,
      points: state.points + 1,
      env: state.env.filter(obj => obj.id !== collidedWith.id)
    }
  }

  return state
}
