//services/	Onde mora a lógica de negócio real, como validações, filtros, cálculos etc.

const usersModel = require('../models/users.model');
const bcrypt = require('bcryptjs');

const getAllUsers = async () => {
    const users = await usersModel.getUsers();
    if (!users || users.length === 0) {
        throw new Error('Usuários não encontrados');
    }
    return users;
};

const saveUser = async ({ username, email, password}) => {
    const users = await usersModel.getUsers();

    const userExists = users.some(
        user => 
            user.username === username ||
            user.email === email
    )
    if(userExists) return null;

    const hashedPassword = await bcrypt.hash(password, 10);

    //todo users.length + 1 pode dar problema :(
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    await usersModel.saveUsers(users);

    const { password: _, ...safeUser} = newUser;
    return safeUser;
}

module.exports = {
    getAllUsers,
    saveUser
};