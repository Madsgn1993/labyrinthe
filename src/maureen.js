import Phaser from 'phaser';
import $ from 'jquery';

const gameWidth = 640;
const gameHeight = 640;

const config = {
  type: Phaser.AUTO,
  width: gameWidth,
  height: gameHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

export const game = new Phaser.Game(config);

function preload() {
  this.load.image('Background', 'img/laby.png');
  this.load.image('Ennemie', 'img/ennemi.png');
  this.load.image('Player', 'img/player.png');
  this.load.image('mask', 'img/mask.png');
  this.load.image('Win', 'img/Arriver.png');
}

let player;
let ennemis1;
let ennemis2;
let ennemis3;
let ennemis4;
let ennemis5;

function create() {
  const back = this.add.image(gameWidth, gameHeight, 'Background');
  back.x -= 16;
  back.y -= 16;
  player = this.physics.add.image(16, 16, 'Player');

  const win = this.add.image(880, 570, 'Win');

  ennemis1 = this.physics.add.image(95, 170, 'Ennemie');
  ennemis2 = this.physics.add.image(310, 510, 'Ennemie');
  ennemis3 = this.physics.add.image(365, 150, 'Ennemie');
  ennemis4 = this.physics.add.image(755, 200, 'Ennemie');
  ennemis5 = this.physics.add.image(560, 370, 'Ennemie');

  // Fog of war
  const shape = this.make.graphics();
  shape.fillStyle(0xffffff);
  shape.beginPath();

  shape.moveTo(-50, 0);
  shape.arc(-50, 0, 80, 0, Math.PI * 2);
  shape.moveTo(50, 0);
  shape.arc(50, 0, 80, 0, Math.PI * 2);

  shape.fillPath();
  const mask = shape.createGeometryMask();

  back.setMask(mask);
  ennemis1.setMask(mask);
  ennemis2.setMask(mask);
  ennemis3.setMask(mask);
  ennemis4.setMask(mask);
  ennemis5.setMask(mask);
  win.setMask(mask);

  // Caméra
  this.cameras.main.setBounds(0, 0, 1280, 1280);
  this.cameras.main.startFollow(player, true, 0.09, 0.09);
  // this.cameras.main.setZoom(1.5);

  // Mouvements
  // Gauche
  this.input.keyboard.on('keydown-LEFT', function (event) {
    if (player.x !== 16) {
      player.x -= 32;
      player.angle = 180;
      shape.x -= 32;
      shape.angle = 180;
    }
  });

  // Droite
  this.input.keyboard.on('keydown-RIGHT', function (event) {
    if (player.x !== 1264) {
      player.x += 32;
      player.angle = 180;
      shape.x += 32;
      shape.angle = 180;
    }
  });

  // Haut
  this.input.keyboard.on('keydown-UP', function (event) {
    if (player.y !== 16) {
      player.y -= 32;
      player.angle = -90;
      shape.y -= 32;
      shape.angle = -90;
    }
  });

  // Bas
  this.input.keyboard.on('keydown-DOWN', function (event) {
    if (player.y !== 1264) {
      player.y += 32;
      player.angle = 90;
      shape.y += 32;
      shape.angle = 90;
    }
  });
}

function update() {
  if (this.physics) {
    const ennemies = [ennemis1, ennemis2, ennemis3, ennemis4, ennemis5];
    for (const ennemy of ennemies) {
      console.log(ennemy);
      const isOverlapping = this.physics.overlap(player, ennemy);
      if (isOverlapping) {
        $('.modal').modal({ backdrop: 'static', keyboard: false }).modal('show');
        $('.modal').one('hidden.bs.modal', function () {
          ennemy.destroy();
        });
      }
    }
  }
}
