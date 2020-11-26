import Phaser from 'phaser';

var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

export const game = new Phaser.Game(config);

var FontSize = 32;
var index;

var fog;

function preload() {
  this.load.image('Background', 'img/back.png');
  this.load.image('Ennemie', 'img/ennemi.png');
  this.load.image('Player', 'img/player.png');
  this.load.image('mask', 'img/mask.png');
}

function create() {
  this.add.image(600, 600, 'Background');
  const player = this.add.image(600, 600, 'Player');

  // Gauche
  this.input.keyboard.on('keydown-Q', function (event) {
    if (index === 2) {
      //  Blocked, we can't move
    } else {
      player.x -= 32;
      player.angle = 180;
    }
  });

  // Droite
  this.input.keyboard.on('keydown-D', function (event) {
    if (index === 2) {
      //  Blocked, we can't move
    } else {
      player.x += 32;
      player.angle = 180;
    }
  });

  // Haut
  this.input.keyboard.on('keydown-Z', function (event) {
    if (index === 2) {
      //  Blocked, we can't move
    } else {
      player.y -= 32;
      player.angle = -90;
    }
  });

  // Bas
  this.input.keyboard.on('keydown-S', function (event) {
    if (index === 2) {
      //  Blocked, we can't move
    } else {
      player.y += 32;
      player.angle = 90;
    }
  });
}

function update() {

}
