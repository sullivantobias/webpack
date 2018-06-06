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
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => [
                require("autoprefixer")({
                  browsers: ["last 2 versions", "ie > 8"]
                })
              ]
            }
          },
          "sass-loader"
        ]
      }
    ]
  }
};
