/**
 * Build config for production electron renderer 
 * Not yet tested
 */

import * as path from 'path';
import { spawn, execSync } from 'child_process';

import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import AutoDllPlugin from 'autodll-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import baseConfig from './webpack.config.base';
import { dependencies } from '../package.json';

const port = process.env.PORT || 1212;

const home = process.cwd();

/**
 * Disclaimer! Not yet tested
 */
export default merge.smart(baseConfig, {
    devtool: 'inline-source-map',

    target: 'electron-renderer',

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
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
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
                        mimetype: 'application/font-woff',
                    }
                },
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
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
                use: 'file-loader',
            },
            // SVG Font
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml',
                    }
                }
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: 'url-loader',
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),

        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true
        }),

        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(home, 'app/app.html'),
        })
    ]
});