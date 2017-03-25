import playerImg from 'assets/images/player.png'
import playerPointImg from 'assets/images/player-point.png'
import reporterImg from 'assets/images/reporter.png'
import reporterEnemy1Img from 'assets/images/reporter-enemy.png'
import reporterEnemy2Img from 'assets/images/reporter-enemy-2.png'
import reporterEnemy3Img from 'assets/images/reporter-enemy-3.png'
import reporterEnemy4Img from 'assets/images/reporter-enemy-4.png'
import gameBgImg from 'assets/images/game-bg.png'

export const ASSETS = {
  // key, path
  images: [
    ['player', playerImg],
    ['player-point', playerPointImg],
    ['reporter', reporterImg],
    ['reporter-enemy-1', reporterEnemy1Img],
    ['reporter-enemy-2', reporterEnemy2Img],
    ['reporter-enemy-3', reporterEnemy3Img],
    ['reporter-enemy-4', reporterEnemy4Img],
    ['game-bg', gameBgImg],
  ],
}

export function loadAssets (game, onFileLoaded) {
  game.load.onFileComplete.add(onFileLoaded, this)

  ASSETS.images.forEach(item => {
    game.load.image(item[0], item[1])
  })
}
