# webpack 参数配置文档
## mode
- mode配置选项,告知webpack使用相应环境的内置优化 
[官方文档地址](https://webpack.docschina.org/concepts/mode/)
- 配置方法
  - 在webpack.config.js
    ```js
    // 在webpack.config.js添加配置
    module.exports = {
      mode: 'production'
    };
    ``` 
  - 通过webpack 参数命令配置
    ``` javascript
    webpack --mode=development
    ```
## entry 
- entry 用来配置打包的入口文件
[官方文档地址](https://webpack.docschina.org/concepts/entry-points/)
- 配置入口文件
  - 单入口
    ```js
    // 1. 入口文件位置必须是绝对路径
    lett path = require('path')
    module.export = {
      // 字符串写法
      entry : path.resolve(__dirname,'./src/index.js')
      // 对象写法
      entry : { index : path.resolve(__dirname,'./src/index.js') }
    }
    ```
  - 多入口
    ```js
    // 1. 入口文件位置必须是绝对路径
    lett path = require('path')
    module.export = {
      entry : { 
        index : path.resolve(__dirname,'./src/index.js'),
        other : path.resolve(__dirname,'./src/other.js')
      }
    }
    ```
## output
- output 选项可以控制 webpack 如何向硬盘写入编译文件
[官方文档地址](https://webpack.docschina.org/concepts/output/)
- 配置出口文件
  - 单出口文件
    ```js
    let path = require('path')
    module.exports = {
      output : {
          // 打包后的文件名称
          filename : 'bundle.js',
          // 设置打包后文件的位置
          path : path.resolve(__dirname,'./src_dist'),
          // 当为上线环境时,给资源添加http访问路径 mode：production 
          publicPath : 'http://api.com/'
      }
    }
    ```
  - 多出口文件
    ```js
    let path = require('path');
    module.exports = {
      output : {
        // 使用占位符，确保每个文件具有唯一的名称 name表示entry定义的名字 hash哈希戳 :4 保留4位 contentHash文件内容生成的hash值
        //  hash contentHash 不能同时使用
        filename : '[name].[id].[hash:5].[contentHash:5].bundle.js',
      }
    }

    ```
## plugin配置
- 插件目的在于解决loader无法实现
[官方文档](https://webpack.docschina.org/concepts/plugins/)
- 配置插件
  ```js
  let HtmlWebpackPlugin = require('html-webpack-plugin')
  let CleanWebapkcPlugin = require('clean-webpack-plugin')
  module.exports = {
    plugins:[
      new CleanWebapkcPlugin({

      }),
      new HtmlWebpackPlugin(),
    ]
  }
  ```
- 常用插件
  - html-webpack-plugin
    - 根据配置参数生成html页面
    [官方地址](https://github.com/jantimon/html-webpack-plugin)
    - 使用
      ```js
      let HtmlWebpackPlugin = require('html-webpack-plugin')
      module.exports = {
        plugins:[
          new HtmlWebpackPlugin({
            // 资源后面动态添加hash戳，结局缓存问题
            hash : true,
            filename : 'index.html',
            title : 'My app',
            // 要将那些js代码添加到html页面中
            chunks : ['index', 'other'],
            // html模板地址
            template: path.resolve(__dirname,'./src/app.html'),
          })
        ]
      }
      ```
  - clean-webpack-plugin
    - 清空打包后的dist文件夹
    [官方地址](https://github.com/johnagan/clean-webpack-plugin)
    - 使用 
      ```js
      let CleanWebpackPlug = require('clean-webpack-plugin');
      module.exprots = {
        plugins : [
          new CleanWebpackPlug();
        ]
      }
      ```
## resolve配置
- 配置模块如何解析
[官网地址](https://webpack.docschina.org/configuration/resolve)
  - alias 创建import或require的别名,来确保模块引入变得更简单
    ```js
    let path = require('path')
    module.exports = {
      resolve : {
        // 路径别名
        alias : {
          '@' : path.resolve(__dirname,'./src/js')
        }
      } 
    }
    ```
  - extensions  自动解析确定的扩展
    ```
    module.exports = {
      resolve : {
        // 后缀名补齐
        extensions: ['.js','.jsx'],
      }
    }
    ```
## module  模块
  - 设置如何处理项目中的不同类型的模块。
