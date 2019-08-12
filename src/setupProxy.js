const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/master/**', {
            target: 'https://www.runoob.com/',
            changeOrigin: true,
        }),
    )
    app.use(
        proxy('/fans/**', {
            target: 'https://easy-mock.com/mock/5c0f31837214cf627b8d43f0/',
            changeOrigin: true,
        }),
    )
}
