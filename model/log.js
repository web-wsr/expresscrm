// 引用模型中的方法
const Base = require('./base.js');
class ClueLog extends Base {
    constructor(props = 'clue_log') {
        super(props);
    }
}

module.exports = new ClueLog();