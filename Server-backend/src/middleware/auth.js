const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  // This is a simple token validation.
  if (token !== 'test-token') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
};

module.exports = auth;