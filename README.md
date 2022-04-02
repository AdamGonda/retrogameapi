# Retro Game API

Docs: https://www.retrogameapi.com/

## Little history

### First steps

It's one of my fun experimental projects. I like to create games and I liked to learn more about FP so I took my favorite game to implement Snake and implemented it using JavaScript in a functional manner.

When it was done I started to think about the stateless nature of FP and the beauty of this implementation. The business logic is nicely separated from everything else, and the whole thing is a pure function. This implementation used Node and I rendered the game to the console.

### Spice it up

The presentation and the game logic already were two different things. The API between the two was very clear, so I started to think...
One option is to ship the logic to the frontend, but it's too obvious and this is my little fun project. So I thought that it would be interesting if this code stays at the backend. The API is already very clear and my implementation is totally stateless and separate from the presentation 🤠.
So I took the game logic and I created a Node app and I decided to host it on Heroku.

### Solution

<b>Backend:</b> Node server running on Heroku, totally stateless and it knows nothing about the rendering. It is just a mapping between (currentState, input) => newState.

<b>Frontend:</b> I called my old friend p5.js to the rescue for the rendering. With the clean separation, this module's job is very straightforward. It initializes the state, then it calls the Node server on every iteration of the game to get the new state to render. 

### PS

Of course, this is not an optimal solution, But I thought it maybe can be used for learning purposes, for concepts like:

- Network latency
- Concurrency
- Separation of concerns
