const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getList, getDetail, addOne, updateOne, deleteOne } = require("./fn");

let user = new Schema({
  id: { type: Number, required: true, index: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6, maxlength: 16 },
  type: [Number],
  avatar: { type: String },
  isDelete: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now }
})

user.statics = {
  getList(option) {
    const _option = { username: '', name: '', ...option }
    const { username, name } = _option
    const _name = new RegExp(name, 'i') //不区分大小写
    const _username = new RegExp(username, 'i') //不区分大小写
    let filter = {
      $or: [ //多条件，数组
        { name: { $regex: _name }, username: { $regex: _username } },
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
      name,
      type,
      avatar,
    } = option
    const _option = {
      id,
      name,
      type,
      avatar,
    }
    return updateOne.call(this, _option)
  },
  deleteOne(option) {
    return deleteOne.call(this, option)
  },
}


let userModel = mongoose.model('User', user);

module.exports = userModel;