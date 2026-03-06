/* =========================
   BREAKOUT GAME (Challenge 5)
   =========================
   - Player controls a paddle at the bottom with left/right arrows.
   - Ball bounces around.
   - Bricks at the top disappear when hit.
   - Win = all bricks destroyed.
   - Lose = ball falls below paddle.
*/

// 1) Get the canvas and drawing context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 2) Track which keys are held down
let keys = {};

// Key down: mark key as pressed
window.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

// Key up: remove key from pressed state
window.addEventListener("keyup", (event) => {
  delete keys[event.key];
});

/* =========================
   PADDLE (BAT) SETTINGS
   ========================= */

// Paddle object (rectangle)
let paddle = {
  x: canvas.width / 2 - 50,      // start in middle
  y: canvas.height - 20,         // near bottom
  width: 100,
  height: 12,
  speed: 7,
  colour: "black"
};

/* =========================
   BALL SETTINGS
   ========================= */

// Ball object (circle)
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  // dx/dy = how much the ball moves each frame (velocity)
  dx: 4,
  dy: -4,
  colour: "red"
};

/* =========================
   BRICKS SETTINGS
   ========================= */

// We create multiple bricks in a grid.
const brickRows = 4;
const brickCols = 8;

const brickWidth = 60;
const brickHeight = 20;

const brickPadding = 10;     // space between bricks
const brickOffsetTop = 50;   // distance from top of canvas
const brickOffsetLeft = 35;  // distance from left edge

// Bricks array
// Each brick has x, y, width, height, and "alive" status
let bricks = [];

// Create the bricks in a grid
function createBricks() {
  bricks = []; // reset in case we restart
  for (let row = 0; row < brickRows; row++) {
    for (let col = 0; col < brickCols; col++) {
      const x = brickOffsetLeft + col * (brickWidth + brickPadding);
      const y = brickOffsetTop + row * (brickHeight + brickPadding);

      bricks.push({
        x,
        y,
        width: brickWidth,
        height: brickHeight,
        alive: true
      });
    }
  }
}
createBricks();

/* =========================
   COLLISION HELPERS
   ========================= */

/*
  Check if a circle (ball) collides with a rectangle (paddle or brick).
  This is a simple approach: we check if the ball's center is within
  an expanded rectangle area (using radius).
*/
function circleRectCollision(circle, rect) {
  return (
    circle.x + circle.radius > rect.x &&
    circle.x - circle.radius < rect.x + rect.width &&
    circle.y + circle.radius > rect.y &&
    circle.y - circle.radius < rect.y + rect.height
  );
}

/* =========================
   UPDATE GAME LOGIC
   ========================= */

function update() {
  /* ---- MOVE PADDLE ---- */
  if (keys["ArrowLeft"]) {
    paddle.x -= paddle.speed;
  }
  if (keys["ArrowRight"]) {
    paddle.x += paddle.speed;
  }

  // Keep paddle inside canvas
  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x + paddle.width > canvas.width) {
    paddle.x = canvas.width - paddle.width;
  }

  /* ---- MOVE BALL ---- */
  ball.x += ball.dx;
  ball.y += ball.dy;

  /* ---- BALL WALL BOUNCE ---- */

  // Left wall or right wall
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.dx *= -1; // reverse x direction
  }

  // Top wall
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1; // reverse y direction
  }

  /* ---- BALL FALLS BELOW PADDLE (GAME OVER) ---- */
  if (ball.y - ball.radius > canvas.height) {
    alert("Game Over!");
    location.reload();
    return;
  }

  /* ---- BALL HITS PADDLE ---- */
  if (circleRectCollision(ball, paddle)) {
    // Bounce upward
    ball.dy *= -1;

    // Optional: change ball direction based on where it hits the paddle
    // This makes the game feel more controllable.
    const paddleCenter = paddle.x + paddle.width / 2;
    const hitPos = (ball.x - paddleCenter) / (paddle.width / 2);
    ball.dx = hitPos * 5; // adjust x speed depending on hit position
  }

  /* ---- BALL HITS BRICKS ---- */
  let bricksLeft = 0;

  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];

    if (brick.alive) {
      bricksLeft++;

      // If ball collides with this brick
      if (circleRectCollision(ball, brick)) {
        brick.alive = false; // remove brick
        ball.dy *= -1;       // bounce back
      }
    }
  }

  /* ---- WIN CONDITION ---- */
  if (bricksLeft === 0) {
    alert("You Win!");
    location.reload();
    return;
  }
}

/* =========================
   RENDER (DRAW) EVERYTHING
   ========================= */

function render() {
  // Clear canvas each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* ---- DRAW PADDLE ---- */
  ctx.fillStyle = paddle.colour;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  /* ---- DRAW BALL ---- */
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.colour;
  ctx.fill();
  ctx.closePath();

  /* ---- DRAW BRICKS ---- */
  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];
    if (brick.alive) {
      ctx.fillStyle = "blue";
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    }
  }
}

/* =========================
   MAIN GAME LOOP
   ========================= */

function animate() {
  update();     // move objects + check collisions
  render();     // draw the current frame
  requestAnimationFrame(animate); // repeat
}

// Start the game
animate();