const path = require("path");

module.exports = {
  mode: "development", // Ensure the mode is set here
  entry: "./src/index.js", // Entry point for our app
  output: {
    filename: "bundle.js", // Output file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Transpile JavaScript to ES5
          },
        },
      },
      {
        test: /\.css$/, // Add a rule for handling CSS
        use: ["style-loader", "css-loader"], // Process CSS files
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"), // Serve files from 'dist'
    compress: true,
    port: 9000, // Port number for Webpack Dev Server
    open: true, // Open browser automatically
    hot: true, // Enable Hot Module Replacement
  },
};
