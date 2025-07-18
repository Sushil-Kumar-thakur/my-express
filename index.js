import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { checkAuth } from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(express.json());

// Public Login Route
app.use('/auth', authRoutes);

 

// Protected Route
app.get('/dashboard', checkAuth, (req, res) => {
  res.send(`Welcome ${req.user.email} to your dashboard.`);
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
