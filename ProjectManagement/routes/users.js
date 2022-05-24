const router = require('koa-router')()
const user = require('../schema/user')
router.prefix('/user')

router.get('/', async (ctx, next) => {
  await next()
  const data = await user.getList(ctx.query)
  ctx.body = data
})
router.post('/add', async (ctx, next) => {
  await next()
  const data = await user.add(ctx.request.body)
  ctx.body = data
})

module.exports = router
