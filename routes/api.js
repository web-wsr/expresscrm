var express = require('express');
var router = express.Router();
const userController = require('./../controllers/user');

const authController = require('./../controllers/auth');

const clueController = require('./../controllers/clue');

const roleController = require('./../controllers/role');

const adminController = require('./../controllers/admin');
// 引入用户中间件
const authMiddleware = require('./../middlewares/auth');


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

// 客户相关路由
//添加客户线索数据路由
router.post('/clue', clueController.insert);

// 添加插入跟踪客户线索数据的路由
router.post('/clue/:id/log', authMiddleware.permission('clueCreate'), clueController.addLog);

// 添加修改客户线索数据的路由
router.put('/clue/:id', authMiddleware.permission('clueUpdate'), clueController.update);


// 角色相关路由
// 添加创建角色数据的api路由
router.post('/role', authMiddleware.permission('rolesCreate'), roleController.store);

// 添加编辑(修改)角色数据的api路由
router.put('/role/:id', authMiddleware.permission('rolesUpdate'), roleController.update);

// 添加删除角色数据的api路由
router.delete('/role/delete/:id', authMiddleware.permission('rolesDelete'), roleController.destroy);



// 管理员相关路由
// 添加筛选管理员角色的api路由
router.get('/admin', adminController.index)

// 添加创建管理员数据的api路由
router.post('/admin/create', authMiddleware.permission('personnelCreate'), adminController.createAdmin);

// 添加编辑管理员数据的api路由
router.put('/admin/:id', authMiddleware.permission('personnelUpdate'), adminController.update);

// 添加删除管理员数据的api路由
router.delete('/admin/delete/:id', authMiddleware.permission('personnelDelete'), adminController.destroy);





module.exports = router;
