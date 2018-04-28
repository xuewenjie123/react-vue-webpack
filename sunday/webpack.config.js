

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    // devtool: 'eval-source-map',
    //source-map 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度；
    //cheap-module-source-map 在一个单独的文件中生成一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
    //eval-source-map 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
    //cheap-module-eval-source-map 这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；
    entry:  __dirname + "/app/main.jsx",//已多次提及的唯一入口文件
    output: {
      path: __dirname + "/build",//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    },  
     resolve: {
            extensions: [ '.js', '.jsx'],
        },
    devServer: {
      //contentBase: "./build",//本地服务器所加载的页面所在的目录
      //contentBase默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）
      //port 设置默认监听端口，如果省略，默认为”8080“
      historyApiFallback: true,//不跳转
      inline: true,//实时刷新
      hot:true
    },
    module:{
      rules:[
        {
          test:/(\.jsx|\.js)$/,
          use:{
            loader:"babel-loader"
          },
          exclude: /node_modules/
        },
        {
          test:/\.css$/,
          use:[
                {
                  loader:"style-loader"
                },
                {
                  loader:"css-loader",options: {modules: true}
                },
                {
                  loader: "postcss-loader",options: {
                    plugins: function() {
                      return [require('autoprefixer')]
                    }
                  }
               }
             ]
        },
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
      ]
    },
    plugins: [
      new webpack.BannerPlugin('文杰'),
      new HtmlWebpackPlugin({
        template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
       }),
       new webpack.HotModuleReplacementPlugin(), //热加载插件

       new ExtractTextPlugin("style.css")//分离CSS和JS文件
     ]
  }

