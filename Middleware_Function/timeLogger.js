
                                    //    Application-Level Middleware

// Middleware_Function/timeLogger.js

export function timeLogger(req, res, next) {
  const time = new Date().toLocaleString();
  console.log(`🕒 ${req.method} ${req.originalUrl} - Visited at: ${time}`);
  next();
}
