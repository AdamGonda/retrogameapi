import { Application, Request, Response } from 'express'
import path from 'path'
import Avj from 'ajv'
import schema from './validation-schema.json'

import { Dir, pipe } from '../../utils'
import { collisionMapToItems, getInitialCollisionMap } from './collision'
import { explodeRow } from './explosion'
import { checkGameOver } from './gameOver'
import { instantDown, moveShapeDown, moveShapeLeftOrRight } from './move'
import { rotateShape } from './rotate'
import { getRandomShape } from './shapes'
import { Item, State } from './types'
import { View } from './view'

const PREFIX = '/tetris'
const validate = new Avj().compile(schema)

const registerRoutes = (app: Application) => {
  app.get(PREFIX + '/html', html)
  app.get(PREFIX + '/js', js)
  app.get(PREFIX + '/init', init)
  app.post(PREFIX + '/update', update)
}

function html(req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '/frontend/index.html'))
}

function js(req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '/frontend/index.js'))
}

function init(req: Request, res: Response) {
  const width = 12
  const height = 22

  const initialState: State = {
    active: getRandomShape(View(width, height)),
    collisionMap: getInitialCollisionMap(width, height),
    view: View(width, height),
    isGameOver: false,
  }

  res.json(initialState)
}

function update(req: Request, res: Response) {
  const { state, input } = req.body

  if(!validate(req.body)) {
    res.status(400)
    res.send(validate.errors)
    return
  }

  const newState = pipe(state)(
    rotateShape(input),
    moveShapeLeftOrRight(input),
    moveShapeDown,
    instantDown(input),
    explodeRow,
    checkGameOver,
  )

  const forRender = toCommon(newState)

  res.json({ newState, forRender })
}

function toCommon(state: State): Item[] {
  const { active, collisionMap } = state
  return [
    ...active.items.map(item => ({ ...item, tag: 'item' })),
    ...collisionMapToItems(collisionMap).map(item => ({
      ...item,
      tag: 'item',
    })),
  ]
}

export default { registerRoutes }