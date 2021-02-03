const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: ["./src/index.tsx"],
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        global: path.resolve(__dirname, "src/global/"),
        page: path.resolve(__dirname, "src/page/"),
        label: path.resolve(__dirname, "src/label/"),
        memo: path.resolve(__dirname, "src/memo/"),
      },
    },
    output: {
      path: path.join(__dirname, "/build"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
    ],
    devServer: {
      historyApiFallback: true,
      disableHostCheck: true,
      port: 3030,
      host: "0.0.0.0",
    },
  };
};
