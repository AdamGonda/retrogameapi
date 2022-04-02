import { Ghost, Type, GameObject, Packman, State, View } from './../types'
import { Dir } from '../../../utils'

export function Ghosts(): Ghost[] {
  // todo
  return []
}

export function moveGhosts(state: State): State {
  const { env, ghosts, cherryHasEaten, view, packman } = state
  const graph = getGraph(env, view, ghosts, packman)

  return {
    ...state,
    ghosts: ghosts.map(ghost => moveGhost(ghost, graph, cherryHasEaten)),
  }
}

export function moveGhost(
  ghost: Ghost,
  graph: any,
  cherryHasEaten: boolean,
): Ghost {
  const path = getPath(ghost, graph)
  const nextMove = getNextMove(path, cherryHasEaten)

  return {
    ...ghost,
    dir: nextMove,
  }
}

function getGraph(env: GameObject[], view: View, ghosts: Ghost[], packman: Packman) {
  const grid = envToGrid(env, view, ghosts, packman)
  
  // const toAvoid = [Type.Wall, Type.Hole]
  // create a mask to evaluate/apply logic and create graph

  console.log('grid', grid);
  

  // grid.forEach((column, x) => column.forEach((object, y) => {
    
  // }))
  
}

function envToGrid(env: GameObject[], view: View, ghosts: Ghost[], packman: Packman): GameObject[][] {
  const sorted = env.sort((a: GameObject, b: GameObject) => {
    if (a.x === b.x) return a.y - b.y
    return a.x > b.x ? 1 : -1
  })

  const grid: GameObject[][] = []
  sorted.forEach((_, idx, arr) => {
    if(idx % view.width === 0){
      grid.push(
        arr.slice(idx, idx + view.width)
      )
    }
  });

  [...ghosts, packman].forEach(gameObject => {
    const { x, y, tag } = gameObject 
    console.log('x=', x, 'y=', y);
    
    grid[x][y].tag = tag
  })

  return grid
}

function getPath(ghost: Ghost, graph: any) {
  // find path to packman from ghost
  const ignore = [Type.Wall, Type.Hole]
}

function getNextMove(path: any, cherryHasEaten: boolean): Dir {
  // move towards packman if cherryHasEaten === false
  // move away from packman if cherryHasEaten === true
  return Dir.DOWN
}
