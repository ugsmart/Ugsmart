import React, { useLayoutEffect } from "react";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import { Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
const noImage = require("../assets/noImage.jpg");

const Des_view = ({ item }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Image
          source={item.Flyer ? { uri: item.Flyer } : noImage}
          style={{ height: 500,flex:1 }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.tview}>
          <Text style={styles.title}>About</Text>
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
        <View style={styles.row}>
          <Text style={styles.bold}>Date: </Text>
          <Text style={styles.text}>{item.Date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Time: </Text>
          <Text style={styles.text}>{item.Time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Price Details: </Text>
          <Text style={styles.text}>{item.Price}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

//Ievent = Information event
export default function Ievent({ route, navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.Name,
    });
  }, [navigation]);
  const { item } = route.params;
  console.log(item);

  return <Des_view item={item} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(4.2),
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
    fontSize: RFPercentage(2.4),
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
  bold: {
    fontWeight: "bold",
    fontSize: RFPercentage(3.0),
  },
  row: { flexDirection: "row", alignItems: "center" },
});
