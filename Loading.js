import React from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="black" />
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
    backgroundColor: "white",
  },

  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 11,
    fontFamily: "Ranch",
  },
});
