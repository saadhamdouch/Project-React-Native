const axios = require("axios").default;
const API_URL = 'https://momeetbackend.cleverapps.io/api/messages';

export const getMessages = async ({ sender, receiver }) => {
  try {
    const response = await axios.post(API_URL, { sender, receiver });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};
