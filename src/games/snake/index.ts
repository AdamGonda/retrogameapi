import { Application, Request, Response } from 'express'
import path from 'path'
import Avj from 'ajv'
import schema from './validation-schema.json'

import { pipe, Dir } from '../../utils'
import { seekFood } from './eat'
import { isGameOver } from './isGameOver'
import { moveSnake } from './move'
import { turnSnake } from './turn'
import { State } from './types'
import { Food, View, Snake } from './factories'

const PREFIX = '/snake'
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
  const initialState: State = {
    snake: Snake({ x: 15, y: 10, dir: Dir.RIGHT }),
    food: Food(13, 10),
    view: View(30, 20),
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
    turnSnake(input),
    moveSnake,
    seekFood,
    isGameOver,
  )

  const forRender = toCommon(newState)
  
  res.send({ newState, forRender })
}

function toCommon(state: State) {
  const { snake, food } = state
  return [
    { ...food, tag: 'food' },
    ...snake.body.map((part, i) => ({
      x: part.x,
      y: part.y,
      tag: i == 0 ? 'head' : 'body',
    })),
  ]
}

export default { registerRoutes }
