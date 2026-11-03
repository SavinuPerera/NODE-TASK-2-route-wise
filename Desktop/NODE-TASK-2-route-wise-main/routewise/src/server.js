const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('RouteWise API running on http://localhost:' + port);
});

server.on('error', (error) => {
  console.error('Server failed to start:', error.message);
  process.exit(1);
});
