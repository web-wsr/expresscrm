// 新建用户中间件，并设置判断是否登录的逻辑
const userService = require('./../services/user')
const authMiddleware = {
    mustLogin: function (req, res, next) {
        if (!res.locals.isLogin) {
            res.redirect('/admin/login');
            return;
        }
        next()
    },

    mustRoot: function (req, res, next) {
        if (res.locals.userInfo.role == 2) {
            res.writeHead(403);
            res.end('403 Forbidden')
            return
        }
        next()
    },
    permission: function (permission) {
        return async function (req, res, next) {
            const user_id = res.locals.userInfo.id;
            console.log(user_id);
            const hasPermission = await userService.hasPermission(user_id, permission)
            console.log(hasPermission);
            if (hasPermission) {
                next();
            } else {
                return res.status(403).json({
                    error_code: 403,
                    // message: 'Auth Forbidden'
                    message: '权限不足'
                })
            }
        }
    },
}

// 暴露
module.exports = authMiddleware;