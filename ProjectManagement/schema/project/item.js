const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  getList,
  getDetail,
  addOne,
  updateOne,
  deleteOne
} = require("../fn");

let projectItem = new Schema({
  id: {
    type: Number,
    required: true,
    index: true
  },
  parentId: {
    type: Number,
    required: true,
    default: 0
  },
  projectId: {
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  personnel: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  question: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  isDelete: {
    type: Boolean,
    default: false
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

projectItem.statics = {
  getList(option) {
    const _option = {
      projectId: '',
      ...option
    }
    const {
      projectId
    } = _option
    let filter = {
      projectId
    }
    return getList.call(this, _option, {
      filter
    })
  },
  getDetail(option) {
    const {
      id
    } = option
    return new Promise((r) => {
      this.find({
          projectId: id,
          isDelete: false
        }).populate('personnel')
        .sort({
          'id': 1
        })
        .exec((err, doc) => {
          try {
            if (!err && doc) {
              r({
                status: 200,
                message: '数据请求成功',
                data: {
                  list: doc
                }
              })
            } else {
              r({
                status: 203,
                message: err,
                data: doc
              })
            }
          } catch (e) {
            r({
              status: 203,
              message: e,
              data: ''
            })
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
      personnel
    } = option
    const _option = {
      id,
      name,
      personnel
    }
    return updateOne.call(this, _option)
  },
  deleteOne(option) {
    return deleteOne.call(this, option)
  },
}


let ProjectItemModel = mongoose.model('ProjectItem', projectItem);

module.exports = ProjectItemModel;