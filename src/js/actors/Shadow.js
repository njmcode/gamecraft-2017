import Phaser from 'phaser'

class Shadow extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, 'shadow')

    // size/position
    this.scale.setTo(3)
    this.anchor.setTo(0.3, 0.6)
  }

  update () {
    this.visible = !this.visible
  }
}

export default Shadow
