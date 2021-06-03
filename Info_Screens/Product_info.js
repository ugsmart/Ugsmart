import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SliderBox } from "react-native-image-slider-box";

const image = [
  require("../assets/nike1.jpg"),
  require("../assets/nike2.jpg"),
  require("../assets/nike3.jpg"),
];

const Des_view = ({ nav, item }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <SliderBox
          resizeMethod={"auto"}
          height={280}
          sliderBoxHeight={280}
          paginationBoxVerticalPadding={1}
          dotColor="red"
          inactiveDotColor="grey"
          images={Object.values(item.Images).slice(1)}
        />
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
        <Text style={styles.Ptext}>Price Details</Text>
        <Text>{item.Price}</Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={styles.Ptext}>Barter Trade</Text>
          {item.Bater ? (
            <Icon
              color="green"
              name="checkmark-circle-outline"
              type="ionicon"
            />
          ) : (
            <Icon color="red" name="close-circle-outline" type="ionicon" />
          )}
        </View>
        <Button
          onPress={() => {
            nav.navigate("Chat");
          }}
          title="Chat Me"
          containerStyle={{ marginTop: 10 }}
          buttonStyle={{ padding: 15, backgroundColor: "green" }}
        />
      </View>
    </ScrollView>
  );
};
//checkmark-circle-outline
export default function Iproduct({ navigation, route }) {
  const { item } = route.params;
  return <Des_view nav={navigation} item={item} />;
}
//close-circle
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
    marginRight: 8,
  },
  content: {
    flex: 1,
    padding: 8,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
