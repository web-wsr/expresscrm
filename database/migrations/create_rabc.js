exports.up = function (knex) {
    return knex.schema
        // 角色表
        .createTable('roles', function (table) {
            table.increments('id');
            table.string('slug').unique();
            table.string('name', 255).unique();
            table.string('description', 255);
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        // 用户角色表
        .createTable('user_roles', function (table) {
            table.increments('id');
            table.integer('user_id', 11)
            table.integer('role_id', 11)
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        // 权限分组表
        .createTable('permission_groups', function (table) {
            table.increments('id');
            table.string('name', 255).unique();
        })
        // 权限表
        .createTable('permissions', function (table) {
            table.increments('id');
            table.integer('group_id');
            table.string('slug').unique();
            table.string('name', 255).unique();
        })
        // 角色权限表
        .createTable('role_permissions', function (table) {
            table.integer('role_id', 11)
            table.integer('permission_id', 11)
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTable('roles')
        .dropTable('user_roles')
        .dropTable('permission_groups')
        .dropTable('permissions')
        .dropTable('role_permissions');
};
exports.config = {
    transaction: false
}
