// controllers/	Intermedia a requisição, chama os services e envia resposta (JSON + status).

const usersService = require('../services/users.service');

const getAllUsers = async (request, response) => {
    try {
        const users = await usersService.getAllUsers();
        return response.status(200).json(users);
    } catch (error) {
        console.error(error);
        if (error.message === 'Usuários não encontrados') {
            return response.status(404).json({ message: error.message });
        }
        response.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
    }
};

const createUser = async (request, response) => {
    const { username, email, password } = request.body;

    try {
        if(!username || !email || !password) {
            return response.status(400).json({ error: 'Argumentos inválidos'});
        }

        const user = await usersService.saveUser({ username, email, password});

        if(!user){
            return response.status(409).json({ error: 'Usuário já existe'});
        }

        response.status(201).json(user);
    } catch (error) {
        response.status(500).json({ message: 'Erro interno do servidor: ' + error.message });
        
    }
}

module.exports = {
    getAllUsers,
    createUser
};