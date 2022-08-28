const joi = require('joi')
exports.article = {
    // 新增文章分类
    add: {
        body: {
            name: joi.string().required(),
            alias: joi.string().alphanum().required()
        }
    },
    // 根据id删除文章分类
    del: {
        params: {
            id: joi.number().integer().min(1).required()
        }
    },
    // 根据id文章分类
    addcates: {
        params: {
            id: joi.number().integer().min(1).required()
        }
    },
    // 根据id更改文章分类
    renew: {
        body: {
            id: joi.number().integer().min(1).required(),
            name: joi.string().required(),
            alias: joi.string().alphanum().required()
        }
    }
}