const axios = require("axios").default;

const API_URL = "https://momeetbackend.cleverapps.io/api/clients";
// const API_URL = "http://10.0.2.2:8080/api/clients";

export const getAllUsers = async () => {
  try {
    console.log("Fetching users...");
    const response = await axios.get(API_URL);
    console.log("Users fetched successfully:", response.data.clients);
    return response.data.clients;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

export const createUser = async (user) => {
  try {
    console.log("Creating user...",user);
    const response = await axios.post(API_URL+"/create", user);
    if(response.data.success){ 
      console.log("User created successfully:", response.data.client);
      console.log("user token: ", response.data.token);
      return response.data;
    } else {
      console.log("Failed to create user:", response.data.message);
    }
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}