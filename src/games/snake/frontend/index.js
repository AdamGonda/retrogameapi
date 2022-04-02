const SCALE = 20
const FRAME_RATE = 5

const DIRS = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
}

let updateIsInProgress = false
let currentState = null
let forRender = null
let currentDir = DIRS.RIGHT

async function setup() {
  currentState = await getInitialState()
  const { width, height } = currentState.view
  const cnv = createCanvas(width * SCALE, (height + 2) * SCALE)
  cnv.parent('container')
  frameRate(FRAME_RATE)
}

function getY(obj) {
  return currentState.view.height - obj.y
}

function drawGameObject(obj, scale) {
  switch (obj.tag) {
    case 'head':
      strokeWeight(0.5)
      noStroke()
      fill('#1F9CEE')
      rect(obj.x * scale, getY(obj) * scale, scale, scale)
      break

    case 'body':
      strokeWeight(0.5)
      stroke('#363636')
      noFill()
      rect(obj.x * scale, getY(obj) * scale, scale, scale)
      break

    case 'food':
      noStroke()
      fill('#47C774')
      circle(obj.x * scale + scale / 2, getY(obj) * scale + scale / 2, scale)
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
      drawGameObject(obj, SCALE)
    })
  }

  // Update
  if (!currentState?.isGameOver) {
    await updateGame(currentDir)
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
    currentDir = DIRS.RIGHT
  } else if (keyCode === LEFT_ARROW) {
    currentDir = DIRS.LEFT
  } else if (keyCode === UP_ARROW) {
    currentDir = DIRS.UP
  } else if (keyCode === DOWN_ARROW) {
    currentDir = DIRS.DOWN
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
