import express from 'express'
import { config } from 'dotenv'
import path from 'path'
import { Request, Response } from 'express'

import snake from './games/snake'
import spaceInvaders from './games/spaceInvaders'
import tetris from './games/tetris'
import packman from './games/packman'
import stressTest from './strass-test'

config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())

snake.registerRoutes(app)
spaceInvaders.registerRoutes(app)
tetris.registerRoutes(app)
packman.registerRoutes(app)
stressTest.registerRoutes(app)

app.get('/favicon.ico', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/../favicon.ico'))
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
