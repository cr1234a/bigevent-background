// 表单验证中间件
const joi = require('joi')
const { updateimage } = require('../router_handler/userinfo')
const usercheck = {
    userinfo: {
        body: {
            nickname: joi.string().min(1).max(10).required(),
            email: joi.string().email().required()
        }
    },
    // 更改密码的验证规则
    key: {
        body: {
            oldPwd: joi.string().pattern(/^[\S]{5,10}$/).required(),
            newPwd: joi.not(joi.ref('oldPwd')).concat(joi.string().pattern(/^[\S]{5,10}$/).required())
        }
    },
    // 更改头像的验证规则
    reviseimage: {
        body: {
            avatar: joi.string().dataUri().required()
        }
    }
}
module.exports.userchecks = usercheck