require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/users.model');

const SECRET = process.env.JWT_SECRET;

const authenticateUser = async (username, password) => {
    const users = await userModel.getUsers();

    const user = users.find(
        user => user.username === username
    )
    if(!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return null;

    //https://jwt.io/ para decodificar o jwt
    const token = jwt.sign({ id: user.id, username: user.username}, SECRET, {expiresIn: '1h'});
    return token;
}

module.exports = {
    authenticateUser, SECRET
};