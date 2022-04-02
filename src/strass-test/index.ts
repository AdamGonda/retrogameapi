import { Application, Request, Response } from 'express'
import path from 'path'

const PREFIX = '/stress-test'

const registerRoutes = (app: Application) => {
  app.get(PREFIX + '/html', html)
  app.get(PREFIX + '/js', js)
  app.get(PREFIX + '/test', test)
}

function html(req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '/frontend/index.html'))
}

function js(req: Request, res: Response) {
  res.sendFile(path.join(__dirname + '/frontend/index.js'))
}

function test(req: Request, res: Response) {
  res.json({ status: 200 })
}

export default { registerRoutes }
