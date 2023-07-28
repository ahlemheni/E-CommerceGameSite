const express = require('express');

const mongoose = require('mongoose');
const UserRoutes = require('./Routes/UserRoutes');
const ProductRoutes = require('./Routes/ProductRoutes');
const GenreRoutes = require('./Routes/GenreRoutes');
const ShoppingRoutes = require('./Routes/ShoppingCartRoutes');
const ContactRoutes = require('./Routes/ContactRoutes');

const OrderRoutes=require('./Routes/OrderRoutes')
const cookieParser = require('cookie-parser');

const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' })); 
app.use(cookieParser());

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to the database...');
  })
  .catch((err) => {
    console.log(`An error has occurred while trying to connect to the database: ${err}`);
  });


app.use(UserRoutes);
app.use(ProductRoutes);
app.use(GenreRoutes);
app.use(ShoppingRoutes);
app.use(ContactRoutes);
app.use(OrderRoutes)



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}...`);
});
