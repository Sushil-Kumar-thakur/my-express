// Middleware_Function/user_login_static.js

export function user_login_static(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('user_login_static', { error: '⚠️ Username and Password are required.' });
  }

  if (username !== 'sushil' || password !== '1234') {
    return res.render('user_login_static', { error: '⚠️ Username and Password are invalid.' });
  }

  next(); // ✅ Go to final route
}
