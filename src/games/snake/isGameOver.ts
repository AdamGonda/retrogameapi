import { isInRange, isOverlap } from "../../utils"
import { BodyPart, View, State } from "./types"

const BORDER_OFFSET = 2

export function isGameOver(state: State) {
  const { snake, view, isGameOver } = state
  const [head, ...body] = snake.body

  return {
    ...state,
    isGameOver:
      isCollidedWithWalls(head, view, isGameOver) ||
      isSnakeBitesItself(head, body, isGameOver),
  }
}

function isCollidedWithWalls(
  head: { x: number; y: number },
  view: View,
  isGameOver: boolean,
) {
  const left = 1
  const top = 0
  const right = view.width - BORDER_OFFSET
  const bottom = view.height - BORDER_OFFSET + 1

  return isGameOver
    ? true
    : !isInRange(left, head.x, right) || !isInRange(top, head.y, bottom)
}

function isSnakeBitesItself(
  head: BodyPart,
  body: BodyPart[],
  isGameOver: boolean,
) {
  return body.reduce(
    (acc, bodyPart) => (acc ? true : isOverlap(head, bodyPart)),
    isGameOver,
  )
}