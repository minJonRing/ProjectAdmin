const router = require('koa-router')()
const formidable = require('formidable')
const path = require("path")
const config = require("../../config.js")
// 上传封面
router.post("/upload/img", upload('image'));
router.post("/upload/video", upload('video'));

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
        form.parse(ctx.req, (err, fields, { file }) => {
          try {
            if (err) { resolve([]); return; }
            if (Array.isArray(file)) {
              const list = file.map(el => ({
                fileName: el.newFilename,
                filePath: el.filepath.replace(/.+(public)/g, "").replace(/(\\)/g, '/')
              }))
              resolve(list)
            } else {
              const filePath = file.filepath.replace(/.+(public)/g, "").replace(/(\\)/g, '/');
              resolve([{ fileName: file.newFilename, filePath }])
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