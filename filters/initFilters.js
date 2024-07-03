module.exports = function (req, res, next) {
    res.locals.seo = {
        title: 'expressCrm',
        keywords: 'crm',
        description: 'express-crm'
    }
    next();
}