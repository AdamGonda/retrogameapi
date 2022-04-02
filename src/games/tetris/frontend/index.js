const SCALE = 20
const FRAME_RATE = 5

const INPUT = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
}

let updateIsInProgress = false
let currentState = null
let forRender = null
let input = ''

async function setup() {
  currentState = await getInitialState()
  const { width, height } = currentState.view
  const cnv = createCanvas((width + 1) * SCALE, (height + 1) * SCALE)
  cnv.parent('container')
  frameRate(FRAME_RATE)
}

function drawGameObject(obj, scale) {
  switch (obj.tag) {
    case 'item':
      strokeWeight(0.5)
      stroke('#363636')
      fill('#1F9CEE')
      rect(obj.x * scale, (currentState.view.height - obj.y) * scale, scale, scale)
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
    await updateGame(input)
    input = ''
  } else {
    const { width, height } = currentState.view

    fill('#FE3860')
    textStyle(BOLD)
    textSize(42)
    text(
      'Game over',
      (width * SCALE) / 2 - 110,
      (height * SCALE) / 2,
    )
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    input = INPUT.RIGHT
  } else if (keyCode === LEFT_ARROW) {
    input = INPUT.LEFT
  } else if (keyCode === UP_ARROW) {
    input = INPUT.UP
  } else if (keyCode === DOWN_ARROW) {
    input = INPUT.DOWN
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

    const body = { state: currentState }

    if (input.length > 0) {
      body.input = input
    }

    fetch('update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
