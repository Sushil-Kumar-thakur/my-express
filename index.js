// index.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { timeLogger } from './Middleware_Function/Middleware.js';
import { workingHoursMiddleware } from './Middleware_Function/Middleware-task-2.js';
import { validateForm } from './Middleware_Function/validate.js';
import methodOverride from 'method-override'; 
import expressLayouts from 'express-ejs-layouts';

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============ CONFIG ============
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.use(expressLayouts); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ============ LOAD USERS ============
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

// ============ ROUTES ============

app.get('/', (req, res) => {
  res.send('🏠 Home Page');
});

app.get('/about', (req, res) => {
  res.send('ℹ️ About Page');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/contact-visit', timeLogger, (req, res) => { 
  res.send(`📞 Contact Page - Visited at ${req.timeVisited}`);
});

app.get('/enter', (req, res) => {
  res.render("index", { age: 25, name: 'Sushil', city: 'Delhi' });
});

app.get('/compeny-open', workingHoursMiddleware, (req, res) => {
  res.send('✅ Welcome! You accessed during working hours.');
});

// ➤ Show login form
app.get('/form', (req, res) => {
  res.render('search', { title: 'Login | AI Tool' });
});

// ➤ Handle login form (GET)
app.get('/search', (req, res, next) => {
  req.body = req.query;
  validateForm(req, res, () => {
    const { name } = req.query;
    res.render('success', { title: 'Success', name });
  });
});

app.get('/student/:user', (req, res) => {
  res.send(`student name - <h1>${req.params.user}</h1>`);
});

app.get('/student/:name/:city', (req, res) => {
  const { name, city } = req.params;
  res.send(`${name} lives in ${city}`);
});

app.get('/services', (req, res) => {
  res.json({ web: true, mobile: false, desktop: true });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  user ? res.json(user) : res.status(404).send('User not found');
});

app.get('/user-details', (req, res) => {
  res.render('register', {
    title: 'User Registration',
    currentRoute: '/user-details'
  });
});

app.post('/register', (req, res) => {
  const { name, email, city } = req.body;
  const rawData = fs.readFileSync('./data/users.json');
  const users = JSON.parse(rawData);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    city
  };

  users.push(newUser);
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2)); 

  res.redirect(`/success?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}&email=${encodeURIComponent(email)}`);
});

app.get('/success', (req, res) => {
  const { name, city } = req.query;
  res.render('success', {
    name,
    city
  });
});

app.get('/edit/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  res.render('update', { user });
});

app.put('/update/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, city } = req.body;

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { id: userId, name, email, city };
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
    res.render('update_successfully');
  } else {
    res.status(404).send('❌ User not found');
  }
});

// ============ RESTful Routes ============
app.post('/submit', (req, res) => res.send('✅ Data received via POST'));
app.put('/update', (req, res) => res.send('🛠️ Data updated with PUT'));
app.delete('/delete', (req, res) => res.send('❌ Item deleted with DELETE'));

// ============ Error Handling ============
app.get('/error', (req, res) => {
  throw new Error("💥 Something went wrong!");
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(500).render('error', { error: err });
});

app.use((req, res) => {
  res.status(404).send("🚫 Page Not Found");
});

// ============ Start Server ============
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
