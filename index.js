const express = require('express');
const app = express();
const userRoutes = require('./src/routes/users.routes');
const productRoutes = require('./src/routes/products.routes');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);

const port = 3000;
app.listen(port, () => console.log("Servidor iniciado em: http://localhost:3000"));