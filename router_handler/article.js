const db = require('../db/index')
const path = require('path')
// 发表文章模块
exports.add = (req, res) => {
    // 验证FormDate数据里的文件类型
    if (!req.file || req.file.fieldname != 'cover_img') return res.cc('请上传封面图片')
    // 配置传递给数据库的参数对象
    const data = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    db.query(`insert into ev_articles set ?`, data, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc('发表文章失败')
        res.cc('发表文章成功', 0)
    })
}