import React, { useLayoutEffect } from "react";
import { StyleSheet, View, ScrollView, Image, Text, Share } from "react-native";
import { Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
const noImage = require("../assets/noImage.jpg");
import * as Linking from "expo-linking"

const link = Linking.createURL(`/Ievent`)
const Social = async () => {
  try {
    const result = await Share.share({
      title: "UG Smart",
      message: `Heya, I just up some products on UG-Smart you might be intreasted in. Click on the link to know more about the Event.\n` +
        link
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
  return <Des_view item={item} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(4.4),
    fontFamily: "Robo",
    fontWeight: 'bold'
  },
  tview: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Rob"
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
    fontSize: RFPercentage(3.2),
    fontFamily: "Robo"
  },
  row: { flexDirection: "row", alignItems: "center" },
});
