



                                    //    Application-Level Middleware


// Middleware_Function/workingHours.js

export function workingHours(req, res, next) {
  const hour = new Date().getHours();

  // Only allow between 9AM and 6PM
  if (hour >= 9 && hour <= 18) {
    next(); // continue to next middleware or route
  } else {
    res.send(`
      <h2>⛔ Access Denied</h2>
      <p>This service is available only between 9:00 AM and 6:00 PM.</p>
    `);
  }
}
