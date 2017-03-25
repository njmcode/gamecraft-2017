
import playerImg from 'assets/images/player.png'
import gameBgImg from 'assets/images/game-bg.png'

export const ASSETS = {
  // key, path
  images: [
    ['player', playerImg],
    ['game-bg', gameBgImg],
  ],
}

export function loadAssets (game, onFileLoaded) {
  game.load.onFileComplete.add(onFileLoaded, this)

  ASSETS.images.forEach(item => {
    game.load.image(item[0], item[1])
  })
}
