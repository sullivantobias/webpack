const path = require("path");

module.exports = {
  entry: "./src/index.js",
  watch: true,
  output: {
    path: path.resolve("./dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"]
      }
    ]
  }
};
