import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { auth } from "../Firebase";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../GraphQL/Queries";

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

const Data = [
  { id: "1", name: "Edit Profile", icon: "person-add-outline" },
  { id: "2", name: "Change Password", icon: "shield-checkmark-outline" },
  { id: "3", name: "Be a Peer Tutor", icon: "book-outline" },
  { id: "4", name: "Invite", icon: "share-social-outline" },
  { id: "5", name: "Log out", icon: "log-out-outline" },
  { id: "6", name: "Delete Account", icon: "trash-bin-outline" },
];

const Aview = ({ name, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.Touch}>
      <Icon name={icon} size={RFPercentage(5.5)} type="ionicon" />
      <Text style={styles.Text}>{name}</Text>
    </TouchableOpacity>
  );
};
export default function Haccount({ navigation }) {
  const { data, error } = useQuery(GET_PROFILE, {
    variables: { user: auth.currentUser.email },
  });
  const [tutorStatus, setTutorStatus] = useState(null);
  useEffect(() => {
    if (data) {
      setTutorStatus(data.Profile.Tutor);
    }
  }, [data]);
  console.log(tutorStatus);
  return (
    <View style={styles.container}>
      <ScrollView>
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
        {tutorStatus ? (
          <Aview
            name="Edit Tutor Profile"
            icon="book-outline"
            onPress={() => {
              navigation.navigate("EditTutor");
            }}
          />
        ) : (
          <Aview
            name="Be a Peer Tutor"
            icon="book-outline"
            onPress={() => {
              navigation.navigate("Ctutor");
            }}
          />
        )}

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
            Logout();
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
    padding: 16,
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
    fontSize: RFPercentage(3),
  },
});
