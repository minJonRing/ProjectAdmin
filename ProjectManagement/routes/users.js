const router = require('koa-router')()
const user = require('../schema/user')
router.prefix('/user')

router.get('/', async (ctx, next) => {
  await next()
  const data = await user.getList(ctx.query)
  ctx.body = data
})
router.get('/:id', async (ctx, next) => {
  await next()
  const data = await user.getDetail(ctx.params)
  ctx.body = data
})
router.post('/', async (ctx, next) => {
  await next()
  const data = await user.addOne(ctx.request.body)
  ctx.body = data
})
router.put('/:id', async (ctx, next) => {
  await next()
  const data = await user.updateOne(ctx.request.body)
  ctx.body = data
})
router.delete('/:id', async (ctx, next) => {
  await next()
  const data = await user.deleteOne(ctx.params)
  ctx.body = data
})

module.exports = router
