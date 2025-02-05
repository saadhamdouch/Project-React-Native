const axios = require("axios").default;
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = 'https://momeetbackend.cleverapps.io/api/posts';

export const getPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};

export const handleLikeApi = async ({postId , userId }) => {
  const response = await axios.post(`${API_URL}/like`, { postId, userId })
}

export const handlesaveApi = async ({postId , userId }) => {
  const response = await axios.post(`${API_URL}/save`, { postId, userId })
}

export const getpostesliked = async (userId) => { 
  const response = await axios.get(`${API_URL}/likes/${userId}`);
  return response.data;
};
