const marked = require("marked")
// ./markdown-loader.js
module.exports = source => {
  // 加载到的模块内容 => '# About\n\nthis is a markdown file.'
  console.log(source)
  const html = marked(source);
  // 返回值就是最终被打包的内容
  return html
}
