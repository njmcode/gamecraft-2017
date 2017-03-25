import Phaser from 'phaser'

import PreloadState from './states/PreloadState'
import GameplayState from './states/GameplayState'

class Game extends Phaser.Game {

  constructor () {
    super(740, 480, Phaser.AUTO, 'game-wrap')

    this.antialias = false

    this.state.add('Preload', PreloadState, false)
    this.state.add('Gameplay', GameplayState, false)
    this.state.start('Preload')
  }
}

export default Game
