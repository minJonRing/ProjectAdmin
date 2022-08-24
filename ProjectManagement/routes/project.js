const router = require('koa-router')()
const project = require('../schema/project/index')
const projectItem = require('../schema/project/item')
const question = require('../schema/project/question')

router.prefix('/api/project')

// 项目
router.get('/', async (ctx, next) => {
  await next()
  const data = await project.getList(ctx.query)
  ctx.body = data
})
router.get('/:id', async (ctx, next) => {
  await next()
  console.log(1)
  const data = await project.getDetail(ctx.params)
  ctx.body = data
})
router.post('/', async (ctx, next) => {
  await next()
  const data = await project.addOne(ctx.request.body)
  ctx.body = data
})
router.put('/:id', async (ctx, next) => {
  await next()
  const data = await project.updateOne(ctx.request.body)
  ctx.body = data
})
router.delete('/:id', async (ctx, next) => {
  await next()
  const data = await project.deleteOne(ctx.params)
  ctx.body = data
})

// 项目-小项
router.get('/item', async (ctx, next) => {
  await next()
  const data = await projectItem.getList(ctx.query)
  ctx.body = data
})
router.get('/item/:id', async (ctx, next) => {
  await next()
  const data = await projectItem.getDetail(ctx.params)
  ctx.body = data
})
router.post('/item', async (ctx, next) => {
  await next()
  const data = await projectItem.addOne(ctx.request.body)
  ctx.body = data
})
router.put('/item/:id', async (ctx, next) => {
  await next()
  const data = await projectItem.updateOne(ctx.request.body)
  ctx.body = data
})
router.delete('/item/:id', async (ctx, next) => {
  await next()
  const data = await projectItem.deleteOne(ctx.params)
  ctx.body = data
})


// 项目-问题
router.get('/question/path', async (ctx, next) => {
  await next()
  const data = await question.getList(ctx.query)
  ctx.body = data
})
router.get('/question/path/:id', async (ctx, next) => {
  await next()
  const data = await question.getDetail(ctx.params)
  ctx.body = data
})
router.post('/question/path', async (ctx, next) => {
  await next()
  const data = await question.addOne(ctx.request.body)
  ctx.body = data
})
router.put('/question/path/:id', async (ctx, next) => {
  await next()
  const data = await question.updateOne(ctx.request.body)
  ctx.body = data
})
router.delete('/question/path/:id', async (ctx, next) => {
  await next()
  const data = await question.deleteOne(ctx.params)
  ctx.body = data
})
module.exports = router
