import React, { useEffect, useState } from "react";
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
import { ADD_EVENT, EDIT_EVENT } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { MaterialIcons } from "@expo/vector-icons";

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

const Priceinputview = ({ text, setPrice, setvalue, value }) => {
  return (
    <View>
      <Text style={styles.Text}>{text}</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setvalue(true);
            setPrice("Free");
          }}
          style={styles.Opacv}
        >
          <Icon type="ionicon" name="happy-outline" />
          <Text style={styles.Text1}>Free</Text>
          {value && (
            <Icon
              type="ionicon"
              name="checkmark-circle"
              color="green"
              size={20}
              containerStyle={{ marginLeft: "auto" }}
            />
          )}
        </TouchableOpacity>
        <View style={{ padding: 2 }} />
        <TouchableOpacity
          style={styles.Opacv}
          onPress={() => {
            setvalue(false);
            setPrice("");
          }}
        >
          <Icon type="ionicon" name="cash-outline" />
          <Text style={styles.Text1}>Priced</Text>
          {!value && (
            <Icon
              type="ionicon"
              name="checkmark-circle"
              color="green"
              size={20}
              containerStyle={{ marginLeft: "auto" }}
            />
          )}
        </TouchableOpacity>
      </View>
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

export default function EditEvent({ navigation, route }) {
  const { item, refresh } = route.params;
  const [Edit_Event] = useMutation(EDIT_EVENT);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  //Variables for Date n Time Picker Modal
  const [showd, setd] = useState(false);
  const [showt, sett] = useState(false);
  const [date, setDate] = useState("Date");
  const [time, setTime] = useState("Time");
  const [cat, setCat] = useState("");
  const [dnt, setdnt] = useState();
  const [image, setimage] = useState(null);
  const [done, setdone] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [isFree, setIsFree] = useState(true);
  useEffect(() => {
    setCat(item.Category);
    setDescription(item.Description);
    setName(item.Name);
    setPrice(item.Price);
    setTime(item.Time);
    setDate(item.Date);
    setImgUrl(item.Flyer);
    setIsFree(item.Price.toLowerCase() === "free" ? true : false);
  }, [item]);
  //....Image Picker Codes....///
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    console.log(result);

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

  const editEvent = (imgUrl) => {
    Edit_Event({
      variables: {
        id: item._id,
        Name: name,
        Category: cat,
        Description: description,
        Price: price,
        Time: time,
        Date: date,
        Flyer: imgUrl,
        usermail: auth.currentUser.email,
      },
    })
      .then(() => {
        setLoading(false);
        Alert.alert("Event has been updated sucessfully");
        navigation.goBack();
        refresh();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Alert.alert("Error Ocurred, Please try again");
      });
  };

  const update = async () => {
    if (
      name === "" ||
      cat === "" ||
      description === "" ||
      price === "" ||
      date === "Date" ||
      time === "Time" ||
      (image === null && imgUrl === "")
    ) {
      alert("Please fill in all the relevant information");
    } else {
      if (imgUrl) {
        setLoading(true);
        editEvent(imgUrl);
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
            editEvent(url);
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
        {imgUrl ? <Photo /> : Screen()}
        <Inputview text="Event Name" value={name} setValue={setName} />
        <Catego cat={cat} setCat={setCat} />
        <Inputview
          text="Description"
          value={description}
          setValue={setDescription}
        />
        <Priceinputview
          value={isFree}
          setPrice={setPrice}
          setvalue={setIsFree}
          text="Price Option"
        />
        {!isFree && (
          <Inputview
            text="Price (Ghc)"
            value={price}
            setValue={setPrice}
            keyboard="numeric"
          />
        )}

        <DnTview
          tnd={setdnt}
          show1={showd}
          date={date}
          tim={setTime}
          dat={setDate}
          time={time}
          show2={showt}
          set1={setd}
          set2={sett}
        />
        <Button
          title="Update"
          onPress={() => {
            update();
          }}
          buttonStyle={{
            marginTop: 20,
            padding: 15,
            backgroundColor: "#37A7E8",
          }}
          loading={loading}
          containerStyle={{ width: "100%" }}
          disabled={loading}
          disabledStyle={{ backgroundColor: "#6BAFE8" }}
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
