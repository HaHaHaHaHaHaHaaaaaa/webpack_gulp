const path=require("path");
const webpack=require("webpack");
// const autoprefixer= require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports =  {
      entry: ['./style.css',"./index.js"],
      output: {
          filename: '[name].[contenthash].js',
          path: path.resolve(__dirname, 'dist'),
          clean:true
      },
      mode:"production",
      module:{
        rules: [
          {
            test:"/\.js/",
            use:[

            ]
          },
          {
            test: /\.css$/,
            use: [
              // // 提取css到文件
              // {
              //   loader: "file-loader",
              //   options: {
              //       name: "[name].[ext]",
              //   },
              // },
              // "extract-loader",
              // "css-loader",

              // [style-loader](/loaders/style-loader)
              // { loader: process.env.NODE_ENV=="production" ? MiniCssExtractPlugin.loader : 'style-loader' },
              { loader:MiniCssExtractPlugin.loader  },

              
              // [css-loader](/loaders/css-loader)
              {
                loader: 'css-loader',
              },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "postcss-preset-env",
                        {
                          // 其他选项
                        },
                       
                      ],
                      "autoprefixer"
                    ],
                  },
                },
              },
              // [sass-loader](/loaders/sass-loader)
              { loader: 'sass-loader' }
            ]
          }
        ],
      },
      plugins: [
        new MiniCssExtractPlugin(
          {
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
          }
      )],

}
  