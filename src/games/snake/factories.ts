import { Dir } from '../../utils'
import { Food, View, Snake, State } from './types'

export function Snake({ x, y, dir }: { x: number; y: number; dir: Dir }): Snake {
  return {
    body: [
      {
        x,
        y,
        pX: x - 1,
        pY: y,
      },
    ],
    dir,
  }
}

export function Food(x: number, y: number): Food {
  return { x, y }
}

export function View(width: number, height: number): View {
  return { width, height }
}