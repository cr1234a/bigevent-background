const express = require('express')
const router = express.Router()
// 导入路由的处理函数包
const userHandler = require('../router_handler/user')
// 导入表单验证的中间件
const expressjoi = require('@escook/express-joi')
// 导入验证规则
const { checks } = require('../schema/user')
// 配置局部验证表单中间件
router.post('/reguser', expressjoi(checks), userHandler.regUser)
router.post('/login', expressjoi(checks), userHandler.login)
module.exports = router