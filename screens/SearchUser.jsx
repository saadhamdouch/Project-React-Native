import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as api from "../services/userService";

const SearchUser = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [client, setClient] = useState(null);

  // Mock API data
  const mockUsers = [
    {
      _id: "1",
      username: "john_doe",
      email: "john@example.com",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      _id: "2",
      username: "jane_smith",
      email: "jane@example.com",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      _id: "3",
      username: "bob_johnson",
      email: "bob@example.com",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      _id: "4",
      username: "alice_williams",
      email: "alice@example.com",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      _id: "5",
      username: "charlie_brown",
      email: "charlie@example.com",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  const findOne = async () => {
    try {
      const user = await api.getUserByToken();
      if (!user) {
        console.error("User undefined");
        return;
      }
      setClient(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    findOne();
  }, []);

  useEffect(() => {
    // Simulating API call to get suggested users
    setSuggestedUsers(mockUsers);
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleFetchUsersSearched = async (text) => {
    console.log("text : ", text);
    if (text.trim() != "") {
      const users = await api.getSearchUsers(text);
      setSearchedUsers(users);
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => {
        navigation.navigate("VisitedProfile", {
          friend: item,
          clientId: client._id,
        });
      }}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={24}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={handleSearch}
          maxLength={50}
          onBlur={() => {
            handleFetchUsersSearched(searchQuery);
          }}
        />
      </View>
      {searchedUsers && searchedUsers.length > 0 && (
        <FlatList
          data={searchedUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id}
          style={styles.userList}
        />
      )}
      {!searchedUsers && (
        <View style={{ display: "flex",justifyContent: "center"}}>
          <Text style={{ color: "gray", fontSize: 20, fontWeight: "600", textAlign: "center" }}>
            No Results
          </Text>
        </View>
      )}
      <View style={{ marginLeft: 20 }}>
        <Text style={{ color: "purple", fontSize: 20, fontWeight: "600" }}>
          you may know
        </Text>
      </View>
      <FlatList
        data={suggestedUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item._id}
        style={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    margin: 10,
    paddingHorizontal: 15,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  userList: {
    marginTop: 10,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
});

export default SearchUser;
