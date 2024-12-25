const {Client} = require('../Models/Client');
const {Message} = require('../Models/Message');

const chatController = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Associer un utilisateur à un socket
        socket.on('register', (userId) => {
            socket.userId = userId;
            console.log(`User registered: ${userId}`);
        });

        // Gérer l'envoi d'un message
        socket.on('sendMessage', async (data) => {
            const { sender, receiver, content, type } = data;

            try {
                // Stocker le message dans la base de données
                const message = new Message({
                    sender,
                    receiver,
                    content,
                    type: type || 'text', // Par défaut 'text'
                });
                await message.save();

                // Émettre le message à l'utilisateur destinataire
                io.to(receiver).emit('receiveMessage', {
                    message,
                });

                console.log(`Message sent from ${sender} to ${receiver}`);
            } catch (error) {
                console.error('Error saving message:', error);
                socket.emit('error', { message: 'Failed to send message' });
            }
        });

        // Marquer les messages comme lus
        socket.on('markAsRead', async (data) => {
            const { sender, receiver } = data;

            try {
                await Message.updateMany(
                    { sender, receiver, isRead: false },
                    { $set: { isRead: true } }
                );

                console.log(`Messages from ${sender} to ${receiver} marked as read`);
            } catch (error) {
                console.error('Error marking messages as read:', error);
                socket.emit('error', { message: 'Failed to mark messages as read' });
            }
        });

        // Déconnexion de l'utilisateur
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

module.exports = chatController;
