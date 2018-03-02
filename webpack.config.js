let path = require('path');
var fs = require('fs');
let webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');  
module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  //定义webpack输出的文件，我们在这里设置了
  //让打包后生成的文件放在dist文件夹下的build.js文件中
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      //转化ES6语法
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      //解析.vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      //样式文件 .css/.less 
      {
        test: /\.(less|css)$/,
        use:[ 'style-loader','css-loader','less-loader'],
      },
      //图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      //加载 字体文件
      {
        test: /\.(eot|woff|svg|ttf)$/,
        // loader: "file-loader"
        loader: 'url-loader?limit=1000000'
      }
    ]
  },
  plugins: [
    //     new webpack.NoEmitOnErrorsPlugin(),
    // new HtmlWebpackPlugin({  
    //     template: path.resolve(__dirname,"../Views/Shared"),  
    //     filename: "./_Layout.cshtml",  
    //     inject: false,  
    // }),
    new webpack.LoaderOptionsPlugin({
      options: {
        //这里用于安装babel，如果在根目录下的.babelrc配置了，这里就不写了
        babel: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-runtime']
        }
      }
    })
  ],
  resolve: {
    //  第一项空字符串必不可少，否则报模块错误
    // extensions: ['.js','.cshtml'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}