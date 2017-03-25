import Phaser from 'phaser'

import GameplayState from './states/GameplayState'

class Game extends Phaser.Game {

  constructor () {
    super(740, 480, Phaser.AUTO)
    this.state.add('Gameplay', GameplayState, false)
    this.state.start('Gameplay')
  }
}

export default Game
