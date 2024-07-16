

const userRole = require('./../model/user_role');
const permission = require('./../model/permission');
const rolePermission = require('./../model/role_permission');



const hasPermission = async function (userId, permissionSlug) {
    try {
        // 获取用户的所有角色ID
        // const roleIds = await knex('user_roles')
        //     .where('user_id', userId)
        //     .pluck('role_id');
        const roles = await userRole.knex().where('user_id', userId)
        const roleIds = roles.map(role => role.role_id);
        console.log(roleIds);
        // 如果用户没有任何角色，则自动拒绝访问
        if (roleIds.length === 0) {
            return false;
        }

        // 查询与用户角色相关的所有权限ID
        const permissions = await rolePermission.knex().whereIn('role_id', roleIds)
        const permissionIds = permissions.map(permission => permission.permission_id);
        console.log(permissionIds);

        // 如果没有找到任何权限，则用户没有权限
        if (permissionIds.length === 0) {
            return false;
        }

        // 根据权限ID查询权限表，查找是否有匹配的slug
        const hasPerm = await permission.knex()
            .where('slug', permissionSlug)
            .whereIn('id', permissionIds)
            .first();
        return Boolean(hasPerm);
    } catch (error) {
        console.error('Error checking permissions:', error);
        throw error;
    }
};


module.exports = {
    hasPermission,
};
