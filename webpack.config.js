const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require ("clean-webpack-plugin");
const dev = process.env.NODE_ENV === "dev";
const prod = process.env.NODE_ENV === "prod";

let cssLoader = [
  {
    loader: "css-loader",
    options: { importLoaders: 1, minimize: prod }
  }
];

let config = {
  entry: {
    app: ["./css/app.scss", "./src/index.js"]
  },
  watch: dev,
  output: {
    path: path.resolve("./dist"),
    filename: dev ? "main.js" : "main.[chunkhash:8].js"
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
      filename: dev ? "[name].css" : "[name].[hash:8].css",
      disable: dev
    })
  ]
};

if (!dev) {
  config.plugins.push(new ManifestPlugin());
  config.plugins.push(
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve("./"),
      verbose: true,
      dry: false
    })
  );
}

module.exports = config;
