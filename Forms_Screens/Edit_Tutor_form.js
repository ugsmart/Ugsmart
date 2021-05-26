import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";
import { ADD_TUTOR } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { auth } from "../Firebase";

const Inputview = ({ text, value, setValue }) => {
  return (
    <View>
      <Text style={styles.Text}>{text}</Text>
      <TextInput
        multiline={true}
        style={styles.Input}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

const Ipicker = ({ fun }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.Text}>Photo</Text>
      <Avatar
        onPress={() => {
          fun();
        }}
        rounded={true}
        size="xlarge"
        overlayContainerStyle={{ backgroundColor: "silver" }}
        icon={{ name: "person-outline", type: "ionicon" }}
      />
    </View>
  );
};

const Ipicker2 = ({ img, fun }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.Text}>Photo</Text>
      <Avatar
        onPress={() => {
          fun();
        }}
        source={{ uri: img }}
        rounded={true}
        size="xlarge"
        overlayContainerStyle={{ backgroundColor: "silver" }}
      />
    </View>
  );
};

export default function TutorEdit({ navigation }) {
  const [program, setProgram] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  //....Image Picker Codes....///
  const [image, setimage] = useState(null);
  const [done, setdone] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setimage(result.uri);
      setdone(true);
    }
  };
  //End...

  const Screens = () => {
    if (done) {
      return <Ipicker2 fun={pickImage} img={image} />;
    } else {
      return <Ipicker fun={pickImage} />;
    }
  };

  const upload = () => {
    if (
      program === "" ||
      description === "" ||
      price === "" ||
      image === null
    ) {
      alert("Please fill in all the relevant information");
    } else {
      const bucketName = "TutorImages";
      const storageRef = storage.ref(`${bucketName}/${Date.now().toString()}`);
      storageRef.put(image).on(
        "state_changed",
        () => {},
        (err) => {
          console.log(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
        }
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      <Text style={styles.Htext}>Edit Tutor Profile</Text>
      <View style={styles.Mview}>
        {/* {Screens()} */}
        <Inputview
          text="Program of Study"
          value={program}
          setValue={setProgram}
        />
        <Inputview
          text="Description"
          value={description}
          setValue={setDescription}
        />
        <Inputview text="Price Details" value={price} setValue={setPrice} />
        <Button
          title="Done"
          onPress={() => {
            // upload()
          }}
          buttonStyle={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#37A7E8",
          }}
          containerStyle={{ width: "100%" }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Mview: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
  },
  Htext: {
    fontFamily: "Titan",
    fontSize: RFPercentage(5.5),
    marginBottom: 10,
    alignSelf: "center",
  },
  Input: {
    padding: 8,
    fontSize: 18,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  Text: {
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 10,
  },
  Opacv: {
    flex: 1,
    borderWidth: 0.5,
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    borderRadius: 5,
  },
  Text1: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  Iopc: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: 5,
    height: 150,
    flex: 1,
    padding: 0,
    backgroundColor: "#e3e3e3",
  },
});
