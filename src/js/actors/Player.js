import Phaser from 'phaser'

class Player extends Phaser.Sprite {

  constructor (game, x, y) {
    console.log('NEW PLAYER')
    super(game, x, y, 'player')
    this.scale.setTo(2)
  }

  update () {

  }
}

export default Player
