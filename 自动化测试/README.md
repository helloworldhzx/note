# jest

## 配置jest.config.js文件
`npx jest --init`

## 不支持es6语法，babel转译代码
`npm isntall @babel/core@7.4.5 @babel/present-env@7.4.5 -D`

## 测试文档修改时自动重启测试
```
package文件配置
"scripts": {
    "test": "jest --watchAll"
  }
也可以直接命令行 npx jest --watchAll
```

## 匹配器
- toBe
- toEqual