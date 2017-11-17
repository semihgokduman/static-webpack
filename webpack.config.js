module.exports = (env) => {

    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const WebpackMonitor = require('webpack-monitor');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const CleanWebpackPlugin = require('clean-webpack-plugin');


    const extractSass = new ExtractTextPlugin({
        filename: 'assets/css/[name].[hash:8].css',
        disable: false,
        allChunks: true
    });

    const sContent = {
      'index' : 'this content comes from webpack config.',
      'observable' : 'this content comes from webpack config too.'
    }

    const getPluginArray = () => {

        const pages = ['index', 'observable'];
        const result = pages.map((page) => {
            return new HtmlWebpackPlugin({
                inject: false,
                sContent: sContent[page],
                filename: `${page}.html`,
                template: `${__dirname}/src/html/${page}.html`
            });
        });
        result.push(
          extractSass
        )

        result.push(
          new CleanWebpackPlugin(
            ['dist'],
            {
              root: __dirname,
              verbose: true,
              dry: false,
              watch: true,
              exclude: [ ],
              allowExternal: false
            }
          )
        )


        // result.push(
        //   new WebpackMonitor({
        //     capture: true,
        //     launch: true,
        //   })
        // )

        return result

    }

    const config = {
        entry: './src/js/app.js',
        output: {
            path: __dirname + '/dist',
            filename: `assets/js/bundle.[hash:8]${env.production ? '.min' : ''}.js`
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader?presets[]=es2015'
                  }, {
                    test: /\.scss$/i,
                    use: extractSass.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },{
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }]
                    })
                }, {
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
