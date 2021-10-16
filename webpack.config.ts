import { join } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { ESBuildPlugin, ESBuildMinifyPlugin } from "esbuild-loader";
import {
  Configuration,
  HotModuleReplacementPlugin,
  ProvidePlugin,
} from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import WindiCSS from "windicss-webpack-plugin";

const config: Configuration = {
  context: __dirname,
  entry: join(__dirname, "src/main.tsx"),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: { src: join(__dirname, "src") },
  },
  output: {
    publicPath: "/",
    path: join(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
  },
  devServer: {
    historyApiFallback: true,
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "esnext",
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  "primary-color": "#0c6ff9",
                  "menu-bg": "#0c6ff9",
                  "layout-sider-background": "#0c6ff9",
                  "menu-item-color": "#fff",
                  "layout-trigger-background": "#0c6ff9",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WindiCSS(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      inject: true,
      template: join(__dirname, "index.html"),
      favicon: join(__dirname, "src/assets/favicon.ico"),
    }),
    new HotModuleReplacementPlugin(),
    new ESBuildPlugin(),
    new ProvidePlugin({
      React: "react",
    }),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["**/*"] }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new ESBuildMinifyPlugin({ target: "esnext" })],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default config;
