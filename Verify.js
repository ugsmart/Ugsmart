import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-elements";
import { auth } from "./Firebase";
import { AntDesign } from "@expo/vector-icons";

const Verify = ({ navigation }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [sendEmailLoad, setSendEmailLoad] = useState(false);
  const [goHomeLoad, setGoHomeLoad] = useState(false);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser.emailVerified) {
        navigation.replace("Main");
      }
    });

    return unsub;
  }, []);

  const sendVerificationLink = () => {
    setSendEmailLoad(true);
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        setEmailSent(true);
        alert("Verification link sent");
        setSendEmailLoad(false);
      })
      .catch((err) => {
        setSendEmailLoad(false);
        alert(err.message);
      });
  };

  const goToHome = () => {
    setGoHomeLoad(true);
    auth.currentUser
      .reload()
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user.emailVerified) {
            navigation.replace("Main");
          } else {
            alert("You are still not verified, Check email");
          }
          setGoHomeLoad(false);
        });
      })
      .catch((err) => {
        alert(err.message);
        setGoHomeLoad(false);
      });
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => { })
      .catch((err) => alert(err.message));
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/email.png")} style={styles.image} />
      <Text h2>Verify Email</Text>
      <View style={styles.success}>
        <Text h5 style={styles.textSuccess}>
          You have Successfully Registered
        </Text>
        <AntDesign name="checkcircle" size={22} color="green" />
      </View>
      {!emailSent ? (
        <View style={styles.section}>
          <Text style={styles.text}>
            Please click on the button to send a Verification Link to your email
          </Text>
          <Button
            type="outline"
            containerStyle={styles.btn}
            title="Get Verification Link"
            onPress={sendVerificationLink}
            loading={sendEmailLoad}
          />
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.text}>
            A Verification link has been sent to your email. Click on the
            Verification link to verify your email and then click on the button
            below
          </Text>
          <Button
            containerStyle={styles.btn}
            raised
            title="Take Me Home"
            onPress={goToHome}
            loading={goHomeLoad}
          />
          <Button
            containerStyle={styles.btn}
            type="outline"
            title="Resend"
            onPress={() => setEmailSent(false)}
          />
        </View>
      )}

      <Button
        title="Logout"
        type="clear"
        onPress={logout}
        style={{ marginTop: 15 }}
      />
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  success: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    width: 200,
    marginTop: 15,
    alignSelf: "center",
  },
  text: {
    fontFamily: "Noto",
    textAlign: "center",
  },
  textSuccess: {
    fontFamily: "Noto",
    fontWeight: "bold",
    color: "green",
    marginRight: 3,
  },
  section: { marginTop: 10 },
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
});
