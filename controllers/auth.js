// 新建权限控制器，定义登录方法和登录页面的渲染规则  JWT的加密算法
const User = require('./../model/user');
const userRole = require('./../model/user_role');
const Role = require('./../model/role');
const JWT = require('jsonwebtoken');
// 定义密钥
const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
    login: async function (req, res, next) {
        let phone = req.body.phone;
        let password = req.body.password;
        // 参数判断
        if (!phone || !password) {
            res.json({ code: 0, message: 'params empty' });
            return;
        }

        try {

            // 搜索匹配的用户
            const users = await User.select({ phone, password });
            //是否该用户存在
            const user = users[0];

            // 第一步：通过user.id获取user_role表中的role_id
            let roleIds = await userRole.where({ user_id: user.id }).select('role_id');
            const roleId = roleIds[0].role_id;
            // 第二步：通过role_id获取role表对应的角色slug
            let role = await Role.where({ id: roleId }).select('slug');
            const slug = role[0].slug;
            console.log(slug);
            // 返回登录信息
            if (user) {
                // 将用户信息加密成token,用用户姓名作加密签名
                // let token = JWT.sign({ user_name: user.name }, JWT_SECRET, { expiresIn: '30d' });
                // 将用户的电话，密码和id和slug一起加密成token
                let token = JWT.sign({ user_phone: user.phone, user_password: user.password, user_id: user.id, user_name: user.name, slug: slug }, JWT_SECRET, { expiresIn: '30d' });
                // 加密放置在cookie中
                res.cookie('token', token, { maxAge: 30 * 24 * 60 * 60 * 1000 });

                res.json({ code: 200, message: '登录成功！', data: { token: token } })
            } else {
                res.json({ code: 0, data: { msg: '登录失败，没有此用户' } });
            }
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },

    // 渲染登录页面
    renderLogin: async function (req, res, next) {
        // 如果用户已经登录，重新定向到销售线索页面
        if (res.locals.isLogin) {
            // 第一次登录 跳转到用户管理页面，如果用户已经登录，重新定向到销售线索页面，如果没有登录，跳转登录页面
            res.redirect('/admin/clue');
            return;
        }

        res.render('admin/login');
    }
}

module.exports = authController;