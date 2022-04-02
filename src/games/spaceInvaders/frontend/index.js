const WINDOW = {
  width: 600,
  height: 400,
}

const SCALE = 20

const DIRS = {
  UP: 'UP',
  DOWN: 'DOWN',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
}

const FRAME_RATE = 10

let currentState = { isGameOver: false }
let forRender = null

function setup() {
  const cnv = createCanvas(WINDOW.width, WINDOW.height)
  cnv.parent('container')
  frameRate(FRAME_RATE)
  getInitialState()
}

function showGrid(size) {
  for (let i = 0; i < WINDOW.width / size; i++) {
    for (let j = 0; j < WINDOW.height / size; j++) {
      strokeWeight(0.1)
      stroke('#363636')
      rect(i * size, j * size, size, size)
      noStroke()
    }
  }
}

function drawGameObject(obj, scale) {
  switch (obj.tag) {
    case 'enemy':
      strokeWeight(0.5)
      stroke('#363636')
      fill('#47C774')
      rect(obj.x * scale, obj.y * scale, scale, scale)
      break
    case 'ship':
      fill('#1F9CEE')
      rect(obj.x * scale, obj.y * scale, scale, scale)
      break
    case 'bullet':
      fill('#363636')
      rect(obj.x * scale, obj.y * scale, scale, scale)
      break
  }
  noFill()
}

function showLivesLeft() {
  fill('#FE3860')
  textStyle(BOLD)
  textSize(20)
  text(`Lives: ${currentState.ship.lives}`, 20, 30)
}

function draw() {
  clear()

  if (forRender) {
    forRender.forEach(obj => {
      drawGameObject(obj, SCALE)
    })
  }
  if (!currentState.isGameOver) {
    updateGame()
  } else {
    fill('#FE3860')
    textStyle(BOLD)
    textSize(72)
    text('Game over', WINDOW.width / 2 - 180, WINDOW.height / 2)
  }
  showLivesLeft()
}

function keyPressed() {
  let input = null
  if (keyCode === RIGHT_ARROW) {
    input = DIRS.RIGHT
  } else if (keyCode === LEFT_ARROW) {
    input = DIRS.LEFT
  } else if (keyCode === UP_ARROW) {
    input = DIRS.UP
  }
  if (!!input && !currentState.isGameOver) {
    updateGame(input)
  }
}

function getInitialState() {
  fetch('init')
    .then(response => response.json())
    .then(data => {
      currentState = data
    })
    .catch(e => console.log(e))
}

function updateGame(input) {
  post('update', { state: currentState, input }).then(data => {
    currentState = data.newState
    forRender = data.forRender
  })
}

function post(url, json) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(e => console.log(e))
}
