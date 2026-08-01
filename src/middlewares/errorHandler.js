function notFoundHandler(req, res) {
  res.status(404).json({ message: 'Rota não encontrada.' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
