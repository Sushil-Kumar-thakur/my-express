import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send('Missing Authorization header');

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // make available to route
    next();
  } catch (err) {
    res.status(403).send('Invalid or expired token');
  }
};
