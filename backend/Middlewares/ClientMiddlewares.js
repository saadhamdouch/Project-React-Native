const {Client} = require('../Models/Client');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
     const token = req.headers['auth']?.split(' ')[1];
     if (!token) return res.status(401).json({ error: 'Accès non autorisé' });
 
     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) return res.status(403).json({ error: 'Token invalide ou expiré' });
         req.user = decoded; // Inclure les données décodées pour une utilisation future
         next();
     });
 };
 
 module.exports = { authenticateToken };