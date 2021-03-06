const path=require("path");
const webpack=require("webpack");
// const autoprefixer= require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports =  {
      entry: ['./style.css',"./index.js"],
      output: {
          filename: '[name].js',/* .[contenthash] */
          path: path.resolve(__dirname, 'dist'),
          clean:true
      },
      mode:"production",
      module:{
        rules: [
          {
            test:"/\.js/",
            exclude: /node_modules/,
            // use: {
            //   loader: 'babel-loader',
            //   options: {
            //     presets: [
            //       ['@babel/preset-env'/* , { targets: "defaults" } */]
            //     ]
            //   }
            // }
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
                loader: 'css-loader', /* ?url=false  忽略url图片等*/
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
        ),
        {
          apply(compiler) {
            compiler.hooks.shouldEmit.tap('Remove styles from output', (compilation) => {
              delete compilation.assets['main.js'];  // Remove asset. Name of file depends of your entries and 
              return true;
            })
          }
        }
      ],
      optimization:{
        minimize:true, // terser
      }

}
  