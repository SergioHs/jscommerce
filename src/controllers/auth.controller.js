const authService = require('../services/auth.service');

const login = async (request, response) => {
    const { username, password } = request.body;

    try {
        const token = await authService.authenticateUser(username, password);
        if(!token){
            return response.status(401).json({ error: 'Credenciais inválidas'});
        }
        response.status(200).json({token});
    } catch (error) {
        response.status(500).json({ message: 'Erro interno do servidor: ' + error.message });

    }
}

module.exports = {
    login
}