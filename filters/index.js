// 注册app的过滤器
module.exports = function (app) {
    app.use(require('./initFilters.js'))
    app.use(require('./loginFilters.js'))
}