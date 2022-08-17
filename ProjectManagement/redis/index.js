const redis = require('redis')

//  创建连接  第一个参数是端口  第二个参数 主机
const redisCli = redis.createClient(6379, '127.0.0.1', {
  auth_pass: 123456,
})
// 监听
redisCli
  .on('connect', () => console.log('------ Redis connection succeed ------'))
  .on('ready', function (res) {
    console.log('ready');
  })
  .on('error', err => console.log('------ Redis connection failed ------' + err))

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