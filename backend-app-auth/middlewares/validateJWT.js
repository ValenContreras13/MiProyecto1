const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) {
    return res.status(401).json({ ok: false, msg: 'No token provided' });
  }

  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ ok: false, msg: 'Invalid token format' });
  }

  try {
    const { userData } = jwt.verify(parts[1], process.env.SECRET_KEY);
    req.uid = userData;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, msg: 'Invalid token' });
  }
};

module.exports = validateJWT;
