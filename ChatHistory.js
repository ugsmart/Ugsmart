import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "./Firebase";
import { PROFILE_NAME } from "./GraphQL/Queries";

const ChatItem = ({ item, nav }) => {
  const rEmail = item.chatName.replace(auth.currentUser.email, "");
  const { data, loading, error } = useQuery(PROFILE_NAME, {
    variables: { user: rEmail },
  });
  const [rName, setRName] = useState("");
  useEffect(() => {
    if (data) {
      setRName(data.Profile.Name);
    }
  }, [data]);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        nav.navigate("Chat", { id: item.id });
      }}
    >
      <ListItem bottomDivider>
        <Avatar
          title={rName.slice(0, 1)}
          rounded
          avatarStyle={{ backgroundColor: "green" }}
          size="medium"
        />
        <ListItem.Content>
          <ListItem.Title>{rName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

const ChatHistory = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [myChats, setMyChats] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .get()
      .then((snap) => {
        setChats(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, []);
  useEffect(() => {
    setMyChats(
      chats.filter((item) => item.chatName.includes(auth.currentUser.email))
    );
  }, [chats]);
  return (
    <View style={styles.container}>
      <FlatList
        data={myChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem item={item} nav={navigation} />}
      />
    </View>
  );
};

export default ChatHistory;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "white" },
});
