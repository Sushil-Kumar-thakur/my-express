// index.js
import express from 'express';
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

app.get("/login", (req, res) => {
  res.render('user_login_static');
});

app.post("/login", user_login_static, (req, res) => {
  if (req.userRole === 'admin') {
    return res.send('🔐 Welcome Admin!');
  } else if (req.userRole === 'user') {
    return res.send('👋 Welcome User!');
  } else {
    return res.send('⚠️ Unknown Role');
  }
});

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
