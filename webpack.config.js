const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point for the app
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Output bundled file
    clean: true, // Clears dist folder before every build
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/, // Load CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i, // Asset files
        type: "asset/resource",
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
  devServer: {
    static: path.resolve(__dirname, "dist"),
    hot: true, // Enable hot reloading
    port: 8080, // Default development server port
    open: true, // Open browser automatically
  },
};
