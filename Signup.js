import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

import { auth } from "./Firebase";

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
          style={{ fontSize: RFPercentage(2.8), padding: 5 }}
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
          style={{ fontSize: RFPercentage(2.8), padding: 5 }}
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });

        console.log(authUser);
        alert("success");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={style.logview}>
        <Image
          style={style.img}
          resizeMode="center"
          source={require("./assets/img.png")}
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
          onPress={signUp}
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
