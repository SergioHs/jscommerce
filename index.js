require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')
const userRoutes = require('./src/routes/users.routes');
const productRoutes = require('./src/routes/products.routes');
const authRoutes = require('./src/routes/auth.routes');

const { verifyToken } = require('./src/middlewares/auth.middleware');
const { logRequest } = require('./src/middlewares/log.middleware');
const { limiter } = require('./src/middlewares/limiter.middleware');

app.use(express.json());
app.use(logRequest);
app.use(limiter)
app.use(cors())

//Public routes
app.use('/auth', authRoutes);

//Private routes
app.use('/users', verifyToken, userRoutes);
app.use('/products', verifyToken, productRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log("Servidor iniciado em: http://localhost:"+port));