const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".png"],
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/audio/", // Путь для сохранения файлов MP3
        },
      },
    ],
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      inject: "body",
    }),
  ],
};
