import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/img.png")} style={styles.image} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255, 240, 211)",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: "50%",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 11,
    fontFamily: "Ranch",
  },
});
