/**
 * Webpack config for production electron main process
 */

import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

import baseConfig from './webpack.config.base';

/**
 * Disclaimer! Not yet tested
 */
export default merge.smart(baseConfig, {
    devtool: 'source-map',

    target: 'electron-main',

    entry: './app/main/index',

    output: {
        filename: 'main.js'
    },

    plugins: [
        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true
        }),

        /**
         * Create global constants which can be configured at compile time.
         *
         * Useful for allowing different behaviour between development builds and
         * release builds
         *
         * NODE_ENV should be production so that modules do not perform certain
         * development checks
         */
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG_PROD: 'false'
        })
    ]
});
