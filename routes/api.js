var express = require('express');
var router = express.Router();
const userController = require('./../controllers/user');

const authController = require('./../controllers/auth');

const clueController = require('./../controllers/clue');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 添加插入用户数据的路由
router.post('/user', userController.insert);

// 添加修改用户数据的路由
router.put('/user/:id', userController.update);

// 添加登录数据路由
router.post('/login', authController.login);

// 添加退出登录的路由
router.post('/logout', function (req, res, next) {
  res.clearCookie('token', null);
  res.send({
    code: 0,
    message: '退出成功'
  });
});

//添加线索数据路由
router.post('/clue', clueController.insert);

// 添加插入跟踪客户线索数据的路由
router.post('/clue/:id/log', clueController.addLog);

// 添加修改客户线索数据的路由
router.put('/clue/:id', clueController.upadte);


module.exports = router;
