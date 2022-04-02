export function pipe<T>(seed: T) {
  return (...ops: Array<(state: T) => T>) => ops.reduce((state, action) => action(state), seed)
}

export function find(state: Array<any>, tag: string) {
  return state.find((x) => x.tag === tag)
}

export function getRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function isInRange(start: number, num: number, end: number) {
  return num >= start && num <= end
}

export function isOverlap(obj1: any, obj2: any) {
  return obj1.x == obj2.x && obj1.y == obj2.y
}

export function filterObjFields(fields: Array<any>, keep: Array<any>) {
  return (state: any) => {
    return Object.keys(state)
      .filter((key) => (keep ? fields.includes(key) : !fields.includes(key)))
      .reduce((clean: any, key) => {
        clean[key] = state[key]
        return clean
      }, {})
  }
}

export function randomBool(chance: number) {
  return Math.random() <= chance
}

export function getRandomItemFrom(iterable: any) {
  let arr = iterable
  if (!Array.isArray(iterable)) {
    arr = Object.values(iterable)
  }
  return arr[getRange(0, arr.length - 1)]
}

export function hasMatch(arr1: any[], arr2: any[], fn: Function) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      const a = arr1[i]
      const b = arr2[j]
      if (fn(a, b)) {
        return true
      }
    }
    
  }
  return false
}

export function point(x: number, y: number) {
  return { x, y }
}

// Accepted inputs
// 97, 119, 115, 100, 113
// a   w    s    d    q
const UP = "119"
const DOWN = "115"
const RIGHT = "100"
const LEFT = "97"
const QUIT = "113"

export enum Dir {
  UP = 'UP',
  DOWN = 'DOWN',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export const awsd = {
  [UP]: Dir.UP,
  [DOWN]: Dir.DOWN,
  [RIGHT]: Dir.RIGHT,
  [LEFT]: Dir.LEFT,
}
