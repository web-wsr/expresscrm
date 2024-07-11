const Base = require('./base.js');
// 定义用户，继承基础模型的方法
class rolePermission extends Base {
    constructor(props = 'role_permissions') {
        super(props);
    }
}

module.exports = new rolePermission();