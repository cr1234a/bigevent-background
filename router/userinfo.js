// 导入处理函数模块
const userinfo = require('../router_handler/userinfo')
// 导入表单验证规则
const { userchecks } = require('../schema/userinfo')
// 导入配置验证规则的中间件
const expressjoi = require('@escook/express-joi')
// 获取用户信息模块
const express = require('express')
const router = express.Router()
// 获取用户信息
router.get('/userinfo', userinfo.getuserinfo)
// 更改昵称和邮箱
router.post('/userinfo', expressjoi(userchecks.userinfo), userinfo.updateinfo)
// 更改密码
router.post('/updatepwd', expressjoi(userchecks.key), userinfo.updatepassword)
// 更改用户头像
router.post('/update/avatar', expressjoi(userchecks.reviseimage), userinfo.updateimage)
module.exports = router