import _ from 'lodash'
import { Shape, Angle, View, ShapeId } from './../types'

import { angleToSquare } from './Square'
import { angleToLine } from './Line'
import { angleToL } from './L'
import { angleToT } from './T'
import { angleToZ } from './Z'
import { angleToLR } from './LR'
import { angleToZR } from './ZR'

const shapeToFactory = {
  [ShapeId.SQUARE]: angleToSquare,
  [ShapeId.LINE]: angleToLine,
  [ShapeId.L]: angleToL,
  [ShapeId.T]: angleToT,
  [ShapeId.Z]: angleToZ,
  [ShapeId.LR]: angleToLR,
  [ShapeId.ZR]: angleToZR,
}

export function getRandomShape(view: View): Shape {
  const x = Math.floor(view.width / 2)
  const y = view.height
  const id = Object.values(ShapeId)[_.random(Object.values(ShapeId).length - 1)]
  const angle = Object.values(Angle)[_.random(Object.values(Angle).length - 1)]

  // @ts-ignore
  return getShape(x, y, id, angle)
}

export function getShape(
  x: number,
  y: number,
  id: ShapeId,
  angle: Angle,
): Shape {
  return {
    // @ts-ignore
    items: shapeToFactory[id][angle](x, y),
    id,
    angle,
  }
}
