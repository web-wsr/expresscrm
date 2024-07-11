const Base = require('./base.js');
// 定义用户，继承基础模型的方法
class Role extends Base {
    constructor(props = 'roles') {
        super(props);
    }
}

module.exports = new Role();