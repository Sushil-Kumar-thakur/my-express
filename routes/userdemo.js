import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.get('/:numbers', (req, res) => {
  res.send(`brother you will do it, you just do work  ${req.params.numbers}`);
});

export default router;
