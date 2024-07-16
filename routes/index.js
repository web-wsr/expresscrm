// 页面相关路由
var express = require('express');
var router = express.Router();

const userController = require('./../controllers/user');
const authController = require('./../controllers/auth');
const clueController = require('./../controllers/clue');

const roleController = require('./../controllers/role');

const adminController = require('./../controllers/admin');

// 引入用户中间件
const authMiddleware = require('./../middlewares/auth');
const role = require('../model/role');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 登陆页
// router.get('/admin/login', function (req, res, next) {
//   res.render('admin/login');
// })
// 用户管理 -- 用户列表页
// router.get('/admin/user', authMiddleware.mustLogin, authMiddleware.mustRoot, userController.show)
// // 用户管理 -- 创建用户页
// router.get('/admin/user/create', authMiddleware.mustLogin, authMiddleware.mustRoot, userController.renderUserCreate)
// // 用户管理 -- 编辑用户页
// router.get('/admin/user/:id/edit', authMiddleware.mustLogin, authMiddleware.mustRoot, userController.renderEdit)
// 线索管理 -- 线索列表页
router.get('/admin/clue', authMiddleware.mustLogin, authMiddleware.permission('clueList'), clueController.show)
// 线索管理 -- 线索记录页
router.get('/admin/clue/:id', authMiddleware.mustLogin, authMiddleware.permission('clueTrack'), clueController.logShow)



// 角色管理 -- 角色列表页
router.get('/admin/role', authMiddleware.mustLogin, authMiddleware.permission('rolesList'), roleController.index)
// 角色管理 -- 角色创建页
router.get('/admin/role/create', authMiddleware.mustLogin, authMiddleware.permission('rolesCreate'), roleController.renderRoleCreate)
// 角色管理 -- 角色详情页（可编辑）
router.get('/admin/role/:id/edit', authMiddleware.mustLogin, authMiddleware.permission('rolesShow'), roleController.show)


// 管理员管理 -- 管理员列表页
router.get('/admin/admin', authMiddleware.mustLogin, authMiddleware.permission('personnelList'), adminController.index)
// 管理员管理 -- 管理员创建页
router.get('/admin/admin/create', authMiddleware.mustLogin, authMiddleware.permission('personnelCreate'), adminController.renderAdminCreate)

// 管理员管理 -- 管理员编辑页
router.get('/admin/admin/:id/edit', authMiddleware.mustLogin, authMiddleware.permission('personnelUpdate'), adminController.renderEdit)


// 测试测试 查找相应角色管理员!!!!!!!!!!!!!!!!!!
// router.get('/admin/find', adminController.find)


// 登录管理 -- 登录跳转页
router.get('/admin/login', authController.renderLogin)
module.exports = router;






