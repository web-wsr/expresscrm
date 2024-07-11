// 控制器 操作添加线索和线索页面展示的逻辑
const Clue = require('./../model/clue');
const { formatDate } = require('./../utils/date');

// 增加引入 clueLog 和 User的用户模型
const ClueLog = require('./../model/log');
const User = require('./../model/user');
const log = require('./../model/log');


const clueController = {
    insert: async function (req, res, next) {
        let name = req.body.name;
        let phone = req.body.phone;
        let utm = req.body.utm;
        let created_time = new Date();
        if (!name || !phone) {
            res.json({ code: 0, message: '请填写完整信息' });
            return
        }

        try {
            const clues = await Clue.insert({ name, phone, utm, created_time });
            res.json({ code: 200, data: clues, message: '添加成功' });
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
            // const clues = await Clue.all();
            const role = res.locals.userInfo.role;
            const user_id = res.locals.userInfo.id;
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            let pagination = { page, limit }
            console.log(role, user_id);
            let params = {};
            if (role == 2) {
                params.user_id = user_id;
            }
            const count = await Clue.count(params);
            const sum = count[0].sum;
            const clues = await Clue.joinUser(params, pagination);
            res.locals.clues = clues.map((data) => {
                data.created_time_display = formatDate(data.created_time);
                return data;
            })
            let pageNumber = Math.ceil(sum / limit);
            let pageArray = new Array(pageNumber).fill('').map((item, index) => index + 1)
            res.locals.pagination = {
                total: sum,
                pageSize: limit,
                current: page,
                pageArray: pageArray
            }
            res.locals.nav = 'clue';
            res.render('admin/clue.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },

    logShow: async function (req, res, next) {
        try {
            // 取出相应的信息，为渲染页面做准备 存在视图对象res.locals
            const id = req.params.id;
            const clues = await Clue.select({ id });
            console.log(clues);
            // 跟踪线索的记录id,对应的就是log-item中的序号
            const logs = await ClueLog.select({ clue_id: id });
            // 筛选为销售的用户
            const users = await User.select({ role: 2 });
            res.locals.users = users.map((data) => {
                return ({
                    id: data.id,
                    name: data.name
                })
            })
            // 取出相应的数组对象 存在视图对象res.locals
            res.locals.clue = clues[0];
            console.log(res.locals.clue);
            res.locals.clue.created_time_display = formatDate(res.locals.clue.created_time);
            res.locals.logs = logs.map((data) => {
                data.created_time_display = formatDate(data.created_time);
                return data;
            })
            res.locals.nav = 'clue';
            res.render('admin/clue_log.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },

    addLog: async function (req, res, next) {
        let content = req.body.content;
        let created_time = new Date();
        let clue_id = req.params.id;
        if (!content) {
            res.json({ code: 0, message: '请填写完整信息' })
            return;
        }

        try {
            const clue = await ClueLog.insert({
                content, created_time, clue_id
            })
            res.json({ code: 200, data: clue, message: '添加成功' })
        } catch (e) {
            res.json({
                code: 0,
                data: e,
                error: e.message,
                message: '添加失败'
            })
        }
    },
    // 修改客户的状态和备注的数据逻辑
    update: async function (req, res, next) {
        let status = req.body.status;
        let remark = req.body.remark;
        let id = req.params.id;
        let user_id = req.body.user_id
        if (!status || !remark) {
            res.json({ code: 0, message: '请填写完整信息，嘻嘻' })
            return;
        }

        try {
            const clue = await Clue.update(id, {
                status, remark, user_id
            })
            res.json({
                code: 200,
                data: clue,
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
    }
}

module.exports = clueController;