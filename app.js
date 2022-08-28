const express = require('express')
const app = express()
const joi = require('joi')
// 配置全局中间件
const cors = require('cors')
app.use(cors())
// 配置解析 application/x-www-form-urlencoded 格式中间件
app.use(express.urlencoded({ extended: false }))
// 托管req.file里的文件类型
app.use('/uploads', express.static('./uploads'))
// 解密钥中间件
const expressjwt = require('express-jwt')
// 设置路由错误消息函数中间件
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
//         导入密钥
const key = require('./config')
//          解密
app.use(expressjwt({ secret: key.screctKey }).unless({ path: [/^\/api\//] }))
// 导入登录注册路由
const userRouter = require('./router/user')
const { path } = require('@hapi/joi/lib/errors')
app.use('/api', userRouter)
// 导入用户信息路由
const Ruserinfo = require('./router/userinfo')
app.use('/my', Ruserinfo)
// 导入文章模块路由
const article = require('./router/artcate')
app.use('/my/article', article)
// 导入发布文章模块
const publisharticle = require('./router/article')
app.use('/my/article', publisharticle)
// 定义验证错误的中间件
app.use((err, req, res, next) => {
    // 验证错误
    if (err instanceof joi.ValidationError) {
        return res.cc(err.message)
    } else {
        // 未知错误
        res.cc(err)
    }

})
// 捕获并处理 Token 认证失败后的错误
app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') return res.cc('无效的token')
    res.cc(err)
})
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})

