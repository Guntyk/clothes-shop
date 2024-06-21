const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./database');

const clothesRoutes = require('./routes/clothes.js');
const ordersRoutes = require('./routes/orders.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.use('/clothes', clothesRoutes);
app.use('/orders', ordersRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

module.exports = pool;
