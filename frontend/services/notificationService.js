const axios = require("axios").default;
// const API_URL = "https://confastservice.onrender.com/api/notifications";
const API_URL = "http://192.168.0.108:8080/api/notifications";

export const createNotification = async (notification) => {
  try {
    const response = await axios.post(`${API_URL}/create`, notification);
    if (response.data.success) {
      console.log("Notification created successfully:", response.data.message);
    } else {
      console.log("Failed to create notification", response.data.message);
    }
    // console.log(response.data);
    return response.data.success;
  } catch (error) {
    console.error("Error creating notification", error);
    return null;
  }
};

export const checkFriendChipStatus = async (userId, friendId) => {
  try {
    const response = await axios.post(`${API_URL}/checkFriendChipStatus`, {
      userId,
      friendId,
    });
    if (response.data.success) {
      console.log(
        "Friendship status checked successfully:",
        response.data.status
      );
    } else {
      console.log("Failed to check friendship status", response.data.message);
    }
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking friendship status", error);
    return null;
  }
};

export const deleteFriendRequest = async (userId, friendId) => {
  try {
    const response = await axios.post(`${API_URL}/deleteFriendRequest`, {
      userId,
      friendId,
    });
    if (response.data.success) {
      console.log(
        "Friend request deleted successfully:",
        response.data.success
      );
    } else {
      console.log("Failed to delete friend request , error from backend : ", response.data.message);
    }
    // console.log(response.data);
    return response.data.success;
  } catch (error) {
    console.error("Error deleting friend request", error);
    return null;
  }
};

export const getAllNotificationsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/fetch/${userId}`);
    if (response.data.success) {
      console.log("Notifications fetched successfully:", response.data);
    }else if(response.data.success && response.data.message){
      console.log("No notifications found");
    }else {
      console.log("Failed to fetch notifications", response.data.message);
      return null;
    }
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications", error);
    return null;
  }
}