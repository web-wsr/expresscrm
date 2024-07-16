// 引入加密和解密模块
const JWT = require('jsonwebtoken');
// 定义密钥
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    res.locals.isLogin = false;
    res.locals.userInfo = {}

    // 判断ac cookie是否存在
    let token = req.cookies.token;
    if (token) {
        // 存在，就对用户的电话，密码和id和角色和名字进行解密
        JWT.verify(token, JWT_SECRET, (err, decode) => {
            if (!err) {
                res.locals.isLogin = true;
                res.locals.userInfo = {
                    phone: decode.user_phone,
                    password: decode.user_password,
                    id: decode.user_id,
                    // role: decode.user_role,
                    slug: decode.slug,
                    name: decode.user_name

                }
                next()
            } else {
                next()
            }
        })
        return;
    }
    next()
}