import { Dir } from '../../utils'

export enum Type {
  Wall = 'Wall',
  Hole = 'Hole',
  Packman = 'Packman',
  Empty = 'Empty',
  Coin = 'Coin',
  NoCoin = 'NoCoin',
  Cherry = 'Cherry',
  Ghost = 'Ghost',
}

export type GameObject = {
  x: number
  y: number
  tag: Type
  id: number
}

export type Packman = GameObject & {
  dir: Dir | null
  tag: Type.Packman
}

export type Ghost = GameObject & {
  dir: Dir | null
  tag: Type.Ghost
}

export type View = {
  width: number
  height: number
}

export type State = {
  view: View,
  points: number
  env: GameObject[]
  isGameOver: boolean
  isGhostDoorOpen: boolean
  cherryHasEaten: boolean
  packman: Packman
  ghosts: Ghost[]
}