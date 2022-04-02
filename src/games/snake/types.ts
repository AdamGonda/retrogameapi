import { Dir } from './../../utils';

export type BodyPart = {
  x: number
  y: number
  pX: number
  pY: number
}

export type Snake = {
  body: BodyPart[]
  dir: Dir
}

export type Food = {
  x: number
  y: number
}

export type View = {
  width: number
  height: number
}

export type State = {
  view: View
  snake: Snake
  food: Food
  isGameOver: boolean
}