const getAll = async function (sort = { 'id': -1 }) {
  return new Promise((r, reject) => {
    this.find({ isDelete: false })
      .sort(sort)
      .exec((err, doc) => {
        try {
          if (!err && doc) {
            r({ code: 200, msg: '数据请求成功', data: doc })
          } else {
            r({ code: 200, msg: err, data: doc })
          }
        } catch (e) {
          r({ code: 200, msg: e, data: '' })
        }
      })

  })
}

const getList = async function (option, handle) {
  const { currentPage, pageSize } = option
  let { filter, sort } = handle || {}
  filter = { ...filter, isDelete: false }
  sort = { 'id': -1, ...sort }
  return new Promise((r) => {
    this.countDocuments(filter).exec((err, len) => {
      try {
        if (!err) {
          this.find(filter).skip((currentPage - 1) * pageSize)
            .limit(pageSize - 0)
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

const getDetail = async function (option) {
  const { id } = option
  return new Promise((r, reject) => {
    this.findOne({
      id
    })
      .exec((err, doc) => {
        try {
          if (!err && doc) {
            r({ status: 200, msg: '数据请求成功', data: doc })
          } else {
            r({ status: 203, msg: err, data: doc })
          }
        } catch (e) {
          r({ status: 203, msg: e, data: '' })
        }
      })
  })
}

const addOne = async function (option) {
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
  const { id } = option
  return new Promise((r, reject) => {
    this.update({ id }, option).exec((err, doc) => {
      try {
        if (!err && doc) {
          r({ status: 200, msg: '更新成功', data: doc })
        } else {
          r({ status: 203, msg: err, data: '' })
        }
      } catch (e) {
        r({ status: 203, msg: e, data: '' })
      }
    })
  })
}

const deleteOne = async function (option) {
  const { id } = option
  return new Promise((r, reject) => {
    this.update({ id }, { isDelete: true }).exec((err, doc) => {
      try {
        if (!err && doc) {
          r({ status: 200, msg: '更新成功', data: doc })
        } else {
          r({ status: 203, msg: err, data: '' })
        }
      } catch (e) {
        r({ status: 203, msg: e, data: '' })
      }
    })
  })
}


module.exports = {
  getAll,
  getList,
  getDetail,
  addOne,
  updateOne,
  deleteOne
}