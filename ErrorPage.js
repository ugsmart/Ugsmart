import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

const ErrorPage = ({ refresh }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Error! Please check your internet connection
      </Text>
      <Button
        title="Refresh"
        type="outline"
        onPress={() => {
          refresh();
          console.log("re");
        }}
      />
    </View>
  );
};

export default ErrorPage;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 5,
    textAlign: "center",
  },
});
