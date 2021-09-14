import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import ErrorPage from "../ErrorPage";
import { GET_EVENTS } from "../GraphQL/Queries";
import Loading from "../Loading";

const noImage = require("../assets/noImage.jpg");

//View for Individual event used in Flatlist...
const Eview = ({ item, nav }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("Event Info", { item });
      }}
      style={styles.tutorview}
    >
      <Avatar
        rounded={true}
        size={RFPercentage(20)}
        source={item.Flyer ? { uri: item.Flyer } : noImage}
      />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Rub",
          fontSize: RFPercentage(3),
          marginTop: 10,
        }}
      >
        {item.Name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: RFPercentage(2),
          fontFamily: "Rub",
        }}
      >
        {item.Date}
      </Text>
    </TouchableOpacity>
  );
};
//End...

const Category_view = ({ nav, title, name, data }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Event", { name });
        }}
        style={{
          flexDirection: "row",
          padding: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <Icon name="chevron-forward-circle-outline" type="ionicon" />
      </TouchableOpacity>
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Eview nav={nav} item={item} />}
      />
    </View>
  );
};

export default function Hevent({ navigation }) {
  const { data, loading, error, refetch } = useQuery(GET_EVENTS, { pollInterval: 1000 });
  const [artsCulture, setArtsCulture] = useState([]);
  const [education, setEducation] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [religion, setReligion] = useState([]);
  const [sports, setSports] = useState([]);
  const [socialLifestyle, setSocialLifestyle] = useState([]);
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (data) {
      const events = data.Events;
      setEvents(data.Events)
      const edu = events.filter((item) => item.Category === "Education");
      setEducation(edu);
      const artsCul = events.filter(
        (item) => item.Category === "Arts & Culture"
      );
      setArtsCulture(artsCul);
      const ent = events.filter((item) => item.Category === "Entertainment");
      setEntertainment(ent);
      const rel = events.filter((item) => item.Category === "Religion");
      setReligion(rel);
      const spo = events.filter((item) => item.Category === "Sports");
      setSports(spo);
      const socLife = events.filter(
        (item) => item.Category === "Social & Lifestyle"
      );
      setSocialLifestyle(socLife);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refetch} />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        {events.length === 0 && <View
          style={{ justifyContent: 'center' }}
        >
          <Icon
            size={RFPercentage(6)}
            name="calendar-outline"
            type="ionicon"
          />
          <Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>No Events yet</Text>
        </View>}
        {artsCulture.length > 0 && (
          <Category_view
            title="Arts & Culture"
            nav={navigation}
            name="Arts & Culture"
            data={artsCulture}
          />
        )}
        {education.length > 0 && (
          <Category_view
            title="Education"
            nav={navigation}
            name="Education"
            data={education}
          />
        )}
        {entertainment.length > 0 && (
          <Category_view
            title="Entertainment"
            nav={navigation}
            name="Entertainment"
            data={entertainment}
          />
        )}
        {religion.length > 0 && (
          <Category_view
            title="Religion"
            nav={navigation}
            name="Religion"
            data={religion}
          />
        )}
        {socialLifestyle.length > 0 && (
          <Category_view
            title="Social & Lifestyle"
            nav={navigation}
            name="Social & Lifestyle"
            data={socialLifestyle}
          />
        )}
        {sports.length > 0 && (
          <Category_view
            title="Sports"
            nav={navigation}
            name="Sports"
            data={sports}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  searchview: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  content: {
    flex: 4,
    padding: 5,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Titan",
    fontSize: RFPercentage(3.4),
    padding: 5,
  },
  Event: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tutorview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 5,
    maxHeight: 220,
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
