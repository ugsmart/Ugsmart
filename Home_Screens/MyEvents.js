import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-elements";
import ErrorPage from "../ErrorPage";
import { auth } from "../Firebase";
import { DELETE_EVENT } from "../GraphQL/Mutations";
import { MY_EVENTS } from "../GraphQL/Queries";
import Loading from "../Loading";

const noImage = require("../assets/noImage.jpg");

const EventItem = ({ item, deleteEvent, toEdit }) => (
  <View style={styles.eventCon}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Avatar
        source={item.Flyer ? { uri: item.Flyer } : noImage}
        rounded
        size="medium"
      />
      <Text style={styles.title}>{item.Name}</Text>
    </View>
    <View style={{ flexDirection: "row", marginTop: 7 }}>
      <Button title="View" type="clear" titleStyle={{ color: "green" }} />
      <Button
        title="Edit"
        type="clear"
        onPress={() => {
          toEdit(item);
        }}
      />
      <Button
        title="Delete"
        type="clear"
        titleStyle={{ color: "red" }}
        onPress={() => {
          deleteEvent(item._id);
        }}
      />
    </View>
  </View>
);

const MyEvents = ({ navigation }) => {
  const [myEvents, setMyEvents] = useState([]);
  const { data, loading, error, refetch } = useQuery(MY_EVENTS, {
    variables: { user: auth.currentUser.email },
    fetchPolicy: "network-only",
  });
  const [Delete_Event] = useMutation(DELETE_EVENT);
  useEffect(() => {
    if (data) {
      setMyEvents(data.User_Event);
    }
  }, [data]);

  const DeleteEvent = (id) => {
    return Alert.alert(
      "Delete Event",
      "Are you sure, action is irreversible.",
      [
        {
          text: "Delete",
          onPress: () => {
            Delete_Event({
              variables: {
                id,
              },
            })
              .then(() => {
                alert("Deleted Successfully");
                refetch();
              })
              .catch((err) => {
                alert("Error occured, Try again");
                console.log(err);
              });
          },
        },
        { text: "Cancel" },
      ]
    );
  };
  const toEdit = (item) => {
    navigation.navigate("Edit Event", { item });
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refetch} />;
  }
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Button
          title="Advertise Event"
          onPress={() => {
            navigation.navigate("Event Form");
          }}
        />
      </View>
      <View style={{ paddingVertical: 10 }}>
        {myEvents === [] && (
          <Text style={{ color: "grey", fontWeight: "bold" }}>
            No Events yet
          </Text>
        )}
        <FlatList
          data={myEvents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <EventItem item={item} deleteEvent={DeleteEvent} toEdit={toEdit} />
          )}
        />
      </View>
    </View>
  );
};

export default MyEvents;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 7 },
  title: { fontSize: 17, fontWeight: "bold", marginLeft: 5 },
  eventCon: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
});
