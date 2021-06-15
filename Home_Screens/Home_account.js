import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { auth, storage } from "../Firebase";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TUTOR } from "../GraphQL/Queries";
import { DELETE_TUTOR } from "../GraphQL/Mutations";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";

const Logout = () => {
  auth.signOut();
};

const Delete = () => {
  return Alert.alert(
    "Ugsmart",
    "Deleting your account is an irreversible action.",
    [{ text: "Delete" }, { text: "Cancel" }]
  );
};

const TutorProfile = ({ expanded, view, edit, deleteT }) => {
  return (
    <View style={{ marginLeft: 30, display: expanded ? "flex" : "none" }}>
      <ListItem bottomDivider onPress={() => view()}>
        <ListItem.Content>
          <ListItem.Title>View Tutor Profile</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => edit()}>
        <ListItem.Content>
          <ListItem.Title>Edit Tutor Profile</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => deleteT()}>
        <ListItem.Content>
          <ListItem.Title>Delete Tutor Profile</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};
const Aview = ({ name, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.Touch}>
      <Icon name={icon} size={RFPercentage(5.5)} type="ionicon" />
      <Text style={styles.Text}>{name}</Text>
    </TouchableOpacity>
  );
};
export default function Haccount({ navigation }) {
  const [expanded, setExpanded] = useState(false);
  const [tutorProfile, setTutorProfile] = useState([]);
  const { data, loading, error, refetch } = useQuery(GET_TUTOR, {
    variables: { user: auth.currentUser.email },
    fetchPolicy: "network-only",
  });
  const [Delete_Tutor] = useMutation(DELETE_TUTOR);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (data) {
      setTutorProfile(data.User_Tutor);
      setUserName(data.Profile.Name);
    }
  }, [data]);
  const refresh = () => {
    refetch();
  };
  const editTutor = () => {
    navigation.navigate("EditTutor", { item: tutorProfile[0], refresh });
  };
  const viewTutor = () => {
    navigation.navigate("Tutor Info", { item: tutorProfile[0] });
  };
  const deleteTutor = () => {
    return Alert.alert(
      "Delete Tutor",
      "Are you sure, action is irreversible.",
      [
        {
          text: "Delete",
          onPress: () => {
            storage.refFromURL(tutorProfile[0].Image).delete();
            Delete_Tutor({
              variables: { email: auth.currentUser.email },
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
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refresh} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          blurRadius={5}
          imageStyle={{ borderRadius: 8 }}
          style={styles.main}
          source={require("../assets/tutor.jpg")}
        >
          <Avatar
            size="xlarge"
            rounded={true}
            source={require("../assets/tutor.jpg")}
          />
        </ImageBackground>
        <Text style={{ fontWeight: "bold" }}>Account Profile</Text>

        <Aview
          name="Edit Profile"
          icon="person-add-outline"
          onPress={() => {
            navigation.navigate("Edit");
          }}
        />
        <Aview
          name="Change Password"
          icon="shield-checkmark-outline"
          onPress={() => {
            navigation.navigate("Change");
          }}
        />
        {tutorProfile.length > 0 ? (
          <>
            <Aview
              name="Tutor Profile"
              icon="book-outline"
              onPress={() => {
                setExpanded(!expanded);
              }}
            />
            <TutorProfile
              expanded={expanded}
              edit={editTutor}
              view={viewTutor}
              deleteT={deleteTutor}
            />
          </>
        ) : (
          <Aview
            name="Be a Peer Tutor"
            icon="book-outline"
            onPress={() => {
              navigation.navigate("Ctutor", { refresh, userName });
            }}
          />
        )}
        <Aview
          name="Chats"
          icon="chatbubbles-outline"
          onPress={() => {
            navigation.navigate("Chat History");
          }}
        />
        <Aview
          name="Invite"
          icon="share-social-outline"
          onPress={() => {
            navigation.navigate("Invite");
          }}
        />
        <Aview
          name="Log out"
          icon="log-out-outline"
          onPress={() => {
            Alert.alert("Ugsmart", "Are you sure you want to Log out?", [
              { text: "Yes", onPress: () => Logout() },
              { text: "No" },
            ]);
          }}
        />

        <Aview
          name="Delete Account"
          icon="trash-bin-outline"
          onPress={() => {
            Delete();
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 5,
  },
  Touch: {
    flex: 1,
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
    marginTop: 0,
  },
  Text: {
    marginHorizontal: 10,
    fontFamily: "Noto",
    fontSize: RFPercentage(2.4),
  },
  main: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});
