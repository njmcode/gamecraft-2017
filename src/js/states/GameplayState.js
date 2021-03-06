import Phaser from 'phaser'
import RenderGroup from '../helpers/RenderGroup'

import Player from '../actors/Player'
import Reporter from '../actors/Reporter'
import { snapToNearest } from '../helpers/position'

const STATE_GET_READY = 'STATE_GET_READY'
const STATE_IN_GAME = 'STATE_IN_GAME'
const STATE_FINISHED = 'STATE_FINISHED'

const REPORTER_SPAWN_DELAY = {
  MIN: 1000,
  MAX: 3000,
}
const REPORTER_SPEED = {
  MIN: 50,
  MAX: 80,
}
const MAX_ACTIVE_REPORTERS = 20
const REPORTER_MIN_Y = 230
const REPORTER_MAX_Y = 420
const REPORTER_Y_SPACING = 30

const ENEMY_SPAWN_RATIO = 0.7

class GameplayState extends Phaser.State {

  create () {
    // play area
    this.add.image(0, 0, 'game-bg')

    // player
    this.player = new Player(this.game, 300, 300)
    this.add.existing(this.player)

    // reporters
    this.reporters = this.game.add.group()

    this.sortGroup = new RenderGroup(this.game)
    this.sortGroup.add(this.reporters)
    this.sortGroup.add(this.player.shots)

    // state
    this.spawnWaiting = false
    this.currentState = STATE_GET_READY

    this.game.time.events.add(2000, () => {
      this.currentState = STATE_IN_GAME
    })
  }

  update () {
    this.sortGroup.sort('y', Phaser.Group.SORT_ASCENDING)

    switch (this.currentState) {
      case STATE_GET_READY:
        break
      case STATE_IN_GAME:
        // spawn a reporter if we can
        if (!this.spawnWaiting && this.reporters.countLiving() < MAX_ACTIVE_REPORTERS) {
          this.spawnWaiting = true
          if (this.reporters.countLiving() === 0) {
            this._spawnReporter()
          } else {
            this.game.time.events.add(
              this.game.rnd.integerInRange(REPORTER_SPAWN_DELAY.MIN, REPORTER_SPAWN_DELAY.MAX),
              this._spawnReporter.bind(this)
            )
          }
        }

        // collisions
        this.physics.arcade.collide(this.player.shots, this.reporters,
          this.shotHitsReporter, null, this)
        break
      default:
        break
    }
  }

  _spawnReporter () {
    const reporter = new Reporter(this.game, {
      x: this.game.world.width + (Math.random() * 100),
      y: snapToNearest(
        this.game.rnd.integerInRange(REPORTER_MIN_Y, REPORTER_MAX_Y),
        REPORTER_Y_SPACING
      ),
      speed: this.game.rnd.integerInRange(
        REPORTER_SPEED.MIN,
        REPORTER_SPEED.MAX
      ),
      isEnemy: (Math.random() < ENEMY_SPAWN_RATIO),
    })
    this.reporters.add(reporter)
    this.spawnWaiting = false
  }

  shotHitsReporter (shot, reporter) {
    reporter.die()
    shot.kill()
  }

}

export default GameplayState
