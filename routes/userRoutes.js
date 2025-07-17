// routes/userRoutes.js

import express from 'express';
import { loginValidator } from '../Middleware_Function/loginValidator.js';

const router = express.Router();

// 🧑 Dummy user data
const users = [
  { id: 1, name: 'Sushil', city: 'Delhi' },
  { id: 2, name: 'Ravi', city: 'Mumbai' },
  { id: 3, name: 'Anita', city: 'Kolkata' }
];

// 📄 GET /users/login — Show login page
// router.get('/login', (req, res) => {
//   res.render('user_login_static'); // Render login form view
// });

// // 🛡️ POST /users/login — Validate using router-level middleware
// router.post('/login', loginValidator, (req, res) => {
//   res.send('✅ Login successful! Welcome back!');
// });

// 📋 GET /users — Return all users
router.get('/', (req, res) => {
  res.send(users); // Send array of users
});

// 🔍 GET /users/:id — Get single user by ID
router.get('/id/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('❌ User not found');
  }
});

export default router;
