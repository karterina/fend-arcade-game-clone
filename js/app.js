// global variable to use when changing background
const body = document.querySelector('body');
// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    //setting coordinates and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
    //loading image for the enemy objects
    this.sprite = 'images/enemy-bug.png';
};

// checking for collision and returning player to the initial point
// when collision happens
function collision(player, enemy) {
  if (player.x < enemy.x + 80 &&
  player.x + 80 > enemy.x &&
  player.y < enemy.y + 50 &&
  player.y + 50 > enemy.y) {
    alert('You loose! Try again, you will make it this time!');
    // changing backgroung to red
    body.style.background='url("images/bg1.jpg")';
    player.x = 200;
    player.y = 400;
  };
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplies any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // enemies reapperaing on canvas after getting to the end of canvas
    if (this.x > 630) {
      this.x = -110;
      // randomizing speed
      this.speed = 100 + Math.floor(Math.random() * 452);
    };
    collision(player, this);
};



// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player character
const Player = function(x, y) {
  //setting coordinates
  this.x = x;
  this.y = y;
  //loading image for the player object
  this.character = 'images/char-pink-girl.png'
};

// updating player's position
Player.prototype.update = function () {
  //preventing the player going off screen
  if (this.x > 400) {
    this.x = 400;
  }
  if (this.x < 0) {
    this.x = 0;
  }
  if (this.y > 400) {
    this.y = 400;
  }
  //checking for player getting to the top of the canvas
  //and winning/getting back at the start point
  if (this.y < 0) {
    alert('You have won! Hooray! Those nasty bugs better beware!');
    // changes background to blue
    body.style.background='url("images/bg9.jpg")';
    this.x = 200;
    this.y = 400;
  };
};

// draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.character), this.x, this.y);
};


//moving the player depending on what keys were pressed by the user
Player.prototype.handleInput = function(key) {
    if (key == 'left') {
      this.x -= 100;
    }
    if (key == 'up') {
      this.y -= 85;
    }
    if (key == 'right') {
      this.x += 100;
    }
    if (key == 'down') {
      this.y += 85;
    }
};


// all created enemies
let allEnemies = [];
// starting points/lines for enemies to appear
const enemyStart = [65, 145, 225];

// creating enemies and putting them on the starting points
enemyStart.forEach(function(y) {
  enemy = new Enemy(0, y, 100 + Math.floor(Math.random() * 452));
  allEnemies.push(enemy);
});

// creating the player
const player = new Player(200, 400);

// This listens for key presses and sends the keys to the
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}, player);
