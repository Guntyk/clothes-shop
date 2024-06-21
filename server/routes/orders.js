const express = require('express');
const router = express.Router();
const pool = require('../database');
const format = require('pg-format');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.status(200).json({ message: 'Orders retrieved successfully', data: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/new', async (req, res) => {
  const { name, phone, order, price } = req.body;

  try {
    await pool.query('BEGIN');

    const insertOrderQuery = `
    INSERT INTO orders (name, phone, price, products)
    VALUES ($1, $2, $3, $4)
    RETURNING id`;

    const orderValues = [name, phone, price, order];
    const { rows } = await pool.query(insertOrderQuery, orderValues);
    const orderId = rows[0].id;

    await pool.query('COMMIT');

    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteOrderQuery = `
      DELETE FROM orders WHERE id = $1
      RETURNING *`;
    const result = await pool.query(deleteOrderQuery, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully', data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error deleting order', error: err.message });
  }
});

module.exports = router;
