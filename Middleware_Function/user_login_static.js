// Middleware_Function/user_login_static.js

export function user_login_static(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('user_login_static', {
      error: '⚠️ Username and Password are required.',
    });
  }

  // Admin login
  if (username === 'sushil kumar' && password === '4321') {
    req.userRole = 'admin';  // Store role in request
    return next();
  }

  // Regular user login
  if (username === 'rahul' && password === '1234') {
    req.userRole = 'user';   // Store role in request
    return next();
  }

  // Invalid credentials
  return res.render('user_login_static', {
    error: '⚠️ Invalid username or password.',
  });
}

