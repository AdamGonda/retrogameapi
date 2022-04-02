import { Dir } from "../../utils";

export type Bullet = {
  x: number
  y: number
  dir: Dir
}

export type Ship = {
  x: number
  y: number
  bullets: Bullet[]
  lives: number
}

export type Enemy = {
  x: number
  y: number
}

export type Enemies = {
  instances: Enemy[]
  bullets: Bullet[]
  dir: Dir
  downStep: number
  shootChance: number
}

export type Plane = {
  width: number
  height: number
}

export type State = {
  ship: Ship
  enemies: Enemies
  plane: Plane
  isGameOver: boolean
}