import playerImg from 'assets/images/player.png'
import reporterImg from 'assets/images/reporter.png'
import shadowImg from 'assets/images/shadow.png'
import gameBgImg from 'assets/images/game-bg.png'

export const ASSETS = {
  // key, path
  images: [
    ['player', playerImg],
    ['reporter', reporterImg],
    ['shadow', shadowImg],
    ['game-bg', gameBgImg],
  ],
}

export function loadAssets (game, onFileLoaded) {
  game.load.onFileComplete.add(onFileLoaded, this)

  ASSETS.images.forEach(item => {
    game.load.image(item[0], item[1])
  })
}
