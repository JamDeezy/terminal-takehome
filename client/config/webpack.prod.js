const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",

  entry: {
    main: "./index.jsx"
  },

  resolve: {
    extensions: [".js", ".json", ".jsx"]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: { comments: false },
      compress: { warnings: false }
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, "../../public/assets"),
    filename: "[name].js",
    sourceMapFilename: "[name].map"
  }
};
