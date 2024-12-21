import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const Home = () => {
  const Friends = [
    {
      id: 1,
      firstName: "Lamiae",
      lastName: "Nouri",
      contact: "0688997766",
      lastMessage: "Salut, comment ça va ?",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
    {
      id: 2,
      firstName: "Youssef",
      lastName: "Amrani",
      contact: "0611223344",
      lastMessage: "Je suis en route, à tout de suite !",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
    {
      id: 3,
      firstName: "Aya",
      lastName: "El Haddadi",
      contact: "0655443322",
      lastMessage: "Tu viens ce soir ?",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
    {
      id: 4,
      firstName: "Khalid",
      lastName: "Oubella",
      contact: "0600112233",
      lastMessage: "N'oublie pas de m'appeler demain.",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
    {
      id: 5,
      firstName: "Sara",
      lastName: "Benmoussa",
      contact: "0677889900",
      lastMessage: "Merci pour hier, c'était super !",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
    {
      id: 6,
      firstName: "Omar",
      lastName: "El Fassi",
      contact: "0667009900",
      lastMessage: "Je t'enverrai les infos bientôt.",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
    {
      id: 7,
      firstName: "Zineb",
      lastName: "Chraibi",
      contact: "0633445566",
      lastMessage: "Peux-tu m'envoyer l'adresse ?",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
    {
      id: 8,
      firstName: "Ahmed",
      lastName: "Lahlou",
      contact: "0612345678",
      lastMessage: "Je suis occupé pour le moment, on en parle plus tard.",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
    {
      id: 9,
      firstName: "Fatima",
      lastName: "Bennis",
      contact: "0688123456",
      lastMessage: "On se voit à 18h au café.",
      image:
        "https://img.freepik.com/photos-gratuite/scene-style-anime-gens-montrant-affection-exterieur-dans-rue_23-2151500144.jpg?t=st=1734486242~exp=1734489842~hmac=51b200deeca78e9e7d9398a106da6ecd9fe33481161cf8926657b2905b3f00d9&w=1060",
      time : "21 -12 - 2024 | 12:30"
    },
  ];

  const Friend = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View>
          <View style={styles.name}>
            <Text style={{fontWeight: "600"}}>{item.firstName}</Text>
            <Text style={{fontWeight: "600"}}>{item.lastName}</Text>
          </View>
          <View style={{flexDirection: "row"}}>
            <Text style={{fontWeight: "600"}}>Last Message : {item.lastMessage.slice(0,25)}</Text>
            {item.lastMessage.length > 25 ? <Text> ... </Text> : null}
          </View>
          <View style={styles.date}>
            <Text style={{color: "green", fontWeight: "500"}}>{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={Friends}
        renderItem={Friend}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "space-arround",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    width: "95%",
    borderWith : 3,
    borderColor: "black"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    fontWeight: "600"
  },
  date: {
    alignItems: "flex-start"
  }
});
