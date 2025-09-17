const jwt = require('jsonwebtoken');
const logger = require('./logger');

const jwtSecret = process.env.JWT_SECRET || 'secret';

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    logger.error('JWT verification failed', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
