const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getAll, getList, getOne, addOne, updateOne } = require(__dirname + "/utils/base.request.fn.js");

let User = new Schema({
  id: { type: Number, required: true, unique: true },
  orgId: { type: Number, default: 0 },
  type: { type: Number, default: 0 },
  name: { type: String, required: true },
  avatar: { type: String },
  isDelete: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now },
})

User.statics = {
  getAll(option) {
    return getAll.call(this, option)
  },
  getList(option) {
    const _option = { name: '', type: '', current: 1, pageSize: 10, ...option }
    const { name, type } = _option
    const _name = new RegExp(name, 'i') //不区分大小写
    let filter = {
      $or: [ //多条件，数组
        { name: { $regex: _name } },
      ],
      isDelete: false,
      ...(type ? { type } : {})
    }
    return getList.call(this, option, { filter, sort: { 'id': -1 } })
  },
  addOne(option) {
    return addOne.call(this, option)
  },
  getOne(option) {
    return getOne.call(this, option)
  },
  updateOne(option) {
    return updateOne.call(this, option)
  }
}
let UserModel = mongoose.model('User', User);

module.exports = UserModel;