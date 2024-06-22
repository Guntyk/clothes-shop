const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../database');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserQuery = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
    const values = [username, email, hashedPassword];
    const result = await pool.query(newUserQuery, values);

    res.status(201).json({
      message: 'User created successfully',
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    if (err.code === '23505') {
      res.status(400).json({ message: 'За цією поштою вже є зареєстрований обліковий запис', error: err.message });
    } else {
      res.status(500).json({ message: 'Error creating user', error: err.message });
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUserQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(findUserQuery, [email]);

    if (userResult.rowCount === 0) {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    res.status(200).json({
      message: 'Login successful',
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

module.exports = router;
