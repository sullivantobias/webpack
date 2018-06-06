const path = require('path')

module.exports = {
  entry: "./src/index.js",
  watch: true,
  output: {
    path: path.resolve("./dist"),
    filename: "main.js"
  }
};
