const { createProxyMiddleware } = require('http-proxy-middleware');

// This is required for development in order to call the backend from the Frontend running on a react dev server
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};