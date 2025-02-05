import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import * as api from "../services/userService";

 const SOCKET_URL = "https://confastserverchat.onrender.com";
// const SOCKET_URL = "http://localhost:8080";

// Création du contexte
const SocketContext = createContext(null);

// Fournisseur de contexte
export const SocketProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onLineUsers, setOnlineUsers] = useState([]);
  const [NewMessage, setNewMessage] = useState({});
  const [userCalling, setUserCalling] = useState(null);
  const [socket, setSocket] = useState(null);

  // Vérifie si le token est expiré
  const isConnexionExpired = async () => {
    const isExpired = await api.checkTokenExpiration();
    if (isExpired) {
      navigation.navigate("Login");
    }
  };

  // Récupère l'utilisateur actuel
  const getUser = async () => {
    try {
      const getUserByToken = await api.getUserByToken();
      setUser(getUserByToken);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Initialisation de l'utilisateur
  useEffect(() => {
    isConnexionExpired();
    getUser();
  }, []);

  // Gestion du socket
  useEffect(() => {
    if (user && !socket) {
      // Crée une nouvelle instance de socket uniquement si elle n'existe pas déjà
      const newSocket = io(SOCKET_URL, {
        auth: { user },
        transports: ["websocket"], // Utiliser uniquement WebSocket
      });

      // Sauvegarde le socket dans l'état
      setSocket(newSocket);

      // Gère les événements de connexion et déconnexion
      newSocket.on("connect", () => {
        console.log("Connecté au socket serveur avec ID :", newSocket.id);
      });

      newSocket.on("onlineUser", (data) => {
        setOnlineUsers(data);
      });

      newSocket.on("new message", (data) => {
        setNewMessage(data);
      });

      newSocket.on("Call", (UserCallData) => {
        setUserCalling(UserCallData.UserCallData);
      });

      // Nettoie les écouteurs d'événements lors du démontage
      return () => {
        newSocket.disconnect(); // Déconnecte le socket proprement
        console.log("Socket déconnecté");
      };
    }
  }, [user]); // Déclenché uniquement lorsque `user` change

  return (
    <SocketContext.Provider
      value={{ socket, user, onLineUsers, NewMessage, userCalling }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useSocket = () => {
  return useContext(SocketContext);
};