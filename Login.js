import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Button, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { auth } from "./Firebase";

const Textview = ({ text, num, jud, icon, value, setEmail }) => {
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
        <Icon size={25} name={icon} type="ionicon" />
      </View>
      <View style={{ flex: 4.2, padding: 5, justifyContent: "center" }}>
        <TextInput
          style={{ fontSize: RFPercentage(2.8), padding: 5, fontFamily: "Rub" }}
          placeholder={text}
          secureTextEntry={jud}
          value={value}
          onChangeText={setEmail}
        />
      </View>
    </View>
  );
};

const Textview1 = ({ num, value, setPassword }) => {
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
          secureTextEntry={jud}
          value={value}
          onChangeText={setPassword}
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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ flexGrow: 2, justifyContent: 'center', padding: 10 }}>
      <Image
        style={style.img}
        resizeMode="center"
        source={require("./assets/icon.png")}
      />
      <Text
        style={{
          fontSize: RFPercentage(8.5),
          fontFamily: "Titan",
          alignSelf: "center",
        }}
      >
        Login
      </Text>
      <Textview
        text="Email"
        num={20}
        icon="mail-outline"
        jud={false}
        value={email}
        setEmail={setEmail}
      />
      <Textview1
        num={10}
        jud={true}
        value={password}
        setPassword={setPassword}
      />
      <Button
        loading={loading}
        title="Login"
        onPress={login}
        titleStyle={{ fontFamily: "Rub", fontWeight: 'bold' }}
        buttonStyle={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#37A7E8",
        }}
        containerStyle={{ width: "100%" }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
        style={style.Opac}
      >
        <Text style={style.text}>Don't have an Account? Sign up now.</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e3",
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
    alignSelf: "center"
  },
  text: {
    fontFamily: "Rub",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: RFPercentage(2.5),
    color: "grey",
  },
  Opac: {
    marginTop: 10,
  },
});
