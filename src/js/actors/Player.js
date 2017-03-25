import Phaser from 'phaser'

class Player extends Phaser.Sprite {

  constructor (game) {
    super(game, 100, 300, 'player')

    // size/position
    this.scale.setTo(3)
    this.anchor.setTo(0.5, 1)

    // physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.maxSpeed = 5
    this.acceleration = 30
    this.damping = 1.15

    this.initialPos = {
      x: this.position.x,
      y: this.position.y,
    }
    this.limits = {
      x: {
        min: 39,
        max: 150,
      },
      y: {
        min: 210,
        max: 400,
      }
    }

    // input
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.actionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

  update () {
    // add accel on input
    if (this.cursors.down.isDown) {
      this.body.velocity.y += this.acceleration
    }
    if (this.cursors.up.isDown) {
      this.body.velocity.y -= this.acceleration
    }

    // slight inertia
    this.body.velocity.x /= this.damping
    this.body.velocity.y /= this.damping

    // stop dead if almost stopped
    if (Math.abs(this.body.velocity.y) < 0.01) {
      this.body.velocity.y = 0
    }

    // keep within Y limits
    if (this.position.y < this.limits.y.min) {
      this.position.y = this.limits.y.min
      this.body.velocity.y = 0
    }
    if (this.position.y > this.limits.y.max) {
      this.position.y = this.limits.y.max
      this.body.velocity.y = 0
    }

    this._calcXPosition()
  }

  _calcXPosition () {
    const xrange = this.limits.x.max - this.limits.x.min
    const yrange = this.limits.y.max - this.limits.y.min

    const perc = (this.position.y - this.limits.y.min) / yrange
    this.position.x = this.limits.x.min + ((1 - perc) * xrange)
  }
}

export default Player
