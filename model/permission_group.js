const Base = require('./base.js');
// 定义用户，继承基础模型的方法
class PermissionGroup extends Base {
    constructor(props = 'permission_groups') {
        super(props);
    }
}

module.exports = new PermissionGroup();