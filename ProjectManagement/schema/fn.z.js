const getAll = async function (sort = { 'id': -1 }) {
  return new Promise((resolev, reject) => {
    this.find({ isDelete: false })
      .sort(sort)
      .exec((err, doc) => {
        try {
          if (!err && doc) {
            resolev({ code: 200, msg: '数据请求成功', data: doc })
          } else {
            resolev({ code: 200, msg: err, data: doc })
          }
        } catch (e) {
          resolev({ code: 200, msg: e, data: '' })
        }
      })

  })
}

const getList = async function (option, handle) {
  let { filter, sort } = handle || {}
  filter = { ...filter, isDelete: false }
  sort = { ...sort, 'id': -1 }
  return new Promise((r) => {
    this.countDocuments(filter).exec((err, len) => {
      try {
        if (!err) {
          this.find(filter).skip((option.currentPage - 1) * option.pageSize)
            .limit(option.pageSize - 0)
            .sort(sort)
            .exec((err, doc) => {
              try {
                if (!err && doc) {
                  r({ status: 200, message: '数据请求成功', data: { list: doc, total: len } })
                } else {
                  r({ status: 203, message: err, data: doc })
                }
              } catch (e) {
                r({ status: 203, message: e, data: '' })
              }
            })
        } else {
          r({ status: 203, message: err, data: '' })
        }
      } catch (e) {
        r({ status: 203, message: e, data: '' })
      }

    })
  })
}

const getOne = async function (option) {
  return new Promise((resolev, reject) => {
    this.findOne({
      id: option.id
    })
      .exec((err, doc) => {
        try {
          if (!err && doc) {
            resolev({ code: 200, msg: '数据请求成功', data: doc })
          } else {
            resolev({ code: 200, msg: err, data: doc })
          }
        } catch (e) {
          resolev({ code: 200, msg: e, data: '' })
        }
      })
  })
}

const add = async function (option) {
  const len = await new Promise((r, reject) => {
    this.find({}).exec((err, doc) => {
      try {
        if (!err && doc) {
          r(doc.length)
        } else {
          r(-1)
        }
      } catch (e) {
        r(-1)
      }
    })
  })
  return new Promise((r, reject) => {
    if (len !== -1) {
      const obj = { ...option, ...{ id: len + 1 } }
      this.create(obj, (err, doc) => {
        try {
          if (!err && doc) {
            r({ status: 200, message: '添加成功', data: '' })
          } else {
            r({ status: 203, message: err, data: doc })
          }
        } catch (e) {
          r({ status: 203, message: e, data: '' })
        }
      })
    } else {
      r({ status: 203, message: '网络波动', data: '' })
    }
  })
}


const updateOne = async function (option) {
  return new Promise((resolev, reject) => {
    this.update({ id: option.id }, option).exec((err, doc) => {
      try {
        if (!err && doc) {
          resolev({ code: 200, msg: '更新成功', data: '' })
        } else {
          resolev({ code: 200, msg: err, data: '' })
        }
      } catch (e) {
        resolev({ code: 200, msg: e, data: '' })
      }
    })
  })
}


module.exports = {
  getAll: getAll,
  getList: getList,
  getOne: getOne,
  add: add,
  updateOne: updateOne
}