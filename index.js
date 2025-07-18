// index.js
import express from 'express';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

import { timeLogger } from './Middleware_Function/timeLogger.js';
import { workingHours } from './Middleware_Function/workingHours.js';
import { user_login_static } from './Middleware_Function/user_login_static.js';
import userdemo from './routes/userdemo.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// CONFIGURATION
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mySecretKey123',  // 🔒 change this in production  //  session   run  time   important middleware
  resave: false,
  saveUninitialized: true
}));
 app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store'); //          session   run  time   important middleware
  next();
});
 

// Load users from JSON (if needed)
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

// MIDDLEWARE
app.use(timeLogger);
app.use(workingHours);
app.use('/id', userdemo);

// ROUTES
app.get("/", (req, res) => {
  res.render('index', {
    name: "Sushil",
    age: 25
  });
});

                                        // login route


app.get("/login", (req, res) => {
  res.render('user_login_static');
});
function requireLogin(req, res, next) {//          session   run  time   important middleware
  if (req.session && req.session.userName) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.post("/login", user_login_static,requireLogin, (req, res) => {
  if (req.userRole === 'admin') {
    return res.redirect('/login/admin');
  } else if (req.userRole === 'user') {
    return res.redirect('/login/user');
  } else {
    return res.status(403).send('⚠️ Unknown Role: Access Denied');
  }
});
// Admin Dashboard
app.get('/login/admin', (req, res) => {
  if (req.session.role !== 'admin') {
    // return res.status(401).send('❌ Access Denied');
     return res.redirect('/login');
  }

  res.render('admin', {
    userName: req.session.userName,
    totalUsers: 20,
    activeSessions: 5,
    recentLogs: ['Admin logged in', 'User added', 'Database synced']
  });
});

// User Dashboard
app.get('/login/user', (req, res) => {
  if (req.session.role !== 'user') {
    // return res.status(401).send('❌ Access Denied');
    return res.redirect('/login');
  }

  res.render('user_home', {
    name: req.session.userName
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy( (err) => {
    if (err) {
      return res.status(500).send('Error logging out');
      }
    res.redirect('/login');
  });
});





// app.get('/call',(req ,res) =>{
//   res.render('call');
// });
// app.get('/call/:id', (req, res) => {
//   res.render('call', {
//     id: req.params.id
//     });
//     });

app.get('/call',(req ,res) =>{
  res.send('call');
});
app.get('/call/:id', (req, res) => {
  res.send(`brother you will do it, you just do work and you do it    ${req.params.id}`)
    });
    


// // GET method route
// app.get('/qwe', (req, res) => {
//   res.send('GET request to the homepage')
// })

// // POST method route
// app.post('/qwe', (req, res) => {
//   res.send('POST request to the homepage')
// })



// Log every request time
 
// User Routes
app.use('/users', userRoutes);

// Error Handlers
app.get('/error', (req, res) => {
  throw new Error("💥 Something went wrong!");
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.error("🔥 Error caught:", err.message);
  res.status(500).render('error', { message: "Something went wrong" });
});

app.use((req, res) => {
  res.status(404).render('error', { message: "🚫 Page Not Found" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
