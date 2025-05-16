// index.js
const jsonServer   = require('json-server');
const server       = jsonServer.create();
const router       = jsonServer.router('db.json');
const middlewares  = jsonServer.defaults();

// Añade los middlewares (logger, CORS, etc.)
server.use(middlewares);

// Monta el router en la ruta raíz
server.use(router);

// Puerto: usa el que provea Render en process.env.PORT o 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server running on port ${port}`);
});
