const express = require('express');
const router = express.Router();
const pool = require('../database');
const format = require('pg-format');

router.post('/new', async (req, res) => {
  const { name, phone, order, price } = req.body;

  const productsArray = order.map((product) => `(${product.id}, ${product.amount})`).join(',');
  const formattedProducts = format('ARRAY[%s]::clothing_amount[]', productsArray); // Форматирование строки

  try {
    await pool.query('BEGIN');

    const insertOrderQuery = format(
      `
        INSERT INTO orders (name, phone, price, products)
        VALUES (%L, %L, %L, %s)
        RETURNING id`,
      name,
      phone,
      price,
      formattedProducts
    );

    const { rows } = await pool.query(insertOrderQuery);
    const orderId = rows[0].id;

    await pool.query('COMMIT');

    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});

module.exports = router;
