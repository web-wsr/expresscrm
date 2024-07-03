// 新建用户中间件，并设置判断是否登录的逻辑
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
    }
}

// 暴露
module.exports = authMiddleware;