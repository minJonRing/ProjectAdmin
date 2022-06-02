const router = require('koa-router')()
const user = require('../schema/user')
const { setRedis } = require('../redis/index')

router.post('/login', async (ctx, next) => {
  await next()
  const { username, password } = ctx.request.body;
  console.log(ctx.request.body)
  const data = new Promise((r) => {
    user.findOne({ username, password }).exec((err, doc) => {
      try {
        if (!err && doc) {
          console.log(doc)
          const { _id } = doc
          setRedis(_id)
          r({ status: 200, msg: '数据请求成功', data: doc })
        } else {
          r({ status: 203, msg: err, data: doc })
        }
      } catch (e) {
        r({ status: 203, msg: e, data: '' })
      }
    })
  })
  ctx.body = data
})

module.exports = router
