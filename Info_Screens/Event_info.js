import React, { useLayoutEffect } from "react";
import { StyleSheet, View, ScrollView, Image, Text, Share } from "react-native";
import { Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
const noImage = require("../assets/noImage.jpg");
import * as Linking from "expo-linking";

//https://expo.io/@adlai/Ugsmart
const link = "https://expo.io/@adlai/Ugsmart";
const Social = async () => {
  try {
    const result = await Share.share({
      title: "UG Smart",
      message:
        `Heyy, I just put up an upcoming event you'll be interested in on UG-smart link the link below to download the app and view my Event.\n` +
        link,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const Des_view = ({ item }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Image
          source={item.Flyer ? { uri: item.Flyer } : noImage}
          style={{ height: 500, flex: 1 }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.tview}>
          <Text style={styles.title}>About</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            <Icon
              name="share-social-outline"
              size={RFPercentage(4)}
              type="ionicon"
              onPress={() => Social()}
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
          {item.Price.toLowerCase() === "free" ? (
            <Text style={styles.text}>Free</Text>
          ) : (
            <Text style={styles.text}>Ghc {item.Price}</Text>
          )}
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
  return <Des_view item={item} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(4.2),
    fontFamily: "Rub",
  },
  tview: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Rub",
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
    fontSize: RFPercentage(3),
    fontFamily: "Rub",
  },
  row: { flexDirection: "row", alignItems: "center", marginTop: 5 },
});
