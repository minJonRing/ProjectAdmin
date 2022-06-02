const redis = require('redis')


//  创建连接  第一个参数是端口  第二个参数 主机
const redisCli = redis.createClient()
// 监听 error
redisCli.on('error', err => {
  console.error(err)
})

// 设置 redis
function setRedis(key) {
  redisCli.set(key, key)
}


// 获取
function getRedis(key) {
  return new Promise((r) => {
    redisCli.get(key, (err, val) => {
      if (err) {
        r(null)
        return
      }
      r(val)
    })
  })
}



module.exports = {
  setRedis,
  getRedis
}