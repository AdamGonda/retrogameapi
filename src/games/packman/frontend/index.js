const SCALE = 25
const FRAME_RATE = 6

const DIRS = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
}

const GameObjectType = {
  Wall: 'Wall',
  Packman: 'Packman',
  Empty: 'Empty',
  Hole: 'Hole',
  Coin: 'Coin',
  NoCoin: 'NoCoin',
  Cherry: 'Cherry',
  Ghost: 'Ghost'
}

let updateIsInProgress = false
let currentState = null
let forRender = null
let input = null


async function setup() {
  currentState = await getInitialState()
  console.log('currentState', currentState);
  const { width, height } = currentState.view
  const cnv = createCanvas(width * SCALE, height * SCALE)
  cnv.parent('container')
  frameRate(FRAME_RATE)
  // await updateGame(input)
}

function getY(obj) {
  const flipped = (currentState.view.height - obj.y) * SCALE
  return flipped - SCALE
}

function getX(obj) {
  return obj.x * SCALE
}

function drawSquare(obj, color) {
  strokeWeight(0.5)
  noStroke()
  fill(color)
  rect(getX(obj), getY(obj), SCALE, SCALE)
}

function drawPackman(obj, color) {
  strokeWeight(0.5)
  noStroke()
  fill(color)
  circle(obj.x * SCALE + (SCALE / 2), (currentState.view.height - obj.y) * SCALE - SCALE / 2, SCALE)
}

function drawCoin(obj, color) {
  strokeWeight(0.5)
  noStroke()
  fill(color)
  circle(obj.x * SCALE + (SCALE / 2), (currentState.view.height - obj.y) * SCALE - SCALE / 2, SCALE / 2)
}

function drawGhost(obj, color) {
  strokeWeight(0.5)
  noStroke()
  fill(color)
  circle(obj.x * SCALE, (currentState.view.height - obj.y) * SCALE, SCALE)
  rect(getX(obj), getY(obj) + SCALE / 2, SCALE, SCALE / 2)
}

function drawGameObject(obj) {
  switch (obj.tag) {
    case GameObjectType.Wall:
      drawSquare(obj, '#000')
      break

    case GameObjectType.Packman:
      drawPackman(obj, '#eebe1f')
      break

      case GameObjectType.Ghost:
      drawGhost(obj, '#9c9c9c')
      break

      case GameObjectType.Empty:
      drawSquare(obj, '#fff')
      break

      case GameObjectType.Hole:
      drawSquare(obj, '#fff')
      break

      case GameObjectType.NoCoin:
      drawSquare(obj, '#686868')
      break

      case GameObjectType.Coin:
      drawCoin(obj, '#ff00d4')
      break

      case GameObjectType.Cherry:
      drawSquare(obj, '#ff1e00')
      break
  }
  noFill()
}

async function draw() {
  if (!currentState) return

  // Render
  clear()
  if (forRender) {
    forRender.forEach(obj => {
      drawGameObject(obj)
    })
  }

  // Update
  if (!currentState?.isGameOver) {
    await updateGame(input)
  } else {
    const { width, height } = currentState.view

    fill('#FE3860')
    textStyle(BOLD)
    textSize(72)
    text(
      'Game over',
      (width * SCALE) / 2 - 180,
      (height * SCALE) / 2,
    )
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    input = DIRS.RIGHT
  } else if (keyCode === LEFT_ARROW) {
    input = DIRS.LEFT
  } else if (keyCode === UP_ARROW) {
    input = DIRS.UP
  } else if (keyCode === DOWN_ARROW) {
    input = DIRS.DOWN
  }
}

function getInitialState() {
  return fetch('init')
    .then(res => res.json())
    .then(data => data)
    .catch(e => console.log(e))
}

function updateGame(input) {
  if (!updateIsInProgress) {
    updateIsInProgress = true

    fetch('update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: currentState, input }),
    })
      .then(r => r.json())
      .then(data => {
        currentState = data.newState
        forRender = data.forRender

        updateIsInProgress = false
      })
      .catch(e => console.log)
  }
}
