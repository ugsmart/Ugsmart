import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon, Avatar } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import ErrorPage from "../ErrorPage";
import { GET_APPROVED_TUTORS } from "../GraphQL/Queries";
import Loading from "../Loading";
const noImage = require("../assets/noImage.jpg");

//Search Box Component used in the other Home views...
export const Search = ({ place, value, setValue }) => {
  return (
    <View
      style={{
        backgroundColor: "#eee",
        width: "100%",
        borderRadius: 5,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 0.5,
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={25} name="search-outline" type="ionicon" />
      </View>
      <View style={{ flex: 4.2, padding: 5, justifyContent: "center" }}>
        <TextInput
          style={{ fontSize: RFPercentage(2.8), padding: 5 }}
          placeholder={place}
          value={value}
          onChangeText={setValue}
        />
      </View>
    </View>
  );
};
//End...

const Eview = ({ item, nav }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("Tutor Info", { item });
      }}
      style={styles.tutorview}
    >
      <Avatar
        rounded={true}
        size={RFPercentage(20)}
        source={item.Image ? { uri: item.Image } : noImage}
      />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Lato",
          fontSize: RFPercentage(3),
          marginTop: 10,
          padding: 5
        }}
      >
        {item.Name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: RFPercentage(2),
          fontFamily: "Lato",
        }}
      >
        {item.Program}
      </Text>
    </TouchableOpacity>
  );
};

const Category_view = ({ nav, name, data }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Tutor", { name });
        }}
        style={{
          flexDirection: "row",
          padding: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>{name}</Text>
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

export default function Htutor({ navigation }) {
  const { data, loading, error, refetch } = useQuery(GET_APPROVED_TUTORS, {
    pollInterval: 500,
  });
  const [tutors, setTutors] = useState([])
  const [healthS, setHealthS] = useState([]);
  const [basicS, setBasicS] = useState([]);
  const [humanities, setHumanities] = useState([]);
  const [education, setEducation] = useState([]);
  useEffect(() => {
    if (data) {
      const tutors = data.Approved_tutors;
      setTutors(data.Approved_tutors)
      const health = tutors.filter(
        (item) => item.College === "Health Sciences"
      );
      setHealthS(health);
      const basic = tutors.filter(
        (item) => item.College === "Basic & Applied Sciences"
      );
      setBasicS(basic);
      const hum = tutors.filter((item) => item.College === "Humanities");
      setHumanities(hum);
      const edu = tutors.filter((item) => item.College === "Education");
      setEducation(edu);
    }
  }, [data]);
  const refresh = () => {
    refetch();
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refresh} />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        {tutors.length === 0 && < View
          style={{ justifyContent: 'center' }}
        >
          <Icon
            size={RFPercentage(6)}
            name="school-outline"
            type="ionicon"
          />
          <Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>No Tutors yet</Text>
        </View>}
        {healthS.length > 0 && (
          <Category_view
            nav={navigation}
            name="Health Sciences"
            data={healthS}
          />
        )}
        {basicS.length > 0 && (
          <Category_view
            nav={navigation}
            name="Basic & Applied Sciences"
            data={basicS}
          />
        )}
        {humanities.length > 0 && (
          <Category_view nav={navigation} name="Humanities" data={humanities} />
        )}
        {education.length > 0 && (
          <Category_view nav={navigation} name="Education" data={education} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchview: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  title: {
    fontFamily: "Lato",
    fontSize: RFPercentage(3.5),
    padding: 5,
    fontWeight: 'bold'
  },
  content: {
    flex: 4,
    justifyContent: "center",
    padding: 5,
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
    maxHeight: 230,
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
