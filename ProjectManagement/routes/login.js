const router = require('koa-router')()
const user = require('../schema/user')
// const {
//   setRedis
// } = require('../redis/index')
const jwt = require("jsonwebtoken")
const secret = "admin"


router.post('/api/login', async (ctx, next) => {
  await next()
  const {
    username,
    password
  } = ctx.request.body;
  const data = await new Promise((r, reject) => {
    user.findOne({
      username,
      password
    }).exec((err, doc) => {
      try {
        if (!err && doc) {
          const {
            id
          } = doc;
          const token = jwt.sign({
            id
          }, secret, {
            expiresIn: "12h"
          })
          // setRedis(token)
          r({
            status: 200,
            msg: '数据请求成功',
            data: {
              token
            }
          })
        } else {
          r({
            status: 203,
            msg: '账号或密码不正确',
            data: null
          })
        }
      } catch (e) {
        r({
          status: 203,
          msg: e,
          data: ''
        })
      }
    })
  })
  ctx.body = data
})


router.get('/api/userinfo', async (ctx, next) => {
  const {
    authorization
  } = ctx.request.header;
  let id
  try {
    const data = jwt.verify(authorization.replace('Bearer ', ''), 'admin')
    id = data ? data.id : null
  } catch (error) {
    ctx.body = {
      status: 201,
      msg: '获取用户信息出错',
      data: error
    }
  }
  console.log(id)
  const data = await new Promise((r, reject) => {
    user.findOne({
      id
    }).exec((err, doc) => {
      try {
        if (!err && doc) {
          const {
            avatar,
            createTime,
            id,
            name,
            type,
            username,
          } = doc
          r({
            status: 200,
            msg: '数据请求成功',
            data: {
              avatar,
              createTime,
              id,
              name,
              type,
              username
            }
          })
        } else {
          r({
            status: 203,
            msg: '获取用户信息出错',
            data: null
          })
        }
      } catch (e) {
        r({
          status: 203,
          msg: e,
          data: ''
        })
      }
    })
  })
  ctx.body = data
})
module.exports = router