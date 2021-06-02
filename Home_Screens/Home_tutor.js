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

//Tutor Profile View....
const Tutor = ({ item, nav }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("Tutor Info", { item });
      }}
      style={styles.tutorview}
    >
      <Avatar
        size={RFPercentage(20)}
        rounded={true}
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
//End..

export default function Htutor({ navigation }) {
  const { data, loading, error, refetch } = useQuery(GET_TUTORS);
  const [tutors, setTutors] = useState([]);
  useEffect(() => {
    if (data) {
      setTutors(data.Tutors);
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchview}>
          <Search place="Search Tutor..." />
        </View>
        <View style={styles.content}>
          <FlatList
            numColumns={2}
            data={tutors}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Tutor nav={navigation} item={item} />}
          />
        </View>
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
    justifyContent: "center",
    padding: 8,
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
});
