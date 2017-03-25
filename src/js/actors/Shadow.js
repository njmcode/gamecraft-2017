import Phaser from 'phaser'

class Shadow extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, 'shadow')

    // size/position
    this.alpha = 0.5
    this.anchor.setTo(0.5, 0.5)
  }

  update () {
    this.visible = (Math.abs(Math.sin(Date.now() * 0.26)) > 0.8)
  }
}

export default Shadow
