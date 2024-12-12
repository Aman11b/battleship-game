const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point for the app
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Output bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // HTML template
    }),
  ],
  mode: "development", // Set mode to development for debugging
  devtool: "source-map", // For better error debugging
};
