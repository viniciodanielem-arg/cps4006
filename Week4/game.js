/* =========================
   DODGE GAME (Challenge 4)
   =========================
   Player: red rectangle at bottom, move left/right with arrow keys.
   Enemies: blue squares fall from the top at constant speed.
   If player collides with any falling square -> "Game Over!" then reload.
*/

// 1) Grab the canvas from the HTML and get the 2D drawing context
const canvas = document.getElementById("MyCanvas");
const ctx = canvas.getContext("2d");

// 2) Track which keys are currently being pressed (like a "keyboard state")
let keys = {};

// 3) Create the player object (a red rectangle)
//    We store its position (x,y), size (width,height), speed (how fast it moves), and colour.
let player = {
  colour: "red",
  x: canvas.width / 2 - 25,      // start roughly in the middle
  y: canvas.height - 30,         // near the bottom of the canvas
  width: 50,
  height: 20,
  speed: 6
};

// 4) Array to store all falling enemies (blue squares)
let enemies = [];

// 5) Control how often enemies spawn (in milliseconds)
let spawnIntervalMs = 1000;       // spawn every 1 second
let lastSpawnTime = 0;            // used to time spawns

// 6) Enemy settings (size + falling speed)
const enemySize = 20;
const enemySpeed = 3;

/* =========================
   EVENT LISTENERS (KEYBOARD)
   ========================= */

// When a key is pressed down, store it as true in the keys object
window.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

// When a key is released, remove it from the keys object
window.addEventListener("keyup", function (event) {
  delete keys[event.key];
});

/* =========================
   COLLISION DETECTION (AABB)
   =========================
   AABB checks if two rectangles overlap.
   If they overlap in BOTH x-direction and y-direction => collision.
*/
function isColliding(rectA, rectB) {
  return (
    rectA.x < rectB.x + rectB.width &&         // A's left is left of B's right
    rectA.x + rectA.width > rectB.x &&         // A's right is right of B's left
    rectA.y < rectB.y + rectB.height &&        // A's top is above B's bottom
    rectA.y + rectA.height > rectB.y           // A's bottom is below B's top
  );
}

/* =========================
   ENEMY SPAWNING
   =========================
   Create a new enemy at a random x position at the top of the canvas.
*/
function spawnEnemy() {
  // Math.random() gives a number between 0 and 1 (not including 1)
  // Multiply by (canvas.width - enemySize) so it fits within the canvas.
  const randomX = Math.random() * (canvas.width - enemySize);

  // Push a new enemy object into the enemies array
  enemies.push({
    colour: "blue",
    x: randomX,
    y: 0,               // start at the very top
    width: enemySize,
    height: enemySize,
    speed: enemySpeed
  });
}

/* =========================
   UPDATE GAME LOGIC
   =========================
   - Move player based on keys pressed
   - Keep player inside canvas
   - Spawn enemies over time
   - Move enemies down
   - Check collisions
*/
function update(timestamp) {
  // timestamp is provided by requestAnimationFrame (ms since page load)

  /* ---- PLAYER MOVEMENT ---- */
  if (keys["ArrowLeft"]) {
    player.x -= player.speed;
  }
  if (keys["ArrowRight"]) {
    player.x += player.speed;
  }

  // Stop player leaving the LEFT edge
  if (player.x < 0) {
    player.x = 0;
  }

  // Stop player leaving the RIGHT edge
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }

  /* ---- ENEMY SPAWNING (TIMED) ---- */
  // If enough time has passed since last spawn, spawn a new enemy
  if (timestamp - lastSpawnTime > spawnIntervalMs) {
    spawnEnemy();
    lastSpawnTime = timestamp;
  }

  /* ---- ENEMY MOVEMENT + COLLISION ---- */
  for (let i = 0; i < enemies.length; i++) {
    // Move enemy downward
    enemies[i].y += enemies[i].speed;

    // Check collision between this enemy and the player
    if (isColliding(player, enemies[i])) {
      alert("Game Over!");
      location.reload(); // reload page to restart game
      return;            // stop update (page will reload anyway)
    }
  }

  /* ---- CLEAN UP OFF-SCREEN ENEMIES ---- */
  // Keep only enemies that are still visible on the canvas
  enemies = enemies.filter(enemy => enemy.y < canvas.height);
}

/* =========================
   RENDER (DRAW) EVERYTHING
   =========================
   - Clear the canvas
   - Draw player
   - Draw each enemy
*/
function render() {
  // Clear the entire canvas each frame so the old drawings don't remain
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player rectangle
  ctx.fillStyle = player.colour;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw each enemy square
  for (let i = 0; i < enemies.length; i++) {
    ctx.fillStyle = enemies[i].colour;
    ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
  }
}

/* =========================
   MAIN GAME LOOP
   =========================
   requestAnimationFrame calls this function ~60 times per second.
*/
function animate(timestamp) {
  update(timestamp);  // update positions, spawn enemies, check collisions
  render();           // draw everything
  requestAnimationFrame(animate); // ask browser for next animation frame
}

// Start the game loop
requestAnimationFrame(animate);