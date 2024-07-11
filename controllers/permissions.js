const schema = require('async-validator').default
const rolePermission = require('./../model/role_permission')
const PermissionGroup = require('./../model/permission_group')
const Permission = require('./../model/permission')

const permissionsController = {
    index: async function (req, res, next) {
        try {
            const permissions = await Permission.all()
            const permissionGroup = await PermissionGroup.all()
            const permissionGroupDiv = {}
            permissionGroup.forEach(data => {
                data.children = []
                permissionGroupDiv[data.id] = data
            })

            permissions.forEach(data => {
                permissionGroupDiv[data.group_id].children.push(data)
            })
            const permissionTransform = Object.values(permissionGroupDiv)
            res.json({
                error_code: 0,
                data: { permissions: permissionTransform }
            })
        } catch (e) {
            res.json({ error_code: 1, error_message: e.message })
        }
    },
}

module.exports = permissionsController;