/**
 * Webpack config for development electron main process
 */

import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import baseConfig from './webpack.config.base';

export default merge.smart(baseConfig, {
    devtool: 'source-map',

    target: 'electron-main',

    entry: './app/main/index',

    output: {
        filename: 'main.js'
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        })
    ]
});
