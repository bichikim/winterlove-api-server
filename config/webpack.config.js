/* global module __dirname*/
module.exports = {
    node: {
        __dirname: true
    },
    entry: './src/client/index.js',
    output: {
        // eslint-disable-next-line no-path-concat
        path: `${__dirname}/../public/`,
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                // Creates style nodes from JS strings
                loader: 'style-loader'
            }, {
                // Translates CSS into CommonJS
                loader: 'css-loader'
            }, {
                // Compiles Sass to CSS
                loader: 'sass-loader'
            }]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
            /* Since sass-loader (weirdly) has SCSS as its default parse mode, we map
               the "scss" and "sass" values for the lang attribute to the right configs here.
               other preprocessors should work out of the box, no loader config like this necessary.
            */
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
                // Other vue-loader options go here
            }
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
    // Watch: true,
    // Devtool: 'source-map',
}

