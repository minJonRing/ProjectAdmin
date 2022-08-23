const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getList, getDetail, addOne, updateOne, deleteOne } = require("./fn");

let article = new Schema({
  id: { type: Number, required: true, index: true },
  cover: [Object],
  title: { type: String, required: true },
  type: [Number],
  cont: { type: String, required: true },
  isDelete: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now }
})

article.statics = {
  getList(option) {
    const _option = { title: '', ...option }
    const { title } = _option
    const _title = new RegExp(title, 'i') //不区分大小写
    let filter = {
      $or: [ //多条件，数组
        { title: { $regex: _title } },
      ],
    }
    return getList.call(this, _option, { filter })
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
      title,
      type,
      cont,
      avatar,
    } = option
    const _option = {
      id,
      title,
      type,
      cont,
      avatar,
    }
    return updateOne.call(this, _option)
  },
  deleteOne(option) {
    return deleteOne.call(this, option)
  },
}


let articleModel = mongoose.model('Article', article);

module.exports = articleModel;