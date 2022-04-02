import path from 'path'
import Avj from 'ajv'
import schema from './validation-schema.json'

import { Application, Request, Response } from 'express'
import { pipe } from '../../utils'
import { checkEnemiesCollisionWithWalls } from './collision'
import { moveShip, moveEnemies, moveBullets } from './move'
import { checkForHits, removeOutOfViewBullets, shootWithEnemies, shootWithShip } from './sooth'
import { State } from './types'
import { Enemies, Plane, Ship } from './factories'
import { isGameOver } from './isGameOver'

const PREFIX = '/spaceInvaders'
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
  const initialState = {
    ship: Ship(18 , 18, 3),
    enemies: Enemies(0, 0, 15, 2, 0.01),
    plane: Plane(30, 20),
    isGameOver: false
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
    moveShip(input),
    shootWithShip(input),
    moveEnemies,
    checkEnemiesCollisionWithWalls,
    shootWithEnemies,
    moveBullets,
    checkForHits,
    isGameOver,
    removeOutOfViewBullets,
  )

  const forRender = toCommon(newState)

  res.json({ newState, forRender })
}

function toCommon(state: State) {
  const { ship, enemies } = state
  return [
    { x: ship.x, y: ship.y, tag: 'ship', lives: ship.lives },
    ...ship.bullets.map(x => ({ ...x, tag: 'bullet' })),
    ...enemies.instances.map(enemy => ({
      x: enemy.x,
      y: enemy.y,
      tag: 'enemy',
    })),
    ...enemies.bullets.map(x => ({ ...x, tag: 'bullet' })),
  ]
}

export default { registerRoutes }
