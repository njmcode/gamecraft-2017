import Phaser from 'phaser'

import { loadAssets } from '../assets'

class PreloadState extends Phaser.State {

  preload () {
    console.log('LOADING')
    loadAssets(this.game, (progress, cacheKey, success, totalLoaded, totalFiles) => {
      console.log('preloaded item', cacheKey, ' - ', totalLoaded, ' / ', totalFiles)
    })
  }

  create () {
    console.log('LOADED')
    this.game.state.start('Gameplay')
  }

}

export default PreloadState
