const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const router = new Router();
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
// redis
const { getRedis } = require('./redis/index')
// 数据库
const mongoose = require("mongoose")
// mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/projectAdmin");

mongoose.connection.on("open", function () {
  console.log("mongodb connection success!")
})
// 路由
const index = require('./routes/index');
const login = require('./routes/login');
const users = require('./routes/users');
const project = require('./routes/project');
// 文件上传
const upload = require('./routes/upload/index')

// error handler
onerror(app)

// middlewares
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  map: { html: 'ejs' }
}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
router.post('/post', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.response.body = ctx.request.body
});
app.use(router.routes());
// routes
// 文件上传
app.use(upload.routes(), upload.allowedMethods())
// 页面路径
app.use(index.routes(), index.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(project.routes(), project.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
