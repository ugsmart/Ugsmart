import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Icon } from "react-native-elements";
import ErrorPage from "../ErrorPage";
import { auth } from "../Firebase";
import { DELETE_EVENT } from "../GraphQL/Mutations";
import { MY_EVENTS } from "../GraphQL/Queries";
import Loading from "../Loading";
import { RFPercentage } from "react-native-responsive-fontsize";

const noImage = require("../assets/noImage.jpg");

const EventItem = ({ item, deleteEvent, toEdit, viewEvent }) => (
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
      <Button
        title="View"
        type="clear"
        titleStyle={{ color: "green" }}
        onPress={() => {
          viewEvent(item);
        }}
      />
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

  const refresh = () => {
    refetch();
  };

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
                refresh();
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
    navigation.navigate("Edit Event", { item, refresh });
  };
  const viewEvent = (item) => {
    navigation.navigate("Event Info", { item });
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refresh} />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigation.navigate("Event Form", { refresh });
        }}
      >
        <Icon name="add-outline" type="ionicon" color="white" />
      </TouchableOpacity>
      <View style={{ paddingVertical: 10 }}>
        {myEvents.length === 0 && (
          <View
            style={{ justifyContent: 'center' }}
          >
            <Icon
              size={RFPercentage(6)}
              name="calendar-outline"
              type="ionicon"
            />
            <Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>No Events yet</Text>
          </View>
        )}
        <FlatList
          data={myEvents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <EventItem
              item={item}
              deleteEvent={DeleteEvent}
              toEdit={toEdit}
              viewEvent={viewEvent}
            />
          )}
        />
      </View>
    </View>
  );
};

export default MyEvents;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 7, backgroundColor: 'white' },
  title: { fontSize: 17, fontWeight: "bold", marginLeft: 5 },
  eventCon: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 8,
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 10,
  },
});
