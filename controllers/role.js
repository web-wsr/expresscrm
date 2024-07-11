const schema = require('async-validator').default
const Role = require('./../model/role')
const userRole = require('./../model/user_role')
const rolePermission = require('./../model/role_permission')
const log = require('../model/log')

const roleController = {
    // 角色列表 index渲染页面的路由
    index: async function (req, res, next) {
        try {
            const roles = await Role.all()
            res.locals.nav = 'role'
            res.locals.roles = roles
            res.render('admin/role.tpl', res.locals)
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    // 创建角色空白表单供填写  页面渲染的路由
    renderRoleCreate: async function (req, res, next) {
        res.locals.nav = 'role'
        res.render('admin/role_create.tpl');
    },

    // 角色创建 API路由
    store: async function (req, res, next) {
        const name = req.body.name
        const permissions = req.body.permissions
        const validator = new schema({
            name: { type: 'srting', required: true },
            permissions: { type: 'array', required: true }
        })
        const params = {
            name: name,
            permissions: permissions
        }
        try {
            await validator.validate(params)
            const ids = await Role.insert({ name: name })
            const roleId = ids[0]
            await rolePermission.insert(permissions.map(item => {
                return {
                    permission_id: item,
                    role_id: roleId
                }
            }))
            res.json({
                error_code: 0,
                data: { id: roleId },
                message: '创建成功'
            })
        } catch (e) {
            res.json({
                error_code: 1,
                message: e.message || e.errors
            })
        }
    },

    // 角色详情 渲染页面的路由
    show: async function (req, res, next) {
        const id = req.params.id
        console.log(id);
        try {
            // const role = await Role.find(id)
            // const permissions = await rolePermission.select({ role_id: id })
            // res.locals.nav = 'role'
            // res.locals.role = role
            // res.locals.permissions = permissions
            // res.render('admin/role_edit.tpl', res.locals)
            const roles = await Role.select({ id })
            const role = roles[0]
            if (!role) {
                res.json({
                    error_code: 1,
                    message: '不存在'
                })
                return;
            }
            const permissions = await rolePermission.where({ role_id: id });
            console.log(permissions);
            permissionsTransform = permissions.map(data => data.permission_id)
            console.log(permissionsTransform);
            res.locals.nav = 'role'
            // res.json({
            //     error_code: 0,
            //     data: {
            //         id: id,
            //         role: role,
            //         permissons: permissionsTransform
            //     }
            // })
            res.render('admin/role_edit.tpl', {
                role: role,
                permissions: permissionsTransform
            })
        } catch (e) {
            res.json({
                error_code: 1,
                message: e.message
            })
        }
    },
    // 角色编辑 API路由
    update: async function (req, res, next) {
        const id = req.params.id;
        const name = req.body.name;
        const permissions = req.body.permissions;
        const validator = new schema({
            name: { type: 'string', required: true },
            permissions: { type: 'array', required: true },
        })
        const params = { name, permissions };
        try {
            // 验证请求参数
            await validator.validate(params)
            // 修改角色信息
            await Role.update(id, { name: name });
            // 修改角色关联的权限信息
            const originPermissions = await rolePermission.where({ role_id: id })
            const originIds = originPermissions.map(data => data.permission_id)
            const removeIds = originIds.filter(data => !permissions.includes(data))
            const insertIds = permissions.filter(data => !originIds.includes(data))
            if (removeIds.length) {
                await rolePermission.knex()
                    .whereIn('permission_id', removeIds)
                    .andWhere('role_id', id)
                    .del()
            }
            if (insertIds.length) {
                await rolePermission.insert(insertIds.map(data => {
                    return {
                        permission_id: data,
                        role_id: role_id
                    }
                }))
            }
            res.json({ error_code: 0, message: '编辑成功' })
        } catch (e) {
            res.json({ error_code: 1, message: e.message || e.errors })
        }
    },


    // 角色删除 API路由
    destory: async function (req, res, next) {
        try {
            const id = req.params.id
            await userRole.delete({ role_id: id })
            await rolePermission.delete({ role_id: id })
            await Role.delete(id)
            res.json({
                error_code: 0,
                message: '删除成功'
            })
        } catch (e) {
            res.json({
                error_code: 1,
                message: e.message
            })
        }

    }
}

module.exports = roleController