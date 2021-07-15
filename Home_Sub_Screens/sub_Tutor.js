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
import { Avatar, Icon, ListItem } from "react-native-elements";
import { BottomSheet } from "react-native-elements/dist/bottomSheet/BottomSheet";
import { RFPercentage } from "react-native-responsive-fontsize";
import ErrorPage from "../ErrorPage";
import { GET_TUTOR_COL } from "../GraphQL/Queries";
import { Search } from "../Home_Screens/Home_tutor";
import Loading from "../Loading";

const noImage = require("../assets/noImage.jpg");

const Eview = ({ nav, item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("Tutor Info", { item });
      }}
      style={styles.tutorview}
    >
      <Avatar
        rounded={true}
        size={RFPercentage(22)}
        source={item.Image ? { uri: item.Image } : noImage}
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
        {item.Program}
      </Text>
    </TouchableOpacity>
  );
};

export default function Stutor({ navigation, route }) {
  const { name } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_TUTOR_COL, {
    variables: { college: name },
  });
  const refresh = () => {
    refetch();
  };
  const [tutorCollege, setTutorCollege] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [searchBy, setSearchBy] = useState("Name");
  useEffect(() => {
    setSearched(
      tutorCollege.filter((item) =>
        searchBy === "Name"
          ? item.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
          : item.Program.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      )
    );
  }, [searchInput, tutorCollege, searchBy]);

  useEffect(() => {
    if (data) {
      setTutorCollege(data.College);
    }
    if (error) {
      console.log(JSON.stringify(error, null, 2));
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
    return <ErrorPage refresh={refresh} />;
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchview}>
          <Search
            place={`Search Tutor by ${searchBy}..`}
            value={searchInput}
            setValue={setSearchInput}
          />
          <Icon
            size={RFPercentage(4)}
            containerStyle={styles.icon}
            name="filter-outline"
            type="ionicon"
            onPress={() => setIsVisible(true)}
          />
        </View>
        <View style={styles.content}>
          {tutorCollege.length === 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Icon
                size={RFPercentage(10)}
                name="school-outline"
                type="ionicon"
              />
              <Text>No Tutors under this Category yet.</Text>
            </View>
          )}
          {searched.length === 0 && tutorCollege.length !== 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Tutors found.</Text>
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
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
      >
        <ListItem
          onPress={() => {
            setSearchBy("Name");
            setIsVisible(false);
            setSearchInput("");
          }}
        >
          <ListItem.Content>
            <ListItem.Title>Search by Name</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={() => {
            setSearchBy("Course");
            setIsVisible(false);
            setSearchInput("");
          }}
        >
          <ListItem.Content>
            <ListItem.Title>Search by Course</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          onPress={() => {
            setIsVisible(false);
          }}
          containerStyle={{ backgroundColor: "grey" }}
        >
          <ListItem.Content>
            <ListItem.Title style={{ color: "white" }}>Cancel</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
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
    flexDirection: "row",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 25,
    padding: 7,
    borderRadius: 50,
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
