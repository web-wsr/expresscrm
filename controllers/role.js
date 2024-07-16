const schema = require('async-validator').default
const Role = require('./../model/role')
const userRole = require('./../model/user_role')
const rolePermission = require('./../model/role_permission')
const Permission = require('./../model/permission')
const PermissionGroup = require('./../model/permission_group')
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
        try {
            // 获取所有权限
            const permissionGroup = await PermissionGroup.all()
            const permissionsAll = await Permission.all()
            const permissionGroupDiv = {}
            permissionGroup.forEach(data => {
                data.children = []
                permissionGroupDiv[data.id] = data
            })
            permissionsAll.forEach(data => {
                permissionGroupDiv[data.group_id].children.push(data)
            })
            const permissionsTransformAll = Object.values(permissionGroupDiv)
            console.log(permissionsTransformAll);

            res.locals.nav = 'role'
            res.render('admin/role_create.tpl', {
                permissionsTransformAll: permissionsTransformAll,
            });
        } catch (e) {
            res.json({
                error_code: 1,
                message: e.message
            })
        }

    },

    // 角色创建 API路由
    store: async function (req, res, next) {
        const description = req.body.description
        const slug = req.body.slug
        const name = req.body.name
        const permissions = req.body.permissions
        console.log(permissions, description, slug, name);
        const validator = new schema({
            description: { type: 'string', required: true },
            slug: { type: 'string', required: true },
            name: { type: 'string', required: true },
            permissions: { type: 'array', required: true }
        })
        const params = {
            description: description,
            slug: slug,
            name: name,
            permissions: permissions
        }
        try {
            await validator.validate(params)
            const ids = await Role.insert({ name: name, slug: slug, description: description })
            const roleId = ids[0]
            await rolePermission.insert(permissions.map(item => {
                return {
                    permission_id: item,
                    role_id: roleId
                }
            }))
            res.json({
                code: 200,
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
            // 获取所有权限
            const permissionGroup = await PermissionGroup.all()
            const permissionsAll = await Permission.all()
            const permissionGroupDiv = {}
            permissionGroup.forEach(data => {
                data.children = []
                permissionGroupDiv[data.id] = data
            })
            permissionsAll.forEach(data => {
                permissionGroupDiv[data.group_id].children.push(data)
            })
            const permissionsTransformAll = Object.values(permissionGroupDiv)
            console.log(permissionsTransformAll);


            // 获取角色关联的权限
            const permissions = await rolePermission.where({ role_id: id });
            console.log(permissions);
            const permissionsTransform = permissions.map(data => data.permission_id)
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
                permissionsTransformAll: permissionsTransformAll,
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
        const description = req.body.description;
        const slug = req.body.slug;
        const name = req.body.name;
        const permissions = req.body.permissions;
        console.log(permissions, description, slug, name, id);
        const validator = new schema({
            description: { type: 'string', required: true },
            slug: { type: 'string', required: true },
            name: { type: 'string', required: true },
            permissions: { type: 'array', required: true },
        })
        const params = { name, permissions, description, slug };
        try {
            // 验证请求参数
            await validator.validate(params)
            // 修改角色信息
            await Role.update(id, { name: name, description: description, slug: slug });
            // 修改角色关联的权限信息
            const originPermissions = await rolePermission.where({ role_id: id })
            console.log(originPermissions);
            const originIds = originPermissions.map(data => data.permission_id)
            console.log(originIds);
            const removeIds = originIds.filter(data => !permissions.includes(data))
            console.log(removeIds);
            const insertIds = permissions.filter(data => !originIds.includes(data))
            console.log(insertIds);
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
                        role_id: id
                    }
                }))
            }
            res.json({ code: 200, message: '编辑成功' })
        } catch (e) {
            res.json({ error_code: 1, message: e.message || e.errors })
        }
    },


    // 角色删除 API路由
    destroy: async function (req, res, next) {
        try {
            let id = req.params.id
            id = +id
            console.log(typeof id);
            // await userRole.delete({ role_id: id })
            // await rolePermission.delete({ role_id: id })
            // await Role.delete({ id: id })
            await Role.knex().where({ id: id }).del()
            await rolePermission.knex().where({ role_id: id }).del()
            await userRole.knex().where({ role_id: id }).del()
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