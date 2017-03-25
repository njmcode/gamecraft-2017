import Phaser from 'phaser'

import Player from '../actors/Player'

class GameplayState extends Phaser.State {

  create () {
    this.add.image(0, 0, 'game-bg')

    this.player = new Player(this.game, 300, 300)
    this.add.existing(this.player)
  }

}

export default GameplayState
