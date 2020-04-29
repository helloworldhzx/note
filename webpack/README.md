# webpack

## 安装上手
```
npm init -y // 生成package.json文件
npm i webpack webpack-cli --save-dev
```
> P.S. webpack 是 Webpack 的核心模块，webpack-cli 是 Webpack 的 CLI 程序，用来在命令行中调用 Webpack。

安装完成之后，webpack-cli 所提供的 CLI 程序就会出现在 node_modules/.bin 目录当中，我们可以通过 npx 快速找到 CLI 并运行它，具体操作如下：  
```
npx webpack --version
4.43.0
```
> P.S. npx 是 npm 5.2 以后新增的一个命令，可以用来更方便的执行远程模块或者项目 node_modules 中的 CLI 程序。

直接运行 webpack 命令来打包 JS 模块代码
```
npx webpack
```

将webpack启动配置到package的scripts中
```
"scripts": {
    "build": "webpack"
  },
```
## devServer配置
用来自动化（自动编译，自动打开浏览器，自定刷新浏览器等）
特点： 只会在内存中编辑打包，不会有任何输出
启动devServer指令为： npx webpack-dedv-server
```
module.exports = {
  devServer: {
      contentBase: resolve(__dirname,'build'),
      compress： true // 启动gzip压缩
      port: 3000,
      open: true, //自动打开浏览器
  }
}
```

## 自定义配置webpack

之前打包使用的是webpack的默认配置，可以添加webpack.config.js文件自定义配置。  
webpack.config.js 是一个运行在 Node.js 环境中的 JS 文件，我们需要按照 CommonJS的方式编写代码  

指定打包入口和出口
```
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'output')
  }
}
```

#### 让配置文件支持智能提示

VSCode 对于代码的自动提示是根据成员的类型推断出来的，通过 import 的方式导入 Webpack 模块中的 Configuration类型，然后根据类型注释的方式将变量标注为这个类型，这样我们在编写这个对象的内部结构时就可以有正确的智能提示了
```
// ./webpack.config.js
import { Configuration } from 'webpack'

/**
 * @type {Configuration}
 */
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  }
}

module.exports = config

```
> P.S. 在编写配置时才需要，打包时需要注释掉，commonJs不支持import写法会报错。另外需要定义变量保存不能直接module.exports = {}，不然提示不生效

#### webpack工作模式
[mode](https://webpack.docschina.org/concepts/mode/) 配置选项，告知 webpack 使用相应环境的内置优化

|选项 | 描述|
|---  | --- |
development   | 启用 NamedChunksPlugin 和 NamedModulesPlugin
production    | 启用 FlagDependencyUsagePlugin,FlagIncludedChunksPlugin等插件
none          | 退出任何默认优化选项

配置mode的方式有两种：
 - webpack.config.js上配置mode属性
 - 通过CLI --mode=xxx 传入参数

### loader
webpack 只能理解 JavaScript 和 JSON 文件。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

#### 打包css样式资源
不配置loader直接使用css文件是打包报错的,需要配置css-loader
```
npm install css-loader --save-dev
```
```
module: {
    rules:[{
      test:/\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader
      use: "css-loader" // 指定具体的 loader
    }]
  }
```
在配置对象的 module 属性中添加一个 rules 数组。这个数组就是我们针对资源模块的加载规则配置，其中的每个规则对象都需要设置两个属性：
- test 属性，它是一个正则表达式，用来匹配打包过程中所遇到文件路径，这里我们是以 .css 结尾;
- use 属性，它用来指定匹配到的文件需要使用的 loader，这里用到的是 css-loader

只配置css-loader时只是把css转成js代码，内容是样式字符串，需要在 css-loader 的基础上再使用一个 style-loader，把 css-loader 转换后的结果通过 style 标签追加到页面上。
```
npm install style-loader --save-dev
```
```
module: {
    rules:[{
      test:/\.css$/,
      use: ["style-loader","css-loader"]
    }]
  }
```
> P.S 有多个loader时是从右到左执行，需要注意loader之间的顺序

#### 打包图片资源
```
npm install url-loader --save-dev

// webpack.config.js
module: {
    rules: [{
    // 处理不了HTML中img图片
    test: /\.(png|jpg|gif)$/i,
      use: [{
      // 需要下载url-loader、file-loader,url-loader依赖file-loader
        loader: 'url-loader',
        options: {
        // 图片大小小于8kb，就会被base64处理
        // 优点：减少请求次数（减轻服务器压力）
        // 缺点：图片体积会增大（文件请求速度更慢）
          limit: 8*1024,
          // 打包是根据esmodule还是commonjs进行打包
          esModule: false,
          // 文件重命名
          // [hash:10] 取hash前10位
          // [ext] 文件原来的后缀
          name: '[hash:10].[ext]',
          outputPath: 'img' // 打包到img文件夹下
        },
        }],
    }],
  }
```
当HTML中有img标签引入图片时，url-loader处理不了，需要html-loader
```
npm i html-loader --save-dev

// webpack.config.js
module: {
    rules: [{
      test: /\.(png|jpg|gif)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8*1024
        },
      }],
    },{
        test:/\.html$/,
        use:[{
            loader:'html-loader'
        }]
    }],
  }
```
> P.S. html-loader是将HTML导出为字符串，默认情况下，每个可加载属性（例如- <img src="image.png">）都将导入（const img = require('./image.png')或import img from "./image.png"")
将img里的图片通过模块引入，从而能被url-loader处理

#### 其他资源file-loader
#### css兼容性postcss-loader
```
 rules:[{
      test:/\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        // postcss-preset-env帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的兼容性
        {
            loader: "postcss-loader",
            options: {
                ident: "postcss",
                plugins: ()=>{
                    require("postcss-preset-env")()
                }
            }
        }
      ]
    }]
```

### 编写一个自己的markdown-loader
添加一个markdown-loader.js文件
```
// ./markdown-loader.js
module.exports = source => {
  // 加载到的模块内容 => '# About\n\nthis is a markdown file.'
  console.log(source)
  // 返回值就是最终被打包的内容
  return 'hello loader ~'
}
```
在webpack.config.js文件配置
```
module: {
    rules: [
      {
        test: /\.md$/,
        // 直接使用相对路径
        use: './markdown-loader'
      }
    ]
  }
```
现在打包会报错，因为 Webpack加载资源文件的过程类似于一个工作管道，你可以在这个过程中依次使用多个 Loader，但是最终这个管道结束过后的结果必须是一段标准的 JS 代码字符串。
![loader](/loader.png)

解决的办法
- 直接在这个 Loader 的最后返回一段 JS 代码字符串
- 再找一个合适的加载器，在后面接着处理我们这里得到的结果。
```
// ./markdown-loader.js
const marked = require('marked')

module.exports = source => {
  // 1. 将 markdown 转换为 html 字符串
  const html = marked(source)
  // 2. 将 html 字符串拼接为一段导出字符串的 JS 代码
  const code = `module.exports = ${JSON.stringify(html)}`
  return code 
  // code => 'export default "<h1>About</h1><p>this is a markdown file.</p>"'
}

```
多个loader，直接返回html，再由html-loader处理返回js代码
```
// ./markdown-loader.js
const marked = require('marked')

module.exports = source => {
  // 1. 将 markdown 转换为 html 字符串
  const html = marked(source)
  return html
}

// webpack-config.js 注意loader顺序
 module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'html-loader',
          './markdown-loader'
        ]
      }
    ]
  }
```

### 插件plugin
插件用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。 

几个插件最常见的应用场景：
- 实现自动在打包之前清除 dist 目录（上次的打包结果）；
- 自动生成应用所需要的 HTML 文件；
- 根据不同环境为代码注入类似 API 地址这种可能变化的部分；
- 拷贝不需要参与打包的资源文件到输出目录；
- 压缩 Webpack 打包完成后输出的文件；
- 自动发布打包结果到服务器实现自动部署。

#### 插件介绍和使用
##### clean-webpack-plugin用来自动清除输出目录的插件
```
npm install clean-webpack-plugin --save-dev

// ./webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  ...其他配置
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```
##### html-webpack-plugin用来生成html页面，自动引入打包后的js，css不需要手动修改
```
$ npm install html-webpack-plugin --save-dev
// ./webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  ...其他配置
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin()
  ]
}
```
当需要修改title名称或一些 meta 标签等少量东西可以往HtmlWebpackPlugin传入对象进行配置
```
new HtmlWebpackPlugin({
      title: 'zz',
      meta: {
        viewport: 'width=device-width'
      }
    })
打包实际输出为如下
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>zz</title>
  <meta name="viewport" content="width=device-width"></head>
  <body>
  <script src="bundle.js"></script></body>
</html>
```
若需要对 HTML 进行大量的自定义，可以使用HTML模板
```
// ./webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  ...其他配置
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'zz',
      template: './src/index.html' //HTML模板
    })
  ]
}
```
打包生成多个html文件,只需在创建一个HtmlWebpackPlugin对象
```
module.exports = {
  ...其他配置
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'zz',
      template: './index.html' //HTML模板
    }),
    new HtmlWebpackPlugin({
      filename:"zz.html",
      title: 'zz',
      template: './index.html' //HTML模板
    })
  ]
}
```
##### copy-webpack-plugin用于复制文件
```
$ npm install copy-webpack-plugin --save-dev
// ./webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      'public' // 需要拷贝的目录或者路径通配符
    ])
  ]
}
```

#### mini-css-extract-plugin打包单独的css文件
```
npm install --save-dev mini-css-extract-plugin

module: {
    rules:[{
      test:/\.css$/,
      use: [
        // 创建style标签，引入样式
        // "style-loader",
        // 取代style-lodaer, 将css生成单独的文件再引入
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    }]
  },
  plugins:[
    new MiniCssExtractPlugin()
  ]
```

### 编写一个自己的插件plugin  删除bundle里的/***/注释
Webpack 要求我们的插件必须是一个函数或者是一个包含 apply 方法的对象，一般我们都会定义一个类，在这个类中定义 apply 方法。然后在使用时，再通过这个类来创建一个实例对象去使用这个插件。
```
// ./remove-comments-plugin.js
class RemoveCommentsPlugin {
  apply (compiler) {
    console.log('RemoveCommentsPlugin 启动')
    // compiler => 包含了我们此次构建的所有配置信息
  }
}

```
通过 compiler 对象的 hooks 属性访问到 emit 钩子，再通过 tap 方法注册一个钩子函数，这个方法接收两个参数：
- 第一个是插件的名称，我们这里的插件名称是 RemoveCommentsPlugin；
- 第二个是要挂载到这个钩子上的函数；
```
// ./remove-comments-plugin.js
class RemoveCommentsPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        console.log(name) // 输出文件名称
      }
    })
  }
}
```
文件内容需要通过遍历的值对象中的 source 方法获取，修改内容之后需要暴露一个 source 方法用来返回新的内容。另外还需要再暴露一个 size 方法，用来返回内容大小，这是 Webpack 内部要求的格式，具体如下：
```
// ./remove-comments-plugin.js
class RemoveCommentsPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}
```