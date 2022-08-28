const db = require('../db/index')
// 导入密码加密
const bcrypt = require('bcryptjs')
// 导入jwt
const jwt = require('jsonwebtoken')
// 导入密钥
const key = require('../config')
// 路由的处理函数
//                注册的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    // 注册表单是否合法
    // if (userinfo.username == null || userinfo.password == null) {
    //     // return res.send({ status: 1, message: '用户名或密码不能为空！' })'
    //     return res.cc('用户名或密码不能为空！')
    // }
    // 检测用户名是否被占用
    db.query(`select * from ev_users where username=?`, userinfo.username, (err, results) => {
        // 执行sql语句失败
        if (err) return /* res.send({ status: 1, message: err.message }) */ res.cc(err)
        // 用户名被占用
        if (results.length > 0) return /* res.send({ status: 1, message: '用户名被占用' }) */ res.cc('用户名被占用')
    })
    // 用户名可用，加密用户的密码
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 向sql中插入新用户
    db.query(`insert into ev_users set ? `, { username: userinfo.username, password: userinfo.password }, (err, results) => {
        if (err) return /* res.send({ status: 1, message: err.message }) */ res.cc(err)
        if (results.affectedRows !== 1) return /* res.send({ status: 1, message: '注册用户失败' }) */ res.cc('注册用户失败')
        /* res.send({ status: 0, message: '注册成功！' }) */ res.cc('注册成功！', 0)
    })
}
//                登录的处理函数
exports.login = (req, res) => {
    // 登录名的验证
    db.query(`select * from ev_users where username=?`, req.body.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length != 1) return res.cc('用户名错误')
        // 登录密码的验证，调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
        const compareoutcome = bcrypt.compareSync(req.body.password, results[0].password)
        if (!compareoutcome) return res.cc('用户密码错误')
        // 生成token
        //    定义密钥
        const keys = key.screctKey
        // 定义token的用户配置信息,不展示密码和用户头像
        const user = { ...results[0], password: '', user_pic: '' }
        const token = jwt.sign(user, keys, { expiresIn: '10h' })
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + token
        })
    })
}