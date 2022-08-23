const router = require('koa-router')()
const article = require('../schema/article')
router.prefix('/article')

router.get('/', async (ctx, next) => {
  await next()
  const data = await article.getList(ctx.query)
  ctx.body = data
})
router.get('/:id', async (ctx, next) => {
  await next()
  const data = await article.getDetail(ctx.params)
  ctx.body = data
})
router.post('/', async (ctx, next) => {
  await next()
  const data = await article.addOne(ctx.request.body)
  ctx.body = data
})
router.put('/:id', async (ctx, next) => {
  await next()
  const data = await article.updateOne(ctx.request.body)
  ctx.body = data
})
router.delete('/:id', async (ctx, next) => {
  await next()
  const data = await article.deleteOne(ctx.params)
  ctx.body = data
})

module.exports = router
