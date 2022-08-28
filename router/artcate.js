
const express = require('express')
const article = require('../router_handler/artcate')
const router = express.Router()
// 引入添加验证
const expressjoi = require('@escook/express-joi')
// 引入验证规则
const { article: art } = require('../schema/article')
// 获取文章分类
router.get('/cates', article.articlecate)
// 新增文章分类
router.post('/addcates', expressjoi(art.add), article.addarticlecate)
// 根据id删除文章分类
router.get('/deletecate/:id', expressjoi(art.del), article.delaritclecate)
// 根据id获取文章分类模块
router.get('/cates/:id', expressjoi(art.addcates), article.addcates)
// 根据id更改文章分类
router.post('/updatecate', expressjoi(art.renew), article.renewarticlecate)
module.exports = router