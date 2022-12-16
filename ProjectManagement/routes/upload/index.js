const router = require('koa-router')()
const formidable = require('formidable')
const path = require("path")
const fs = require('fs');
const fsPromises = fs.promises;
const config = require("../../config.js")
// 上传封面
router.post("/api/upload/img", upload('image'));
router.post("/api/upload/video", upload('video'));

const mv = async (sourcePath, destPath) => {
  return fsPromises.rename(sourcePath, destPath);
};

const getType = (str) => {
  return str.replace(/.+(?=\.)/g, '')
}

function upload(url) {
  return async function (ctx, next) {
    await next()
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(config.default._rootDir + "/public/upload/" + url);
    form.maxFieldsSize = 500 * 1024 * 1024;//上传文件的最大大小
    form.maxFileSize = 500 * 1024 * 1024;//上传文件的最大大小
    form.keepExtensions = true;
    form.multiples = true;
    const files = await new Promise((resolve, reject) => {
      try {
        form.parse(ctx.req, async (err, fields, { file }) => {
          try {
            if (err) { resolve([]); return; }
            if (Array.isArray(file)) {
              const list = file.map(async el => {
                const { filepath, newFilename, originalFilename } = el;
                const _filePath = `${filepath}${getType(originalFilename)}`
                await mv(filepath, _filePath)
                return {
                  fileName: newFilename,
                  filePath: _filePath.replace(/.+(public)/g, "").replace(/(\\)/g, '/')
                }
              })
              resolve(list)
            } else {
              const { filepath, newFilename, originalFilename } = file;
              const _filePath = `${filepath}${getType(originalFilename)}`
              await mv(filepath, _filePath)
              const filePath = _filePath.replace(/.+(public)/g, "").replace(/(\\)/g, '/');
              resolve([{ fileName: newFilename, filePath }])
            }
          } catch (error) {
            resolve([])
          }
        })
      } catch (error) {
        resolve([])
      }
    })
    ctx.body = { status: files.length ? 200 : 406, message: files.length ? '上传成功' : '上传失败,请联系管理员', errno: 0, data: files }
  }
}
module.exports = router;