const logger = require('./logger');

exports.errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message || err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error'
  });
};
