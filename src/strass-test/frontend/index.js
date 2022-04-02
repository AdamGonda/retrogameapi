const FRAME_RATE = 10
let updateIsInProgress = false

async function setup() {
  const cnv = createCanvas(500, 500)
  cnv.parent('container')
  frameRate(FRAME_RATE)
}

async function draw() {
  background(255, 204, 0);
  await update()
}

function update() {
  if (!updateIsInProgress) {
    updateIsInProgress = true

    fetch('test', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then(r => r.json())
      .then(data => {
        updateIsInProgress = false
      })
      .catch(e => console.log)
  }
}
