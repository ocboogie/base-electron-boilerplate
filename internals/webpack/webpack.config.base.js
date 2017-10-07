/**
 * Base webpack config used across other specific configs
 */
import path from 'path';

import webpack from 'webpack';

export default {
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
            }
        ]
    },

    output: {
        path: path.join(process.cwd(), 'dist'),
        // https://github.com/webpack/webpack/issues/1114
        libraryTarget: 'commonjs2'
    },

    /**
     * Determine the array of extensions that should be used to resolve modules.
     */
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },

    /**
     * Disables webpack processing of __dirname and __filename.
     * If you run the bundle in node.js it falls back to these values of node.js.
     * https://github.com/webpack/webpack/issues/2010
     */
    node: {
        __dirname: false,
        __filename: false
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        }),

        new webpack.NoEmitOnErrorsPlugin()
    ]
};
