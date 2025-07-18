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
  req.userRole = 'admin';
  req.session.userName = username.charAt(0).toUpperCase() + username.slice(1) + " 😊";
  req.session.role = 'admin';
  return next();
}

// Regular user login
  if (username === 'rahul' && password === '1234') {
  req.userRole = 'user';
  req.session.userName = username.charAt(0).toUpperCase() + username.slice(1) + " 😊";
  req.session.role = 'user';
  return next();
}

  // Invalid credentials
  return res.render('user_login_static', {
    error: '⚠️ Invalid username or password. Please try again.',
  });
}

