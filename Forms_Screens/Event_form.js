import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { auth, storage } from "../Firebase";
import { ADD_EVENT } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

const Inputview = ({ text, value, setValue, keyboard = "default" }) => {
  return (
    <View>
      <Text style={styles.Text}>{text}</Text>
      <TextInput
        multiline={true}
        style={styles.Input}
        value={value}
        onChangeText={setValue}
        keyboardType={keyboard}
      />
    </View>
  );
};

const DnTview = ({ show1, show2, set1, set2, date, time, tim, dat, tnd }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <TouchableOpacity
        onPress={() => {
          set1(!show1);
        }}
        style={styles.Opacv}
      >
        <Icon name="calendar-outline" type="ionicon" />
        <Text style={styles.Text1}>{date}</Text>
      </TouchableOpacity>
      <View style={{ padding: 2 }}></View>
      <TouchableOpacity
        onPress={() => {
          set2(!show2);
        }}
        style={styles.Opacv}
      >
        <Icon name="alarm-outline" type="ionicon" />
        <Text style={styles.Text1}>{time}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        onCancel={() => show1(!show1)}
        onConfirm={(val) => {
          tnd(val);
          dat(val.toDateString());
        }}
        isVisible={show1}
        mode="date"
      />
      <DateTimePickerModal
        onCancel={() => show2(!show2)}
        onConfirm={(val) => {
          tim(val.toLocaleTimeString().slice(0, 5));
        }}
        isVisible={show2}
        mode="time"
      />
    </View>
  );
};

const Ipicker = ({ fun }) => {
  return (
    <View>
      <Text style={styles.Text}>Photo</Text>
      <TouchableOpacity
        onPress={() => {
          fun();
        }}
        style={styles.Iopc}
      >
        <Icon size={RFPercentage(7)} name="add-circle-outline" type="ionicon" />
      </TouchableOpacity>
    </View>
  );
};

const Iview = ({ img, fun }) => {
  return (
    <View>
      <Text style={styles.Text}>Photo</Text>
      <TouchableOpacity
        onPress={() => {
          fun();
        }}
        style={styles.Iopc}
      >
        <Image
          style={{ flex: 1, width: "100%", borderRadius: 5 }}
          source={{ uri: img }}
        />
      </TouchableOpacity>
    </View>
  );
};

const Catego = ({ cat, setCat }) => {
  return (
    <View>
      <Text style={styles.Text}>Event Category</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setCat(value);
        }}
        value={cat}
      >
        <RadioButton.Item label="Arts & Culture" value="Arts & Culture" />
        <RadioButton.Item label="Education" value="Education" />
        <RadioButton.Item label="Entertainment" value="Entertainment" />
        <RadioButton.Item label="Religion" value="Religion" />
        <RadioButton.Item
          label="Social & Lifestyle"
          value="Social & Lifestyle"
        />
        <RadioButton.Item label="Sports" value="Sports" />
      </RadioButton.Group>
    </View>
  );
};

export default function Eform({ navigation }) {
  const [Add_Event, { error }] = useMutation(ADD_EVENT);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  //Variables for Date n Time Picker Modal
  const [showd, setd] = useState(false);
  const [showt, sett] = useState(false);
  const [date, setdate] = useState("Date");
  const [time, settime] = useState("Time");

  const [cat, setCat] = useState("");

  //Variable For Date n Time for Server
  const [dnt, setdnt] = useState();

  const [image, setimage] = useState(null);
  const [done, setdone] = useState(false);

  //....Image Picker Codes....///
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setimage(result.uri);
      setdone(true);
    }
  };
  //End...

  const Screen = () => {
    if (done) {
      return <Iview fun={pickImage} img={image} />;
    } else {
      return <Ipicker fun={pickImage} />;
    }
  };

  const upload = async () => {
    if (
      name === "" ||
      cat === "" ||
      description === "" ||
      price === "" ||
      date === "Date" ||
      time === "Time" ||
      image === null
    ) {
      alert("Please fill in all the relevant information");
    } else {
      setLoading(true);
      const response = await fetch(image);
      const blob = await response.blob();
      const bucketName = "EventImages";
      const storageRef = storage
        .ref()
        .child(`${bucketName}/${Date.now().toString()}`);
      storageRef.put(blob).on(
        "state_changed",
        () => {},
        (err) => {
          console.log(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          console.log(url);
          Add_Event({
            variables: {
              Name: name,
              Category: cat,
              Description: description,
              Price: price,
              Time: time,
              Date: date,
              Flyer: url,
              usermail: auth.currentUser.email,
            },
          })
            .then((data) => {
              console.log(data);
              setLoading(false);
              Alert.alert("Event has been added sucessfully");
              navigation.goBack();
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
              Alert.alert("Error Ocurred, Please try again");
            });
        }
      );
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      <View style={styles.Mview}>
        {Screen()}
        <Inputview text="Event Name" value={name} setValue={setName} />
        <Catego cat={cat} setCat={setCat} />
        <Inputview
          text="Description"
          value={description}
          setValue={setDescription}
        />
        <Inputview text="Price Details" value={price} setValue={setPrice} />
        <DnTview
          tnd={setdnt}
          show1={showd}
          date={date}
          tim={settime}
          dat={setdate}
          time={time}
          show2={showt}
          set1={setd}
          set2={sett}
        />
        <Button
          title="Done"
          onPress={() => {
            upload();
          }}
          buttonStyle={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#37A7E8",
          }}
          loading={loading}
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
