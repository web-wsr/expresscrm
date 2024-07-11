exports.seed = function (knex) {
    return Promise.all([
        knex('roles').insert([
            { id: 1, slug: 'admin', name: '管理员', description: '拥有全部权限' },
            { id: 2, slug: 'sales', name: '销售', description: '拥有查看线索' }
        ]),

        knex('permission_groups').insert([
            { id: 1, name: '人员管理' },
            { id: 2, name: '线索管理' }
        ]),

        knex('permissions').insert([
            { id: 1, group_id: 1, slug: 'rolesList', name: '角色-列表' },
            { id: 2, group_id: 1, slug: 'rolesCreate', name: '角色-添加' },
            { id: 3, group_id: 1, slug: 'rolesUpdate', name: '角色-编辑' },
            { id: 4, group_id: 1, slug: 'rolesDelete', name: '角色-删除' },
            { id: 5, group_id: 1, slug: 'rolesShow', name: '角色-详情' },
            { id: 6, group_id: 1, slug: 'personnelList', name: '人员-列表' },
            { id: 7, group_id: 1, slug: 'personnelCreate', name: '人员-添加' },
            { id: 8, group_id: 1, slug: 'personnelUpdate', name: '人员-编辑' },
            { id: 9, group_id: 1, slug: 'personnelDelete', name: '人员-删除' },
            { id: 10, group_id: 2, slug: 'clueList', name: '线索-列表' },
            { id: 11, group_id: 2, slug: 'clueTrack', name: '线索-跟踪' },
            { id: 12, group_id: 2, slug: 'clueCreate', name: '线索-记录添加' },
            { id: 13, group_id: 2, slug: 'clueUpdate', name: '线索-客户编辑' }
        ]),

        knex('role_permissions').insert([
            { role_id: 1, permission_id: 1 },
            { role_id: 1, permission_id: 2 },
            { role_id: 1, permission_id: 3 },
            { role_id: 1, permission_id: 4 },
            { role_id: 1, permission_id: 5 },
            { role_id: 1, permission_id: 6 },
            { role_id: 1, permission_id: 7 },
            { role_id: 1, permission_id: 8 },
            { role_id: 1, permission_id: 9 },
            { role_id: 1, permission_id: 10 },
            { role_id: 1, permission_id: 11 },
            { role_id: 1, permission_id: 12 },
            { role_id: 1, permission_id: 13 },
            { role_id: 2, permission_id: 10 },
            { role_id: 2, permission_id: 11 },
            { role_id: 2, permission_id: 12 },
            { role_id: 2, permission_id: 13 },
        ]),

        knex('user_roles').insert([
            { user_id: 1, role_id: 1 },
            { user_id: 2, role_id: 2 },
        ])
    ])
}