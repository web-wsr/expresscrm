// 页面相关路由
var express = require('express');
var router = express.Router();

const userController = require('./../controllers/user');
const authController = require('./../controllers/auth');
const clueController = require('./../controllers/clue');

const permissionsController = require('./../controllers/permissions');

const roleController = require('./../controllers/role');

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
router.get('/admin/user', authMiddleware.mustLogin, authMiddleware.mustRoot, userController.show)
// 用户管理 -- 创建用户页
router.get('/admin/user/create', authMiddleware.mustLogin, authMiddleware.mustRoot, userController.renderUserCreate)
// 用户管理 -- 编辑用户页
router.get('/admin/user/:id/edit', authMiddleware.mustLogin, authMiddleware.mustRoot, userController.renderEdit)
// 线索管理 -- 线索列表页
router.get('/admin/clue', authMiddleware.mustLogin, clueController.show)
// 线索管理 -- 线索记录页
router.get('/admin/clue/:id', authMiddleware.mustLogin, clueController.logShow)

// 添加查看全部权限的路由
router.get('/admin/permissions', permissionsController.index)

// 角色管理 -- 角色列表页
router.get('/admin/role', roleController.index)
// 角色管理 -- 角色创建页
router.get('/admin/role/create', roleController.renderRoleCreate)
// 角色管理 -- 角色详情页（可编辑）
router.get('/admin/role/:id/edit', roleController.show)


// 登录管理 -- 登录跳转页
router.get('/admin/login', authController.renderLogin)
module.exports = router;


