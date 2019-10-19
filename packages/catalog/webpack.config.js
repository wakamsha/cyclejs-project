const path = require('path');
const argv = require('yargs').argv;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const mode = !!argv.develop ? 'development' : 'production';

module.exports = {
  mode,
  entry: {
    app: ['./src/scripts/index.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/assets/'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@cyclejs-project/config/variant': path.resolve(__dirname, `../config/src/scripts/variants/dev`),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'ts-loader'],
      },
    ],
  },
};
