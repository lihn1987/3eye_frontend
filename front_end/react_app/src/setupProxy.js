const { createProxyMiddleware } = require('http-proxy-middleware');  //注意写法，这是1.0以后的版本，最好按抄

module.exports = function (app) {
    app.use(createProxyMiddleware('/api',
        {
            target: 'http://localhost:9979/',
            pathRewrite: {
                '^/api': '',
            },
            changeOrigin: true,
        }
    ));
}