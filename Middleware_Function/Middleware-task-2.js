export const workingHoursMiddleware = (req, res, next) => {
  const hour = new Date().getHours(); // Current hour (0–23)

  if (hour >= 9 && hour < 17) {
    console.log('✅ Access allowed - within working hours');
    next(); // Continue to the route
  } else {
    console.log('⛔️ Access blocked - outside working hours');
    res.status(403).send('⛔️ Access denied: Site closed');
  }
};
