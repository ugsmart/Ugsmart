import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Avatar, Divider, Rating, AirbnbRating } from "react-native-elements";
import ErrorPage from "../ErrorPage";
import { P_REVIEWS } from "../GraphQL/Queries";
import Loading from "../Loading";

const RatingItem = ({ item }) => {
  return (
    <View style={{ paddingTop: 6 }}>
      <View style={styles.row}>
        <Avatar
          title={item.username.slice(0, 1)}
          rounded
          avatarStyle={{ backgroundColor: "green" }}
          size="medium"
        />
        <Text style={styles.name}>{item.username}</Text>
      </View>
      <View style={styles.row}>
        <AirbnbRating
          count={5}
          size={17}
          showRating={false}
          isDisabled={true}
          defaultRating={item.value}
        />
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={{ marginBottom: 3 }}>
        <Text style={{ fontFamily: "Noto" }}>{item.comment}</Text>
      </View>
      <Divider />
    </View>
  );
};

const RatingPage = ({ route }) => {
  const { id } = route.params;
  const [ratings, setRatings] = useState([]);
  const { data, loading, error, refetch } = useQuery(P_REVIEWS, {
    variables: { id: id },
  });

  useEffect(() => {
    if (data) {
      const ratings = data.P_reviews;
      const ratingsR = [...ratings].reverse();
      setRatings(ratingsR);
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
    <View style={styles.container}>
      <FlatList
        data={ratings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RatingItem item={item} />}
      />
    </View>
  );
};

export default RatingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 20,
    // fontFamily: "Noto",
  },
  date: {
    color: "grey",
    marginLeft: 10,
  },
});
