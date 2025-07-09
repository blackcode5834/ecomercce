const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));

const products = require('./products.json');

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(3000, () => console.log('Server running on port 3000'));
