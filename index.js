require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const userRoutes = require('./src/routes/users.routes');
const productRoutes = require('./src/routes/products.routes');
const authRoutes = require('./src/routes/auth.routes');

const setupSocketServer = require('./src/sockets');
const http = require('http');
const server = http.createServer(app);

const { verifyToken } = require('./src/middlewares/auth.middleware');
const { logRequest } = require('./src/middlewares/log.middleware');
const { limiter } = require('./src/middlewares/limiter.middleware');


app.use(express.json());
app.use(logRequest);
app.use(limiter)
app.use(cors())

//Public routes
app.use('/auth', authRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Private routes
app.use('/users', verifyToken, userRoutes);
app.use('/products', productRoutes);

setupSocketServer(server);
 
const port = process.env.PORT;
server.listen(port, () => console.log("Servidor iniciado em: http://localhost:" + port));