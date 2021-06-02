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
import { Search } from "../Home_Screens/Home_tutor";
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
          fontFamily: "Ranch",
          fontSize: RFPercentage(3.8),
          marginTop: 10,
        }}
      >
        {item.Name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: RFPercentage(2.8),
          fontFamily: "Ranch",
        }}
      >
        {item.Date}
      </Text>
    </TouchableOpacity>
  );
};
//End...

//View for Event Home page Content...
const Viewz = ({ name, nav, data }) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Event", { name });
        }}
        style={styles.touch}
      >
        <Text style={styles.title}>{name}</Text>
        <Icon name="chevron-forward" type="ionicon" />
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
//End...

export default function Hevent({ navigation }) {
  const { data, loading, error, refetch } = useQuery(GET_EVENTS);
  const [artsCulture, setArtsCulture] = useState([]);
  const [education, setEducation] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [religion, setReligion] = useState([]);
  const [sports, setSports] = useState([]);
  const [socialLifestyle, setSocialLifestyle] = useState([]);
  useEffect(() => {
    if (data) {
      const events = data.Events;
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
        <View style={styles.searchview}>
          <Search place="Search Event..." />
        </View>
        {artsCulture.length > 0 && (
          <Viewz nav={navigation} name="Arts & Culture" data={artsCulture} />
        )}
        {education.length > 0 && (
          <Viewz nav={navigation} name="Education" data={education} />
        )}
        {entertainment.length > 0 && (
          <Viewz nav={navigation} name="Entertainment" data={entertainment} />
        )}
        {religion.length > 0 && (
          <Viewz nav={navigation} name="Religion" data={religion} />
        )}
        {socialLifestyle.length > 0 && (
          <Viewz
            nav={navigation}
            name="Social & Lifestyle"
            data={socialLifestyle}
          />
        )}
        {sports.length > 0 && (
          <Viewz nav={navigation} name="Sports" data={sports} />
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
    elevation: 5,
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
