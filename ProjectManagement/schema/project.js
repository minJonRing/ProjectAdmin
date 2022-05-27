const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./user')
const { getList, getDetail, addOne, updateOne, deleteOne } = require("./fn");

let project = new Schema({
  id: { type: Number, required: true, index: true },
  name: { type: String, required: true },
  developTime: [String],
  avatar: [Object],
  fileList: [Object],
  personnel: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isDelete: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now }
})

project.statics = {
  getList(option) {
    const _option = { name: '', ...option }
    const { name } = _option
    const _name = new RegExp(name, 'i') //不区分大小写
    let filter = {
      $or: [ //多条件，数组
        { name: { $regex: _name } },
      ],
    }
    return getList.call(this, _option, { filter })
  },
  getDetail(option) {
    const { id } = option
    return new Promise((r, reject) => {
      this.findOne({
        id
      }).populate('personnel').exec((err, doc) => {
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
  },
  addOne(option) {
    return addOne.call(this, option)
  },
  updateOne(option) {
    const {
      id,
      name,
      avatar,
      fileList,
      personnel
    } = option
    const _option = {
      id,
      name,
      avatar,
      fileList,
      personnel
    }
    return updateOne.call(this, _option)
  },
  deleteOne(option) {
    return deleteOne.call(this, option)
  },
}


let ProjectModel = mongoose.model('Project', project);

module.exports = ProjectModel;