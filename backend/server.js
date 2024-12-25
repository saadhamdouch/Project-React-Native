const express = require("express");
const db = require("./config/db");
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const chatController = require('./Controllers/ChatController');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

chatController(io);

(async () => {
     try {
       await db.connect(MONGO_URI);
       console.log('Database is ready');
   
       app.listen(PORT, () => {
         console.log(`Server is running on the port ${PORT}`);
       });
     } catch (error) {
       console.error('Failed to connect to the database or start the server:', error);
       process.exit(1);
     }
   })();