const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getList, add } = require("./fn");

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
  add(option) {
    return add.call(this, option)
  },
}


let userModel = mongoose.model('User', user);

module.exports = userModel;