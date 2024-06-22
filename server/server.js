const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./database');

const clothesRoutes = require('./routes/clothes.js');
const ordersRoutes = require('./routes/orders.js');
const usersRoutes = require('./routes/users.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running successfully');
});

app.use('/clothes', clothesRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

module.exports = pool;
