import Phaser from 'phaser'
import Shadow from './Shadow'
import { getLineXFromY } from '../helpers/position'

const STATE_APPROACHING = 'STATE_APPROACHING'
const STATE_ASKING_QUESTION = 'STATE_ASKING_QUESTION'
const STATE_DEAD = 'STATE_DEAD'

const LIMIT_LINE = {
  x: {
    min: 100,
    max: 226,
  },
  y: {
    min: 220,
    max: 445,
  },
}

class Reporter extends Phaser.Sprite {

  constructor (game, { x, y, speed, isEnemy }) {
    const spriteID = (isEnemy)
      ? 'reporter-enemy-' + game.rnd.integerInRange(1, 4)
      : 'reporter'
    super(game, x, (isEnemy ? y + 12 : y), spriteID)

    // size/position
    this.scale.setTo(3)
    this.anchor.setTo(0.5, 1)
    this.initialY = y
    this.targetXOffset = Math.random() * 100

    // physics
    this.game.physics.enable(this, Phaser.Physics.ARCADE)
    this.body.setSize(13, 4, 5, 25)
    this.speed = speed
    this._rndFactor = Math.random() * Date.now()

    this.shadowSprite = new Shadow(this.game, 3, -1)
    this.addChild(this.shadowSprite)

    // state
    this.isEnemy = isEnemy
    this.currentState = STATE_APPROACHING
  }

  update () {
    const targetX = getLineXFromY(
      LIMIT_LINE.x.min, LIMIT_LINE.y.min,
      LIMIT_LINE.x.max, LIMIT_LINE.y.max,
      this.position.y
    )

    switch (this.currentState) {
      case STATE_APPROACHING:
        this.body.velocity.x = -this.speed
        this.doWalkAnim()
        if (this.position.x <= (targetX + this.targetXOffset)) {
          this.currentState = STATE_ASKING_QUESTION
        }
        break
      case STATE_ASKING_QUESTION:
        this.body.velocity.x = 0
        this.doWalkAnim()
        break
      case STATE_DEAD:
        this.body.velocity.x *= this.skidFactor || 1
        break
      default:
        break
    }

    this.shadowSprite.update()
    // this.game.debug.body(this)
  }

  doWalkAnim () {
    if (Math.abs(
        Math.sin((Date.now() + this._rndFactor) * 0.01)) > 0.8) {
      this.anchor.setTo(0.5, 1.02)
    } else {
      this.anchor.setTo(0.5, 1)
    }
  }

  die () {
    this.alive = false
    this.currentState = STATE_DEAD
    this.anchor.x = 1
    this.scale.x *= 0.9
    this.body.velocity.x = 200
    this.skidFactor = 0.9
    this.angle = 90
    this.removeChild(this.shadowSprite)
    this.shadowSprite.kill()
    this.game.time.events.add(500, () => {
      this.kill()
    })
  }

}

export default Reporter
