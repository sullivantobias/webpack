const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const dev = process.env.NODE_ENV === "dev";
const prod = process.env.NODE_ENV === "prod";

let cssLoader = [
  {
    loader: "css-loader",
    options: { importLoaders: 1, minimize: prod}
  }
];

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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: cssLoader
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: "style-loader",
            use: [...cssLoader, "sass-loader"]
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: loader => [
                require("autoprefixer")({
                  browsers: ["last 2 versions", "ie > 8"]
                })
              ]
            }
          }
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: dev
    })
  ]
};
