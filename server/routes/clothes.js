const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM clothes';
    const result = await pool.query(query);
    res.status(200).json({ message: 'Clothes retrieved successfully', data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving clothes', error: err.message });
  }
});

module.exports = router;
