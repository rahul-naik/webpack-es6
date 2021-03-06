const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin

module.exports = {
  entry: __dirname + "/src/app/index.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  module: {  // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /node_modules/,
        use:'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [  // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: __dirname + "/src/public/index.html",
      inject: 'body'
    })
  ],
  devServer: {  // configuration for webpack-dev-server
    contentBase: './src/public',  //source of static assets
    port: 7700, // port to run dev-server
  }
};