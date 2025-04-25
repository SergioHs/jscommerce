const jwt = require('jsonwebtoken');
const { SECRET } = require('../services/auth.service');

const verifyToken = (request, response, next) => {

    const authHeader = request.headers.authorization;
    if(!authHeader){
        response.status(401).json({ error: 'Token not provided'});
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).json({ error: 'Token inválido ou expirado'});
    }
};

module.exports = {
    verifyToken
}
