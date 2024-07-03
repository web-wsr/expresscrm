// 控制器 操作CURD
const User = require('./../model/user');
const { formatDate } = require('./../utils/date');

const userController = {
    // 插入数据
    insert: async function (req, res, next) {
        let name = req.body.name;
        let phone = req.body.phone;
        let password = req.body.password;
        let role = req.body.role;
        let created_time = new Date();
        if (!name || !phone || !password || !role) {
            res.json({
                code: 0,
                message: '缺少参数'
            })
            return;
        }
        try {
            const users = await User.insert({
                name,
                phone,
                password,
                role,
                created_time
            });
            res.json({
                code: 200,
                data: users,
                message: '添加成功'
            })
        } catch (e) {
            res.json({
                code: 0,
                data: e,
                error: e.message,
                message: '添加失败'
            })
        }
    },
    show: async function (req, res, next) {
        try {
            const users = await User.all();
            res.locals.users = users.map((data) => {
                data.role_diplay = data.role == 1 ? '管理员' : '销售';
                data.created_time_display = formatDate(data.created_time);
                return data;
            })
            res.render('admin/user.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    edit: async function (req, res, next) {
        const id = req.params.id;
        try {
            const users = await User.select({ id })
            res.locals.user = users[0];
            res.render('admin/user_edit.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    update: async function (req, res, next) {
        let name = req.body.name;
        let phone = req.body.phone;
        let password = req.body.password;
        let role = req.body.role;
        let id = req.params.id;
        if (!name || !phone || !password || !role) {
            res.json({
                code: 0,
                message: '缺少参数'
            })
            return;
        }

        try {
            const users = await User.update(id, { name, phone, password, role })
            res.json({
                code: 200,
                data: users,
                message: '修改成功'
            })
        } catch (e) {
            res.json({
                code: 0,
                data: e,
                error: e.message,
                message: '修改失败'
            })
        }
    },
    // 创建空白表单供填写
    renderUserCreate: function (req, res, next) {
        res.render('admin/user_create.tpl')
    }
}

module.exports = userController;