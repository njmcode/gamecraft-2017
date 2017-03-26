import Phaser from 'phaser'
import Page from './Page'
import Shadow from './Shadow'
import { getLineXFromY } from '../helpers/position'

const FIRE_COOLDOWN = 500

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
        min: 25,
        max: 150,
      },
      y: {
        min: 200,
        max: 413,
      },
    }

    // shots
    this._lastShotTime = null

    this.shots = this.game.add.group()

    this.shadowSprite = new Shadow(this.game, -3, -2)
    this.addChild(this.shadowSprite)

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

    if (this.actionButton.isDown) {
      this.shoot()
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
      this.anchor.setTo(0.5, 1)
    }
    if (this.position.y > this.limits.y.max) {
      this.position.y = this.limits.y.max
      this.body.velocity.y = 0
      this.anchor.setTo(0.5, 1)
    }

    if (Math.abs(this.body.velocity.y) > 1) {
      if (Math.abs(
          Math.sin((Date.now()) * 0.01)) > 0.8) {
        this.anchor.setTo(0.5, 1.03)
      } else {
        this.anchor.setTo(0.5, 1)
      }
    }

    this._calcXPosition()

    this.shadowSprite.update()
  }

  _calcXPosition () {
    this.position.x = getLineXFromY(
      this.limits.x.min, this.limits.y.min,
      this.limits.x.max, this.limits.y.max,
      this.position.y)
  }

  shoot () {
    if (!this._lastShotTime ||
      this.game.time.now - this._lastShotTime > FIRE_COOLDOWN) {
      const shot = new Page(this.game,
        this.position.x + 50,
        this.position.y)
      this.shots.add(shot)

      this._lastShotTime = this.game.time.now

      this.loadTexture('player-point')
      this.game.time.events.add(200, () => {
        this.loadTexture('player')
      })
    }
  }
}

export default Player
