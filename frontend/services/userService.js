const axios = require("axios").default;
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "https://momeetbackend.cleverapps.io/api/clients";

export const storeToken = async (jwt) => {
  const expirationTime = 1000 * 60 * 60 * 24 * 5; // 5 jours
  try {
    const expiryDate = new Date().getTime() + expirationTime ;
    await AsyncStorage.setItem("authToken", jwt);
    await AsyncStorage.setItem('token_expiry', expiryDate.toString());
    console.log("Token stored successfully!");
  } catch (error) {
    console.error("Error storing token", error);
  }
};

const checkTokenExpiration = async () => {
  const tokenExpiry = await AsyncStorage.getItem('token_expiry');
  const currentTime = new Date().getTime();

  if (tokenExpiry && currentTime >= parseInt(tokenExpiry)) {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('token_expiry');
    return true;
  }
  return false;
};

export const getUserByToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token !== null) {
      console.log("JWT retrieved:", token);
      const user = await axios.post(`${API_URL}/fetch`, { token });
      console.log("User fetched successfully:", user.data.client);
      return user.data.client;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.clients;
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/create`, user);
    if (response.data.success) {
      console.log("User created successfully:", response.data.client);
      return response.data;
    } else {
      console.error("Failed to create user:", response.data.message);
    }
  } catch (error) {
    console.error("Failed to create user:", error.message);
    throw error;
  }
};

export const uploadImage = async (uri) => {
  if (!uri) {
    console.log("No image URI provided.");
    return "";
  }

  const data = new FormData();
  const filename = uri.split("/").pop();
  const fileType = uri.split(".").pop();

  const validImageTypes = ["jpg", "jpeg", "png", "gif"];
  if (!validImageTypes.includes(fileType)) {
    console.error("Le fichier sélectionné n'est pas une image valide.");
    return null;
  }

  data.append("file", {
    uri,
    name: filename,
    type: `image/${fileType}`,
  });
  data.append("upload_preset", "momeet_uploads");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/ddiqmvgxy/image/upload",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Erreur lors du téléchargement de l'image:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

export const getUserById = async (userId) => {
  try {
    console.log("Fetching user...");
    if (!userId) {
      return null;
    } else {
      const response = await axios.get(`${API_URL}/${userId}`);
      console.log("User fetched successfully:", response.data.client);
      return response.data.client;
    }
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    throw error;
  }
};
