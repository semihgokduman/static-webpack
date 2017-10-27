module.exports = (env) => {

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const WebpackMonitor = require('webpack-monitor');

    const getPluginArray = () => {

        const pages = ['index', 'observable'];
        const result = pages.map((page) => {
            return new HtmlWebpackPlugin({
                inject: false,
                sContent: 'hi',
                filename: `${page}.html`,
                template: `${__dirname}/${page}.html`
            });
        });


        result.push(
          new WebpackMonitor({
            capture: true,
            launch: true,
          })
        )

        return result

    }

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
        plugins: getPluginArray()
    }

    return config;
}
