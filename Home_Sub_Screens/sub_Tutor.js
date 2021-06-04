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
import { GET_PRODUCT_CATEGORY, GET_TUTOR_COL } from "../GraphQL/Queries";
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

export default function Stutor({ navigation, route }) {
  const { name } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_TUTOR_COL, {
    variables: { college: name },
  });
  const refresh = () => {
    refetch();
  };
  const [tutorCollege, setTutorCollege] = useState([]);
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

  console.log(tutorCollege);

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
        {tutorCollege.length===0 &&
         <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
           <Icon size={RFPercentage(10)} name="school-outline" type="ionicon"/>
           <Text>No Tutors under this Category yet.</Text>
         </View>}
          <FlatList
            numColumns={2}
            data={tutorCollege}
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
  title: {
    fontFamily: "Titan",
    marginBottom: 10,
    fontSize: 30,
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
    maxWidth: "50%",
  },
});
