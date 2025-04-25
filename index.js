const express = require('express');
const app = express();
const userRoutes = require('./src/routes/users.routes');
const productRoutes = require('./src/routes/products.routes');
const authRoutes = require('./src/routes/auth.routes')
const { verifyToken } = require('./src/middlewares/auth.middleware');

app.use(express.json());
app.use('/auth', authRoutes)
app.use('/users', userRoutes);
app.use('/products', verifyToken, productRoutes);

const port = 3000;
app.listen(port, () => console.log("Servidor iniciado em: http://localhost:3000"));