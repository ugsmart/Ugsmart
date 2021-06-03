import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Button, Avatar } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";
import { ADD_TUTOR, EDIT_TUTOR } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { auth, storage } from "../Firebase";
import { RadioButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

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

const CollegeInput = ({ college, setCollege }) => {
  return (
    <View>
      <Text style={styles.Text}>College</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setCollege(value);
        }}
        value={college}
      >
        <RadioButton.Item label="Health  Sciences" value="Health  Sciences" />
        <RadioButton.Item
          label="Basic &  Applied Sciences"
          value="Basic &  Applied Sciences"
        />
        <RadioButton.Item label="Humanities" value="Humanities" />
        <RadioButton.Item label="Education" value="Education" />
      </RadioButton.Group>
    </View>
  );
};

export default function TutorEdit({ navigation, route }) {
  const { item, refresh } = route.params;
  const [program, setProgram] = useState("");
  const [description, setDescription] = useState("");
  const [college, setCollege] = useState("");
  const [price, setPrice] = useState("");
  //....Image Picker Codes....///
  const [image, setimage] = useState(null);
  const [done, setdone] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);

  const [Edit_Profile] = useMutation(EDIT_TUTOR);

  useEffect(() => {
    setProgram(item.Program);
    setCollege(item.College);
    setDescription(item.Description);
    setPrice(item.Price);
    setImgUrl(item.Image);
  }, [item]);

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

  const DeleteImg = () => {
    setDeleteLoad(true);
    storage
      .refFromURL(imgUrl)
      .delete()
      .then(() => {
        setImgUrl("");
        setDeleteLoad(false);
      })
      .catch((e) => {
        Alert.alert("Error", e.message);
        setDeleteLoad(false);
      });
  };

  const Screens = () => {
    if (done) {
      return <Ipicker2 fun={pickImage} img={image} />;
    } else {
      return <Ipicker fun={pickImage} />;
    }
  };

  const Photo = () => {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: imgUrl }}
          style={{ width: "100%", height: 200, alignSelf: "center" }}
        />
        <Button
          type="outline"
          title="delete"
          containerStyle={{ alignSelf: "flex-end" }}
          titleStyle={{ color: "red" }}
          icon={<MaterialIcons name="delete" size={20} color="red" />}
          iconRight
          loading={deleteLoad}
          onPress={DeleteImg}
        />
      </View>
    );
  };

  const editTutor = (imgUrl) => {
    Edit_Profile({
      variables: {
        id: item._id,
        Program: program,
        Description: description,
        Price: price,
        College: college,
        Image: imgUrl,
      },
    })
      .then(() => {
        Alert.alert("Tutor Profile has been updated sucessfully");
        navigation.goBack();
        refresh();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error Ocurred, Please try again");
        setLoading(false);
      });
  };

  const update = async () => {
    if (
      program === "" ||
      description === "" ||
      price === "" ||
      (image === null && imgUrl === "")
    ) {
      alert("Please fill in all the relevant information");
    } else {
      if (imgUrl) {
        setLoading(true);
        editTutor(imgUrl);
      } else {
        setLoading(true);
        const response = await fetch(image);
        const blob = await response.blob();
        const bucketName = "TutorImages";
        const storageRef = storage
          .ref()
          .child(`${bucketName}/${Date.now().toString()}`);
        storageRef.put(blob).on(
          "state_changed",
          () => {},
          (err) => {
            console.log(err);
            alert(err.message);
          },
          async () => {
            const url = await storageRef.getDownloadURL();
            editTutor(url);
          }
        );
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      <View style={styles.Mview}>
        {imgUrl ? <Photo /> : Screens()}
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
        <CollegeInput college={college} setCollege={setCollege} />
        <Inputview text="Price Details" value={price} setValue={setPrice} />
        <Button
          title="Done"
          onPress={() => {
            update();
          }}
          buttonStyle={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#37A7E8",
          }}
          containerStyle={{ width: "100%" }}
          loading={loading}
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
