// 表单验证中间件
const joi = require('joi')
// 定义验证规则
const check = {
    body: {
        username: joi.string().alphanum().min(1).max(10).required(),
        password: joi.string().pattern(/^[\S]{5,10}$/).required()
    }
}

module.exports.checks = check
