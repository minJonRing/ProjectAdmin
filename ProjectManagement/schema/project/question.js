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
  propose: { type: Schema.Types.ObjectId, ref: 'User' },
  solve: { type: Schema.Types.ObjectId, ref: 'User' },
  confirm: { type: Schema.Types.ObjectId, ref: 'User' },
  isDelete: { type: Boolean, default: false },
  proposeTime: { type: Date, default: Date.now },
  solveTime: { type: Date, default: Date.now },
  confirmTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})

question.statics = {
  getList(option) {
    const _option = { projectId: '', ...option }
    const { projectId } = _option
    let filter = {
      projectId
    }
    return getList.call(this, _option, { filter })
  },
  getDetail(option) {
    const { id } = option
    return new Promise((r) => {
      this.find({ projectId: id }).populate('personnel')
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
  addOne(option) {
    return addOne.call(this, option)
  },
  updateOne(option) {
    const {
      id,
      name,
      describe,
      propose,
      solve,
      confirm,
    } = option
    const _option = {
      id,
      name,
      describe,
      propose,
      solve,
      confirm,
    }
    return updateOne.call(this, _option)
  },
  deleteOne(option) {
    return deleteOne.call(this, option)
  },
}


let QuestionModel = mongoose.model('Question', question);

module.exports = QuestionModel;