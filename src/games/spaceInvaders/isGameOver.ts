import { State } from "./types"

export function isGameOver(state: State) {
  const { ship } = state
  return {
    ...state,
    isGameOver: ship.lives > 0 ? false : true,
  }
}