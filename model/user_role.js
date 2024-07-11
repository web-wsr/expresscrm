const Base = require('./base.js');
// 定义用户，继承基础模型的方法
class userRole extends Base {
    constructor(props = 'user_roles') {
        super(props);
    }
}

module.exports = new userRole();