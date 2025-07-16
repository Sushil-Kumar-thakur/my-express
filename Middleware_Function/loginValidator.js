    
    
    
    //                                                  Router-Level Middleware
    

// Middleware_Function/loginValidator.js

export function loginValidator(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('user_login_static', { error: '⚠️ Username and Password are required.' });
  }

  if (username !== 'sushil' || password !== '1234') {
    return res.render('user_login_static', { error: '❌ Invalid credentials.' });
  }

  next(); // Credentials are valid, proceed to route handler
}


