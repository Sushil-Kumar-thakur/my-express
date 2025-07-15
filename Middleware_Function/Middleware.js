// Middleware.js

export function timeLogger(req, res, next) {
  req.timeVisited = new Date().toLocaleString(); // Add visit time to request 
  next();
  console.log(`[⏰] /contact visited at: ${time}`); 
}
