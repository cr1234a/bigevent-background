const { func } = require('joi')
const db = require('../db/index')
// 文章信息模块
exports.articlecate = (req, res) => {
    db.query(`select * from ev_article_cate where is_delete=0 order by id asc`, (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 0) return res.cc('查询文章失败')
        res.send({
            status: 0,
            message: '获取文章信息成功',
            data: results
        })
    })
}
// 新增文章分类模块
exports.addarticlecate = (req, res) => {
    // 定义文章分类错误
    db.query(`select * from ev_article_cate where is_delete=0 and (name=? or alias=?)`, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 2) {
            return res.cc('文章分类及别名被占用')
        } else if (results.length == 1 && results[0].name == req.body.name && results[0].alias == req.body.alias) {
            return res.cc('文章分类及别名被占用')
        } else if (results.length == 1 && results[0].name == req.body.name && results[0].alias != req.body.alias) {
            return res.cc('文章分类被占用')
        } else if (results.length == 1 && results[0].name != req.body.name && results[0].alias == req.body.alias) {
            return res.cc('文章别名被占用')
        }
    })
    // 新增文章分类
    db.query('insert into ev_article_cate set ?', req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc('新增文章分类失败')
        res.cc('新增文章分类成功', 0)
    })
}
// 根据id删除文章分类模块
exports.delaritclecate = (req, res) => {
    db.query(`update ev_article_cate set is_delete=1 where Id=?`, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc('删除文章分类失败')
        res.send({
            status: 0,
            message: '删除文章分类成功',
        })
    })
}
// 根据id获取文章分类
exports.addcates = (req, res) => {
    db.query('select * from ev_article_cate where  Id=?', req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('获取文章分类失败')
        if (results[0].is_delete == 1) return res.cc('文章已被删除')
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results[0]
        })
    })
}
// 根据id更改文章分类
exports.renewarticlecate = (req, res) => {
    db.query(`select * from ev_article_cate where Id!=? and (name=? or alias=?)`, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length == 2) {
            return res.cc('文章分类及别名被占用')
        } else if (results.length == 1 && results[0].name == req.body.name && results[0].alias == req.body.alias) {
            return res.cc('文章分类及别名被占用')
        } else if (results.length == 1 && results[0].name == req.body.name && results[0].alias != req.body.alias) {
            return res.cc('文章分类被占用')
        } else if (results.length == 1 && results[0].name != req.body.name && results[0].alias == req.body.alias) {
            return res.cc('文章别名被占用')
        }
        db.query(`select * from ev_article_cate where Id=? and name=? and alias=?`, [req.body.id, req.body.name, req.body.alias], (err, results) => {
            if (err) return res.cc(err)
            if (results.length == 1) {
                return res.cc('文章分类及别名未修改')
            }
            db.query(`update ev_article_cate set name=?, alias=? where Id=?`, [req.body.name, req.body.alias, req.body.id], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows != 1) return res.cc('更新文章分类失败')
                res.cc('更新文章分类成功', 0)
            })
        })
    })
}