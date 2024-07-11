const Base = require('./base.js');
// 定义用户，继承基础模型的方法
class Permission extends Base {
    constructor(props = 'permissions') {
        super(props);
    }
}

module.exports = new Permission();