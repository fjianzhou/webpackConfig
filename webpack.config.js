let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  mode:'production', // deveploment production none 
  entry:{
    index1 : path.resolve(__dirname,'./src/index.js'),
    other : path.resolve(__dirname,'./src/other.js')
  },
  output: {
    filename : '[name].[id].[hash:5].bundle.js',
    path : path.resolve(__dirname,'./src_dist'),
    publicPath: 'www.baidu.com'
  },
  resolve : {
    // 后缀名补齐
    extensions: ['.js','.jsx'],
    // 路径别名配置
    alias: {
      '@': path.resolve(__dirname, './src/js')
    }
  },
  devServer:{
    // 启用gzip压缩
    compress: true,
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash : true,
      title : 'My app',
      filename : 'my-index.html',
      template: path.resolve(__dirname,'./src/app.html'),
      chunks: ['other']
    }),
  ]
}
