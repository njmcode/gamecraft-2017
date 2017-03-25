import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    root: path.resolve('./app'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
}

export default webpackConfig
