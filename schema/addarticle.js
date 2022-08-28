const joi = require('joi')
exports.pub = {
    // 验证FormDate数据里的文本类型
    add: {
        body: {
            cate_id: joi.number().integer().min(1).required(),
            title: joi.string().required(),
            content: joi.string().required().allow(''),
            state: joi.string().valid('草稿', '已发布').required()
        }
    }
}