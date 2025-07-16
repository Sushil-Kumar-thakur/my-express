export function timeLogger(req, res, next) {
  const time = new Date().toLocaleString(); // store the current time
  req.timeVisited = time;                   // attach to request object
  console.log(`[⏰] /contact visited at: ${time}`); // log it
  next(); // move to next middleware/route
}
