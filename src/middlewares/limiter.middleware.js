const rateLimit = require('express-rate-limit');
require('dotenv').config();

const minutos = process.env.RATE_LIMIT_MINUTOS;
const quantidade = process.env.RATE_LIMIT_QUANTIDADE;

const limiter = rateLimit({
    windowMs: minutos * 60 * 1000,
    max: quantidade,
    message: "Muitas requisições deste IP. Tente novamente mais tarde",
    stardardHeaders: true,
    legacyHeaders: false
})

module.exports = {
    limiter
};