import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

const webpackConfig = {
  entry: {
    index: './src/index.js',
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:8080/',
  },
  resolve: {
    root: path.resolve('./src'),
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    },
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /pixi\.js/,
        loader: 'expose-loader?PIXI',
      },
      {
        test: /phaser-split\.js$/,
        loader: 'expose-loader?Phaser',
      },
      {
        test: /p2\.js/,
        loader: 'expose-loader?p2',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'/* chunkName= */,
      filename: 'vendor.bundle.js', /* filename= */
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
}

export default webpackConfig
