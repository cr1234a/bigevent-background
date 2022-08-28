const express = require('express')
const router = express.Router()
const add = require('../router_handler/article')
const expressjoi = require('@escook/express-joi')
const { pub } = require('../schema/addarticle')
// 导入解析FormDate数据包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')
// 创建 multer 的实例对象，通过 dest 属性指定文件类型的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// 发表文章中间件
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
// 将文件类型的数据进行解析，cover_img就是一张图片，属于文件类型的数据
router.post('/add', upload.single('cover_img'), expressjoi(pub.add), add.add)
module.exports = router