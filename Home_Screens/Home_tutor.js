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
import { GET_TUTORS } from "../GraphQL/Queries";
import Loading from "../Loading";
const noImage = require("../assets/noImage.jpg");

//Search Box Component used in the other Home views...
export const Search = ({ place }) => {
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
        {item.Program}
      </Text>
    </TouchableOpacity>
  );
};

const Viewz = ({ name, nav, data }) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Tutor", { name });
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

const Category_view = ({nav, name, data})=>{
  return(
      <View style={{flex:1}}>
        <TouchableOpacity onPress={()=>{nav.navigate("Tutor", { name })}} style={{flexDirection:'row',padding:5,alignItems:'center',justifyContent:'space-between'}}>
          <Text style={styles.title}>{name}</Text>
          <Icon name="chevron-forward-circle-outline" type='ionicon'/>
        </TouchableOpacity>
        <FlatList
          horizontal={true}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Eview nav={nav} item={item}/>}
        />
      </View>
  )
}

export default function Htutor({ navigation }) {
  const { data, loading, error, refetch } = useQuery(GET_TUTORS, {
    pollInterval: 100,
  });
  const [healthS, setHealthS] = useState([]);
  const [basicS, setBasicS] = useState([]);
  const [humanities, setHumanities] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    if (data) {
      const tutors = data.Tutors;
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
        <View style={styles.searchview}>
          <Search place="Search Tutor..." />
        </View>
        {healthS.length > 0 && (
          <Category_view nav={navigation} name="Health Sciences" data={healthS} />
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
    fontFamily: "Titan",
    fontSize: RFPercentage(3.4),
    padding: 5,
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
