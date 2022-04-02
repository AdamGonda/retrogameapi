import { Dir } from '../../utils'
import { Enemies, Enemy, Plane, Ship } from './types'

export function Bullet(x: number, y: number, dir: Dir) {
  return { x, y, dir }
}

export function Ship(x: number, y: number, lives: number) {
  return {
    x,
    y,
    bullets: [],
    lives,
  }
}

export function enemy(x: number, y: number) {
  return { x, y }
}

export function Enemies(
  x: number,
  y: number,
  n: number,
  m: number,
  shootChance: number,
): Enemies {
  return {
    // n -> x |   m -> y
    instances: [...Array(n * m)].map((empty, i) =>
      enemy(x + (i % n), y + Math.floor(i / n)),
    ),
    bullets: [],
    dir: Dir.RIGHT,
    downStep: 1,
    shootChance,
  }
}

export function Plane(width: number, height: number) {
  return { width, height }
}
