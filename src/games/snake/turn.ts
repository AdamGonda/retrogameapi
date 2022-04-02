import { Dir } from "../../utils"
import { State } from "./types"

export function turnSnake(input: Dir) {
  return (state: State) => {
    const { snake } = state
    return {
      ...state,
      snake: {
        ...snake,
        dir: input ? validateTurn(snake.dir, input) : snake.dir,
      },
    }
  }
}

function validateTurn(currDir: Dir, input: Dir) {
  if (
    (currDir === Dir.RIGHT && input === Dir.LEFT) ||
    (currDir === Dir.LEFT && input === Dir.RIGHT) ||
    (currDir === Dir.UP && input === Dir.DOWN) ||
    (currDir === Dir.DOWN && input === Dir.UP)
  ) {
    return currDir
  }
  return input
}