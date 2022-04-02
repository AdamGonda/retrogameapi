import { Application, Request, Response } from 'express'
import path from 'path'

import { pipe, Dir } from '../../utils'
import { State, Type } from './types'
import { View } from './view'
import { initGameObjects } from './gameObject'
import { movePackman } from './player/move'
import { turnPackman } from './player/turn'
import { collectCoin } from './coin'
import { Ghosts, moveGhosts } from './ghost'

const PREFIX = '/packman'

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
  const view = View(20, 20)
  const initialState = {
    view,
    points: 0,
    env: initGameObjects(view.width, view.height),
    isGameOver: false,
    isGhostDoorOpen: false,
    cherryHasEaten: false,
    packman: null, //{ x: 9, y: 7, tag: Type.Packman, dir: null, id: -1 },
    ghosts: Ghosts()
  }
  res.json(initialState)
}

function update(req: Request, res: Response) {
  const { state, input } = req.body

  if (!state) {
    return res.send({ status: 400, msg: 'state is not present' })
  }

  // prettier-ignore
  const newState = pipe(state)(
    movePackman,
    turnPackman(input),
    collectCoin,
    moveGhosts,
  )

  const forRender = toCommon(newState)
  res.send({ newState, forRender, status: 200 })
}

function toCommon(state: State) {
  return [...state.env, state.packman]
}

export default { registerRoutes }
