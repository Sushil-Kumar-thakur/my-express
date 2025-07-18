import express from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Helper to get the full path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userFilePath = path.join(__dirname, '../data/userlog/users.json');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Read user data from file
  fs.readFile(userFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading user file');

    const users = JSON.parse(data);
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.status(401).send('Invalid email or password');

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
});

// router.get('/login', (req, res) => {
//   res.send('Please use POST /auth/login with JSON body');
// });


export default router;
