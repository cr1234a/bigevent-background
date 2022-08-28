const db = require('../db/index')
// 导入加密中间件
const bcrypt = require('bcryptjs')
const { func } = require('joi')
// 获取用户信息
exports.getuserinfo = (req, res) => {
    db.query(`select id,username,nickname,email from ev_users where id=?`, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('用户信息获取失败')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}
// 更改昵称和邮箱
exports.updateinfo = (req, res) => {
    db.query(`update ev_users set ? where id=?`, [req.body, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败')
        res.cc('更新用户信息成功', 0)
    })
}
// 更改密码
exports.updatepassword = (req, res) => {
    // 查看输入的旧密码是否一致
    db.query(`select password from ev_users where id=?`, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('查询用户密码失败')
        // 加密旧密码
        // req.body.oldPwd = bcrypt.hashSync(req.body.oldPwd, 10)
        const compareoutcome = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareoutcome) return res.cc('原密码错误')
        // 加密新密码
        req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(`update ev_users set password=? where id=?`, [req.body.newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc('修改用户密码失败')
            res.cc('修改用户密码成功', 0)
        })
    })
}
// 更改用户头像
exports.updateimage = (req, res) => {
    db.query(`update ev_users set user_pic=? where id=?`, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows != 1) return res.cc('修改用户头像失败')
        res.cc('修改头像成功', 0)
    })
}
