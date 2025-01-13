const axios = require("axios").default;
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "https://momeetbackend.cleverapps.io/api/posts";

export const getAllPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error.message);
    throw error;
  }
};