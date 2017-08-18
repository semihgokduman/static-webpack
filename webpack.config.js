module.exports = (env) => {

    const config = {
        entry: './src/js/app.js',
        output: {
            path: __dirname + '/dist',
            filename: `bundle${env.production ? '.min' : ''}.js`
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
        }
    }

    return config;
}