const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://capstone-a5ic.onrender.com:5000',
      changeOrigin: true,
    })
  );
};
