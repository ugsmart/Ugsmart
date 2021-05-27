import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { auth } from "./Firebase";

const Splash = ({ navigation }) => {
  useEffect(() => {
    if (auth.currentUser.emailVerified) {
      navigation.navigate("Main");
    } else {
      navigation.navigate("Verify");
    }
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.image} />
      <ActivityIndicator color="black" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    height: 200,
    width: 200,
  },
});
