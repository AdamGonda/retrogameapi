import { Dir } from '../../utils'
import { BodyPart, State } from "./types"

export function moveSnake(state: State): State {
  const { snake } = state
  return {
    ...state,
    snake: {
      ...snake,
      body: moveBody(snake),
    },
  }
}

function moveBody({ body, dir }: { body: BodyPart[]; dir: Dir }): BodyPart[] {
  return body.map((part, index, arr) => {
    if (index == 0) {
      return moveHead(part, dir)
    }
    return {
      ...part,
      x: arr[index - 1].x,
      y: arr[index - 1].y,
      pX: part.x,
      pY: part.y,
    }
  })
}

function moveHead(head: BodyPart, dir: Dir): BodyPart {
  if ([Dir.RIGHT, Dir.LEFT].includes(dir)) {
    return {
      ...head,
      pX: head.x,
      pY: head.y,
      x: head.x + 1 * (dir === Dir.RIGHT ? 1 : -1),
    }
  }
  return {
    ...head,
    pX: head.x,
    pY: head.y,
    y: head.y + 1 * (dir === Dir.UP ? 1 : -1),
  }
}