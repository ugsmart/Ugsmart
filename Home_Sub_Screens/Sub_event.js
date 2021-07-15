import { useQuery } from "@apollo/client";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { GET_EVENTS_CATEGORY } from "../GraphQL/Queries";
import { Search } from "../Home_Screens/Home_tutor";
import Loading from "../Loading";

const noImage = require("../assets/noImage.jpg");

const Eview = ({ nav, item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("Event Info", { item });
      }}
      style={styles.tutorview}
    >
      <Avatar
        rounded={true}
        size={RFPercentage(22)}
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

export default function Sevent({ navigation, route }) {
  const { name } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_EVENTS_CATEGORY, {
    variables: { cate: name },
  });
  const [eventCate, setEventCate] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    setSearched(
      eventCate.filter(
        (item) =>
          item.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      )
    );
  }, [searchInput, eventCate]);

  useEffect(() => {
    if (data) {
      setEventCate(data.Event_Cate);
    }
  }, [data]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refetch} />;
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchview}>
          <Search
            place="Search Event..."
            value={searchInput}
            setValue={setSearchInput}
          />
        </View>
        <View style={styles.content}>
          {eventCate.length === 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Icon
                size={RFPercentage(10)}
                name="calendar-outline"
                type="ionicon"
              />
              <Text>No Events under this Category yet.</Text>
            </View>
          )}
          {searched.length === 0 && eventCate.length !== 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Events found.</Text>
            </View>
          )}
          <FlatList
            numColumns={2}
            data={searched}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Eview nav={navigation} item={item} />}
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
    padding: 5,
    justifyContent: "center",
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
    maxWidth: "50%",
  },
});
