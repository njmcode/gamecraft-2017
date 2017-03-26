import Phaser from 'phaser'
import Shadow from './Shadow'

const SHOT_SPEED = 300
const SHOT_DROP = 5

class PageGfx extends Phaser.Sprite {
  constructor (game, parent) {
    super(game, 0, -25, 'page')
    this.anchor.setTo(0.5, 0.5)
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.velocity.y = SHOT_DROP
  }

  update () {
    this.angle += 10
  }
}

class Page extends Phaser.Sprite {

  constructor (game, x, y) {
    super(game, x, y, null)

    // size/position
    this.scale.setTo(3)
    this.anchor.setTo(0.5, 0.5)

    // physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.velocity.x = SHOT_SPEED

    this.body.setSize(6, 1, 14, 15)
    this.outOfBoundsKill = true
    this.checkWorldBounds = true

    this.pageSprite = new PageGfx(this.game, this)
    this.addChild(this.pageSprite)

    this.shadowSprite = new Shadow(this.game, 0, 0)
    this.addChild(this.shadowSprite)
  }

  update () {
    //this.game.debug.body(this)
    this.pageSprite.update()
    this.shadowSprite.update()
  }
}

export default Page
