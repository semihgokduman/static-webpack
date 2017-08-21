module.exports = (env) => {

    const HtmlWebpackPlugin = require('html-webpack-plugin');

    const config = {
        entry: './src/js/app.js',
        output: {
            path: __dirname + '/dist',
            filename: `bundle.[hash:8]${env.production ? '.min' : ''}.js`
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader?presets[]=es2015'
                },
                {
                    test: /\.css$/,
                    loaders: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(svg|gif|png|ico|jpg|eot|woff|ttf)$/,
                    loaders: [
                        'url-loader'
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                sContent: 'hi',
                filename: '**.html',
                template: __dirname + '**.html',
            })
        ]
    }

    return config;
}