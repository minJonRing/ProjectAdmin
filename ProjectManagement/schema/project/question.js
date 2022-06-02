const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getList, getDetail, addOne, updateOne, deleteOne } = require("../fn");

let question = new Schema({
  id: { type: Number, required: true, index: true },
  itemId: { type: Number, required: true, default: 0 },
  projectId: { type: Number, required: true, default: 0 },
  name: { type: String, required: true },
  describe: { type: String, required: true },
  treat: { type: String },
  fileList: [Object],
  propose: { type: Schema.Types.ObjectId, ref: 'User' },
  solve: { type: Schema.Types.ObjectId, ref: 'User' },
  confirm: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: Number, default: 0 },
  isDelete: { type: Boolean, default: false },
  proposeTime: { type: Date, default: Date.now },
  solveTime: { type: Date, default: Date.now },
  confirmTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})

question.statics = {
  getList(option) {
    const _option = { projectId: '', name: '', ...option }
    const { name, projectId } = _option
    const _name = new RegExp(name, 'i') //不区分大小写
    const filter = {
      $or: [ //多条件，数组
        { name: { $regex: _name } },
      ],
      projectId
    }
    // return getList.call(this, _option, { filter })
    return new Promise((r) => {
      this.find(filter).populate([{ path: 'propose' }, { path: 'solve' }, { path: 'confirm' }])
        .sort({ 'id': 1 })
        .exec((err, doc) => {
          try {
            if (!err && doc) {
              r({ status: 200, message: '数据请求成功', data: { list: doc } })
            } else {
              r({ status: 203, message: err, data: doc })
            }
          } catch (e) {
            r({ status: 203, message: e, data: '' })
          }
        })
    })
  },
  getDetail(option) {
    return getDetail.call(this, option)
  },
  addOne(option) {
    return addOne.call(this, option)
  },
  updateOne(option) {
    const {
      id,
      name,
      describe,
      treat,
      fileList,
      status
    } = option
    const personnel = ['propose', 'solve', 'confirm'][status]
    const _option = {
      id,
      name,
      describe,
      treat,
      fileList,
      [personnel]: option[personnel]
    }
    return updateOne.call(this, _option)
  },
  deleteOne(option) {
    return deleteOne.call(this, option)
  },
}


let QuestionModel = mongoose.model('Question', question);

module.exports = QuestionModel;