const { resolve } = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [resolve(__dirname, 'src/main.js')],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve(__dirname, 'src'),
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 5000,
    hot: true,
    open: true,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4567/streams',
        secure: false,
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebPackPlugin({ template: `${resolve(__dirname, 'src/index.html')}` }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
  ],
};
