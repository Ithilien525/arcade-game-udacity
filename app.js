// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random()*350)+150);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -300;
        this.x += this.speed * dt;
    } 

    //set player and enemy collision, if the difference in coordinates is smaller than enemy dimension, reset player location
    if (player.x < this.x + 80 &&
        player.x > this.x - 80 &&
        player.y < this.y + 60 &&
        player.y > this.y - 60) {
        player.reset();
    };
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
var Player = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {

};

Player.prototype.handleInput = function(direction) {
    
    //allow user to move player character around
    switch(direction) {
        case 'left':
            this.x > 100 ? this.x -= 100 : this.x -=0;
            break;
        case 'right':
            this.x < 305 ? this.x += 100 : this.x +=0;
            break;
        case 'up':
            this.y > 0 ? this.y -= 83 : this.y -=0;
            break;
        case 'down':
            this.y < 322 ? this.y += 83 : this.y +=0;

    }
    //if character reaches the river, tell player they won and reset game
    if (this.y < 0) {
        //player.reset();
        setTimeout(function(){
            if(confirm('You won! Start over!')){
              //
              player.reset();
            }
          }, 100);
    }
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Place player on start position
const player = new Player(204,400,'images/char-horn-girl.png');

//Enemy positions
let enemyLocation = [225, 145, 60];

let allEnemies = enemyLocation.map((y, index)=> {
    return new Enemy((-100*(index+1)), y);
});

//Reset game
Player.prototype.reset = function(){
    this.x = 204;
    this.y = 400;
}


