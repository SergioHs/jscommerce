const { Server } = require('socket.io');

const setupSocketServer = (server) => {

    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    const users = new Map();
    //logica de funcionamento do map (chave - valor)
    //1s1a5s1a5s1a - carlos

    io.on('connection', (socket) =>{
        console.log('Usuario conectado:' + socket.id);

        socket.on('setUsername', (username) => {
            //adiciona codigo e nome no Map
            users.set(socket.id, username);
            socket.emit('usernameSet', {
                success: true,
                username: username,
                message: `Bem vindo, ${username}`
            })
            console.log(`Usuario ${socket.id} definiu o nome como ${username}`);
        })

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId)
            //obtém o nome pelo código user.get
            const username = users.get(socket.id) || 'Anônimo';
            io.to(roomId).emit('userJoined', {
                message: `${username} entrou na sala`,
                sender: username,
                userId: socket.id
            })
        })

        socket.on('sendMessage', ({ roomId, message}) => {
            const username = users.get(socket.id) || 'Anônimo';

            console.log(message);
            //logica de chatbot
            //chama a api com a mensagem do usuario
            //invoca o proprio socket com a mensagem recebida
            
            io.to(roomId).emit('receiveMessage', {
                message,
                sender: username,
                userId: socket.id
            })
        })

        socket.on('disconnect', () => {
            const username = users.get(socket.id) || 'Anônimo';
            console.log(`Usuário desconectado ${username}`);
            users.delete(socket.id);
        })
    })
}

module.exports = setupSocketServer;