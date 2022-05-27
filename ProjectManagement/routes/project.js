const router = require('koa-router')()
const project = require('../schema/project')
router.prefix('/project')

router.get('/', async (ctx, next) => {
  await next()
  const data = await project.getList(ctx.query)
  ctx.body = data
})
router.get('/:id', async (ctx, next) => {
  await next()
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

module.exports = router
