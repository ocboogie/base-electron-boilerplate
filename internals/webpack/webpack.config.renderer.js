/**
 * Build config for development electron renderer process that uses
 * Hot-Module-Replacement
 *
 * https://webpack.js.org/concepts/hot-module-replacement/
 */

import * as path from 'path';
import { spawn } from 'child_process';

import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import AutoDllPlugin from 'autodll-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import { dependencies } from '../../package.json';

import baseConfig from './webpack.config.base';

const port = process.env.PORT || 1212;

const home = process.cwd();

export default merge.smart(baseConfig, {
  devtool: 'inline-source-map',

  target: 'electron-renderer',

  externals: ['electron-devtools-installer'],

  entry: path.join(home, 'app/renderer/index.js'),

  output: {
    filename: 'renderer.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      // For importing css into the html
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // For importing css into object. Used four components
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  },

  plugins: [
    // Using CopyWebpackPlugin instead due to this issue https://github.com/jantimon/html-webpack-plugin/issues/672
    // new HtmlWebpackPlugin({
    //     inject: true,
    //     template: path.join(home, 'app/app.html')
    // }),

    new CopyWebpackPlugin([
      { from: path.join(home, 'app/app.html'), to: 'index.html' },
      { from: path.join(home, 'app/package.json') },
      { from: path.join(home, 'app/node_modules'), to: 'node_modules' }
    ]),

    new AutoDllPlugin({
      debug: true,
      inject: true,
      filename: '[name].js',
      entry: {
        vendor: Object.keys(dependencies)
      }
    }),

    /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         *
         * By default, use 'development' as NODE_ENV. This can be overriden with
         * 'staging', for example, by changing the ENV variables in the npm scripts
         */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],

  devServer: {
    port,
    compress: true,
    stats: 'errors-only',
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    setup() {
      if (process.env.START_HOT === 'true') {
        console.log('Staring Main Process...');
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
    }
  }
});
