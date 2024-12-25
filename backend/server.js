const express = require("express");
const db = require("./config/db");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;
app.use(express.json());

(async () => {
     try {
       await db.connect(MONGO_URI);
       console.log('Database is ready');
   
       // Démarrage du serveur
       app.listen(PORT, () => {
         console.log(`Server is running on the port ${PORT}`);
       });
     } catch (error) {
       console.error('Failed to connect to the database or start the server:', error);
       process.exit(1);
     }
   })();