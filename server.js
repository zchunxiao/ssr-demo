//server.js
const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()

const koa = new Koa()
koa.use(router.routes())

const Vue = require('Vue')     //导入Vue，用于创建Vue实例
const renderer = require('vue-server-renderer').createRenderer()  //创建一个 renderer 实例
const app = new Vue({          //创建Vue实例
  template: `<div>{{msg}}</div>`,
  data() {
    return {
      msg: 'This is renderred by vue-server-renderer'
    }
  }
})



router.get('/', (ctx) => {
  //要返回给客户端的html
  // ctx.body = `<!DOCTYPE html>
  // <html lang="en">
  //   <head><title>Vue SSR</title></head>
  //   <body>
  //     <div>This is a server render page</div>
  //   </body>
  // </html>`
  renderer.renderToString(app, (err, html) => {   //渲染得到的字符串作为回调函数的第二个参数传入
    //将渲染得到的字符串拼接到要返回的结果中
    ctx.body = `<!DOCTYPE html>
    <html lang="en">
      <head><title>Vue SSR</title></head>
      <body>
        ${html}   
      </body>
    </html>`
  })


})

koa.listen(9000, () => {
  console.log('server is listening in 9000');
})
