import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { Button, Icon, Avatar } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { auth } from "../Firebase";
const noImage = require("../assets/noImage.jpg");

const Des_view = ({ nav, item }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <ImageBackground
          blurRadius={5}
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          source={item.Image ? { uri: item.Image } : noImage}
        >
          <Avatar
            rounded={true}
            size={300}
            source={item.Image ? { uri: item.Image } : noImage}
          />
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <View style={styles.tview}>
          <Text style={styles.title}>{item.Name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="heart-outline"
              style={{ marginRight: 10 }}
              size={RFPercentage(4.5)}
              type="ionicon"
            />
            <Icon
              name="share-social-outline"
              size={RFPercentage(4)}
              type="ionicon"
            />
          </View>
        </View>
        <Text style={styles.text}>{item.Description}</Text>
        <Text style={styles.Ptext}>Program</Text>
        <Text>{item.Program}</Text>
        <Text style={styles.text}>College of {item.College}</Text>
        <Text style={styles.Ptext}>Price Details</Text>
        <Text>{item.Price}</Text>
        {item.usermail !== auth.currentUser.email && (
          <Button
            onPress={() => {
              nav.navigate("Chat");
            }}
            title="Chat Me"
            containerStyle={{ marginTop: 10 }}
            buttonStyle={{ padding: 15, backgroundColor: "green" }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default function Itutor({ navigation, route }) {
  const { item } = route.params;
  return <Des_view nav={navigation} item={item} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(3.5),
    fontFamily: "Titan",
  },
  tview: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  date: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: RFPercentage(2.2),
    fontFamily: "Noto",
  },
  Ptext: {
    fontWeight: "bold",
    fontSize: RFPercentage(2.6),
  },
  content: {
    flex: 1,
    padding: 8,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
