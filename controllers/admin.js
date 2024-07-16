const User = require('./../model/user');
const userRole = require('./../model/user_role');
const Role = require('./../model/role');
const log = require('../model/log');
const schema = require('async-validator').default;

const adminController = {
    // 管理员列表  页面渲染的路由
    index: async function (req, res, next) {
        try {
            let roleId = req.query.roleId; // 可选参数，用于筛选特定角色的管理员  这是用作筛选的
            console.log(roleId);
            // 获取所有创建的角色供选择
            const roles = await Role.all();
            // 获取所有用户ID和角色ID
            const userRoles = await userRole.all()
            // console.log(userRoles);
            const userIds = Array.from(new Set(userRoles.map(data => data.user_id)))
            const roleIds = Array.from(new Set(userRoles.map(data => data.role_id)))

            const allUsers = await User.knex().whereIn('id', userIds)
            // console.log(allUsers);
            const allRoles = await Role.knex().whereIn('id', roleIds)
            // console.log(allRoles);

            // 初始化定义admins的数组对象，消除作用域的影响
            let admins = []
            // 构建管理员列表，其中包含每个用户的详细信息以及角色信息
            admins = allUsers.map(user => {
                // 找到与当前用户关联的所有角色ID
                const userRoleIds = userRoles.filter(data => data.user_id === user.id).map(item => item.role_id)
                console.log(userRoleIds);
                // 从所有角色中筛选出与当前用户关联的角色
                const userRolesData = allRoles.filter(role => userRoleIds.includes(role.id))
                console.log(userRolesData);

                // 返回包含用户信息和角色信息的对象
                return {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    userRoles: userRoles,
                    roles: userRolesData
                }
            })
            // 6. 如果提供了roleId参数，过滤出具有该角色的管理员
            if (roleId) {
                admins = admins.filter(data => data.roles.some(role => role.id === +roleId))
            }
            // 模板高亮菜单
            res.locals.nav = 'admin'
            //   准备视图对象进行存放
            res.locals.admins = admins
            // 做一个判断 区别ajax请求
            // 如果请求头表明是ajax请求
            if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
                // 返回JSON数据
                res.json({
                    error_code: 0,
                    data: admins
                });
            } else {
                // 否则，渲染视图
                res.render('admin/admin.tpl', { admins: res.locals.admins, roles: roles });
                // res.json({
                //     error_code: 0,
                //     data: admins,
                //     roles: roles
                // });
            }
            console.log(admins);

        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },


    // 创建管理员空白表单供填写  页面渲染的路由
    renderAdminCreate: async function (req, res, next) {
        try {
            // 获取所有创建的角色供选择
            const roles = await Role.all();
            res.locals.nav = 'admin'
            res.render('admin/admin_create.tpl', { roles: roles });
        } catch (e) {
            res.json({
                error_code: 1,
                message: e.message
            })
        }
    },

    // 管理员创建 API 路由
    createAdmin: async function (req, res, next) {
        const name = req.body.name;
        const phone = req.body.phone;
        const password = req.body.password;
        const roleIds = req.body.roleIds;
        console.log(name, phone, password, roleIds);

        // 验证请求参数
        const validator = new schema({
            name: { type: 'string', required: true },
            phone: { type: 'string', required: true },
            password: { type: 'string', required: true },
            roleIds: { type: 'array', required: true }
        });

        const params = { name, phone, password, roleIds };
        try {
            await validator.validate(params);

            // 通过 phone 查询用户
            const existingUser = await User.where({ phone: phone });
            console.log(existingUser);

            let userId;
            if (existingUser && existingUser.length > 0) {
                // 如果用户已存在，直接获取其 ID
                // 获取的是数组对象，要注意
                userId = existingUser[0].id;
            } else {
                // 如果用户不存在，创建新用户并获取其 ID
                const newUser = await User.insert({ name, phone, password });
                userId = newUser[0].id;
            }
            console.log(userId);
            // 检查用户是否已有角色关联
            const existingRoles = await userRole.where({ user_id: userId });
            if (existingRoles.length > 0) {
                return res.json({ error_code: 1, message: '该用户已有角色关联' });
            }

            // 设置数据表user_roles 中的数据，绑定用户 ID 和其关联的角色 ID
            await userRole.insert(roleIds.map(id => {
                return {
                    user_id: userId,
                    role_id: id
                };
            }));

            res.json({ code: 200, message: '管理员创建成功' });
        } catch (e) {
            res.json({ error_code: 1, message: e.message || e.errors });
        }
    },

    // 管理员编辑 渲染页面的路由
    renderEdit: async function (req, res, next) {
        try {
            const userId = req.params.id; // 获取URL中传递的用户ID参数
            console.log(userId);

            // 根据用户ID查询用户详细信息
            const user = await User.where({ id: userId });

            if (!user) {
                return res.status(404).send({ error_code: 1, message: '用户未找到' });
            }

            // 查询用户关联的所有角色ID
            const userRoles = await userRole.where({ user_id: userId }).select('role_id');
            const roleIds = userRoles.map(role => role.role_id);
            // 获取所有角色供编辑页面选择使用
            const roles = await Role.all();

            // 将用户信息、当前角色及所有可用角色传给前端模板
            res.locals.nav = 'admin';
            res.render('admin/admin_edit.tpl', {
                user: user[0],
                currentRoleIds: roleIds, // 当前用户已分配的角色ID
                allRoles: roles // 所有角色选项
            });
            // res.json({
            //     user: user,
            //     currentRoleIds: roleIds, // 当前用户已分配的角色ID
            //     allRoles: roles // 所有角色选项
            // })
        } catch (e) {
            res.locals.error = e;
            res.render('error', res.locals);
        }
    },

    // 管理员编辑 API路由
    update: async function (req, res, next) {
        const userId = req.params.id;
        const name = req.body.name;
        const phone = req.body.phone;
        const password = req.body.password;
        const roleIds = req.body.roleIds;

        try {
            // 验证请求参数
            const validator = new schema({
                name: { type: 'string', required: true },
                phone: { type: 'string', required: true },
                password: { type: 'string', required: true },
                roleIds: { type: 'array', required: true }
            });

            const params = { name, phone, password, roleIds };
            await validator.validate(params);

            // 更新用户信息
            await User.update(userId, { name, phone, password })

            // 获取当前用户
            const originRoles = await userRole.where({ user_id: userId });
            console.log(originRoles);
            // 获取当前用户的角色id
            const originIds = originRoles.map(data => data.role_id)
            console.log(originIds);

            // 计算需要添加和删除的角色
            const rolesToAdd = roleIds.filter(id => !originIds.includes(id));
            console.log(rolesToAdd);
            const rolesToDelete = originIds.filter(id => !roleIds.includes(id));
            console.log(rolesToDelete);

            // 删除不再需要的角色关联
            if (rolesToDelete.length > 0) {
                await userRole.where({ user_id: userId }).whereIn('role_id', rolesToDelete).del();
            }

            // 添加新角色关联
            if (rolesToAdd.length > 0) {
                await userRole.insert(rolesToAdd.map(id => ({ user_id: userId, role_id: id })));
            }

            res.json({ code: 200, message: '管理员信息更新成功' });
        } catch (e) {
            res.json({ error_code: 1, message: e.message || e.errors });
        }
    },
    // 管理员删除 API路由
    destroy: async function (req, res, next) {
        try {
            let id = req.params.id;
            id = +id;
            await User.knex().where({ id: id }).del()
            res.json({ error_code: 0, message: '删除成功' });
        } catch (e) {
            res.json({ error_code: 1, message: e.message });
        }
    },
    // // 查找相应角色的管理员名字   测试！！！！！！
    // find: async function (req, res, next) {
    //     try {
    //         // // 第一步：查找slug为'sales'的角色
    //         // const salesRole = await Role.select({ slug: 'sales' });
    //         // console.log(salesRole);
    //         // if (!salesRole) {
    //         //     throw new Error('No role found with slug "sales".');
    //         // }
    //         // // 第二步：使用角色id在userRole表中查找所有拥有该角色的用户id
    //         // const salesRoleId = await userRole.where({ role_id: salesRole[0].id });
    //         // const userIds = salesRoleId.map(data => data.user_id);
    //         // console.log(userIds);
    //         // // 第四步：找到所有该角色的用户
    //         // const users = await User.knex().whereIn('id', userIds);
    //         // console.log(users);
    //         // 第一步：通过user.id获取user_role表中的role_id
    //         const userId = 3
    //         let roleIds = await userRole.where({ user_id: userId }).select('role_id');
    //         const roleId = roleIds[0].role_id;
    //         console.log(roleId);
    //         // 第二步：通过role_id获取role表对应的角色slug
    //         let role = await Role.where({ id: roleId }).select('slug');
    //         const slug = role[0].slug;
    //         console.log(slug);
    //         res.json({ error_code: 0, message: '查找成功' })
    //     } catch (e) {
    //         res.json({ error_code: 1, message: e.message });
    //     }
    // }
}

module.exports = adminController;