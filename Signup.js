import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { auth } from "./Firebase";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./GraphQL/Mutations";
import * as Animatable from "react-native-animatable";

const Textview = ({ text, num, icon, value, setValue }) => {
  return (
    <View
      style={{
        backgroundColor: "#eee",
        width: "100%",
        padding: 5,
        marginTop: num,
        borderRadius: 5,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 0.5,
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={30} name={icon} type="ionicon" />
      </View>
      <View style={{ flex: 4.2, padding: 5, justifyContent: "center" }}>
        <TextInput
          style={{ fontSize: RFPercentage(2.8), padding: 5, fontFamily: "Rub" }}
          placeholder={text}
          value={value}
          onChangeText={setValue}
        />
      </View>
    </View>
  );
};

const Textview1 = ({ num, value, setValue }) => {
  const [jud, setjud] = useState(true);
  const [eye, seteye] = useState("eye-off-outline");
  //Function that changes icon on press
  const check = () => {
    if (eye == "eye-off-outline") {
      seteye("eye-outline");
    } else {
      seteye("eye-off-outline");
    }
  };
  //End...
  return (
    <View
      style={{
        backgroundColor: "#eee",
        width: "100%",
        padding: 5,
        marginTop: num,
        borderRadius: 5,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 0.5,
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={25} name="lock-open-outline" type="ionicon" />
      </View>
      <View style={{ flex: 4.2, padding: 5, justifyContent: "center" }}>
        <TextInput
          style={{ fontSize: RFPercentage(2.8), padding: 5, fontFamily: "Rub" }}
          placeholder="Password"
          value={value}
          onChangeText={setValue}
          secureTextEntry={jud}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          padding: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          size={22}
          name={eye}
          onPress={() => {
            setjud(!jud);
            check();
          }}
          type="ionicon"
        />
      </View>
    </View>
  );
};

export default function Signup({ navigation }) {
  const [Add_User] = useMutation(CREATE_USER);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const signUp = () => {
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Add_User({
          variables: {
            Name: name,
            Email: email,
            Contact: phone,
          },
        })
          .then(() => {
            alert("You have successfully registered");
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            alert("Error occured, Try Again");
            setLoading(false);
          });
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{
        flexGrow: 2,
        justifyContent: "center",
        padding: 10,
      }}
    >
      <Animatable.Image
        animation="fadeInRight"
        duration={2000}
        style={style.img}
        resizeMode="center"
        source={require("./assets/icon.png")}
      />
      <Text
        style={{
          fontFamily: "Titan",
          alignSelf: "flex-start",
          fontSize: RFPercentage(8.2),
        }}
      >
        SignUp
      </Text>
      <Textview
        text="Name"
        num={20}
        icon="person-outline"
        value={name}
        setValue={setName}
      />
      <Textview
        text="E-mail"
        num={20}
        icon="mail-outline"
        value={email}
        setValue={setEmail}
      />
      <Textview
        text="Telephone"
        num={20}
        icon="phone-portrait-outline"
        value={phone}
        setValue={setPhone}
      />
      <Textview1 num={20} value={password} setValue={setPassword} />
      <Button
        title="Signup"
        titleStyle={{ fontFamily: "Rub", fontWeight: "bold" }}
        onPress={signUp}
        buttonStyle={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#37A7E8",
        }}
        containerStyle={{ width: "100%" }}
        loading={loading}
        disabled={loading}
        disabledStyle={{ backgroundColor: "#6BAFE8" }}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  logview: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
