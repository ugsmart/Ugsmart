import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Avatar, Overlay, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RadioButton } from "react-native-paper";
import { ADD_TUTOR } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { auth, storage } from "../Firebase";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Cam from "../Camera";

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

const Ipicker2 = ({ img, set, status, uploadFile, setImgUrl }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.Text}>Photo</Text>
      <Avatar
        onPress={() => {
          set(!status);
        }}
        source={{ uri: img }}
        rounded={true}
        size="xlarge"
        overlayContainerStyle={{ backgroundColor: "silver" }}
      />
      <Button
        title="upload"
        containerStyle={{ marginTop: 4 }}
        loading={loading}
        type="outline"
        onPress={() => {
          uploadFile(img, "TutorImages", setImgUrl, setLoading);
        }}
      />
    </View>
  );
};

const UploadedImg = ({ imgUrl, setImgUrl, setimage, deleteFile }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.Text}>Photo</Text>
      <Avatar
        source={{ uri: imgUrl }}
        rounded={true}
        size="xlarge"
        overlayContainerStyle={{ backgroundColor: "silver" }}
      />
      <Button
        loading={loading}
        title="delete"
        containerStyle={{ marginTop: 4 }}
        buttonStyle={{ borderColor: "red" }}
        titleStyle={{ color: "red" }}
        type="outline"
        onPress={() => deleteFile(imgUrl, setImgUrl, setimage, setLoading)}
      />
    </View>
  );
};

const Ipicker3 = ({ set, status }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.Text}>Photo</Text>
      <Avatar
        onPress={() => {
          set(!status);
        }}
        rounded={true}
        size="xlarge"
        overlayContainerStyle={{ backgroundColor: "silver" }}
        icon={{ name: "camera-outline", type: "ionicon" }}
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
        <RadioButton.Item label="Health Sciences" value="Health Sciences" />
        <RadioButton.Item
          label="Basic & Applied Sciences"
          value="Basic & Applied Sciences"
        />
        <RadioButton.Item label="Humanities" value="Humanities" />
        <RadioButton.Item label="Education" value="Education" />
      </RadioButton.Group>
    </View>
  );
};

const Duration = ({ time, settime }) => {
  return (
    <View>
      <Text style={styles.Text}>Duration</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          settime(value);
        }}
        value={time}
      >
        <RadioButton.Item label="Hourly" value="Hourly" />
        <RadioButton.Item label="Daily" value="Daily" />
        <RadioButton.Item label="Weekly" value="Weekly" />
        <RadioButton.Item label="Monthly" value="Monthly" />
      </RadioButton.Group>
    </View>
  );
};

const Ipicker = ({ fun, title }) => {
  return (
    <View>
      <Text style={styles.Text}>{title}</Text>
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

const Iview = ({ img, fun, title, uploadFile, setIdUrl }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Text style={styles.Text}>{title}</Text>
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
      <Button
        title="upload"
        containerStyle={{ marginTop: 4, alignSelf: "flex-start" }}
        type="outline"
        loading={loading}
        onPress={() => {
          uploadFile(img, "TutorIDs", setIdUrl, setLoading);
        }}
      />
    </View>
  );
};

const UploadedID = ({ idUrl, setIdUrl, setIDimage, deleteFile }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Text style={styles.Text}>Student ID</Text>
      <View style={styles.Iopc}>
        <Image
          style={{ flex: 1, width: "100%", borderRadius: 5 }}
          source={{ uri: idUrl }}
        />
      </View>
      <Button
        loading={loading}
        title="delete"
        containerStyle={{ marginTop: 4, alignSelf: "flex-start" }}
        buttonStyle={{ borderColor: "red" }}
        titleStyle={{ color: "red" }}
        type="outline"
        onPress={() => deleteFile(idUrl, setIdUrl, setIDimage, setLoading)}
      />
    </View>
  );
};

const Dview = ({ doc, docName, fun, title, uploadFile, setDocUrl }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Text style={styles.Text}>{title}</Text>
      <TouchableOpacity
        onPress={() => {
          fun();
        }}
        style={styles.Iopc}
      >
        <Icon
          size={RFPercentage(7.5)}
          name="document-text-outline"
          document-text-outline
          type="ionicon"
        />
        <Text style={{ marginTop: 5 }}>{docName}</Text>
      </TouchableOpacity>
      <Button
        title="upload"
        containerStyle={{ marginTop: 4, alignSelf: "flex-start" }}
        type="outline"
        loading={loading}
        onPress={() => {
          uploadFile(doc, "Transcripts", setDocUrl, setLoading);
        }}
      />
    </View>
  );
};

const UploadedDoc = ({ doc, docUrl, setDocUrl, setdoc, deleteFile }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View>
      <Text style={styles.Text}>Transcript</Text>
      <View style={styles.Iopc}>
        <Icon
          size={RFPercentage(7.5)}
          name="document-text-outline"
          document-text-outline
          type="ionicon"
        />
        <Text style={{ marginTop: 5 }}>{doc}</Text>
      </View>
      <Button
        loading={loading}
        title="delete"
        containerStyle={{ marginTop: 4, alignSelf: "flex-start" }}
        buttonStyle={{ borderColor: "red" }}
        titleStyle={{ color: "red" }}
        type="outline"
        onPress={() => deleteFile(docUrl, setDocUrl, setdoc, setLoading)}
      />
    </View>
  );
};

export default function Tform({ navigation, route }) {
  const { refresh, userName } = route.params;
  const [Add_Tutor] = useMutation(ADD_TUTOR);
  const [program, setProgram] = useState("");
  const [description, setDescription] = useState("");
  const [college, setCollege] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [visi, setvisi] = useState(false);

  //....Image Picker Codes....///
  const [image, setimage] = useState(null);
  const [IDimage, setIDimage] = useState(null); //ID CARD image link
  const [doc, setdoc] = useState(null); //Transcript doc link
  const [dname, setdname] = useState(null);
  const [done, setdone] = useState(false);
  const [done1, setdone1] = useState(false);
  const [done2, setdone2] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [idUrl, setIdUrl] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [time, settime] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setIDimage(result.uri);
      setdone1(true);
    }
  };

  const pickDoc = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: "application/pdf",
    });

    if (result.type == "success") {
      setdoc(result.uri);
      setdname(result.name);
      setdone2(true);
    }
  };

  const Screens = () => {
    if (image) {
      return (
        <Ipicker2
          set={setvisi}
          status={visi}
          img={image}
          uploadFile={uploadFile}
          setImgUrl={setImgUrl}
        />
      );
    } else {
      return <Ipicker3 set={setvisi} status={visi} />;
    }
  };

  const Screen1 = () => {
    if (IDimage) {
      return (
        <Iview
          title="Student ID"
          fun={pickImage}
          img={IDimage}
          uploadFile={uploadFile}
          setIdUrl={setIdUrl}
        />
      );
    } else {
      return <Ipicker title="Student ID" fun={pickImage} />;
    }
  };

  const Screen2 = () => {
    if (doc) {
      return (
        <Dview
          title="Transcript"
          doc={doc}
          docName={dname}
          fun={pickDoc}
          uploadFile={uploadFile}
          setDocUrl={setDocUrl}
        />
      );
    } else {
      return <Ipicker title="Transcript" fun={pickDoc} />;
    }
  };

  const uploadFile = async (file, bucket, setFileUrl, setLoading) => {
    setLoading(true);
    const response = await fetch(file);
    const blob = await response.blob();
    const bucketName = bucket;
    const storageRef = storage
      .ref()
      .child(`${bucketName}/${Date.now().toString()}`);
    storageRef.put(blob).on(
      "state_changed",
      () => {},
      (err) => {
        setLoading(false);
        console.log(err);
        alert(err.message);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setLoading(false);
        console.log(url);
        setFileUrl(url);
      }
    );
  };

  const deleteFile = (url, setFileUrl, setFile, setLoading) => {
    setLoading(true);
    storage
      .refFromURL(url)
      .delete()
      .then(() => {
        setLoading(false);
        setFile(null);
        setFileUrl("");
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };

  const upload = async () => {
    if (
      program === "" ||
      description === "" ||
      college === "" ||
      price === "" ||
      time === ""
    ) {
      alert("Please fill in all the relevant information");
    } else {
      if (imgUrl === "" || idUrl === "" || docUrl === "") {
        alert("Please Upload all the relevant images and document ");
      } else {
        setLoading(true);
        Add_Tutor({
          variables: {
            Program: program,
            Description: description,
            Price: price,
            Duration: time,
            College: college,
            Card: idUrl,
            Transcript: docUrl,
            Name: userName,
            Image: imgUrl,
            usermail: auth.currentUser.email,
          },
        })
          .then((data) => {
            Alert.alert(
              "Your Tutor Application has been sent and is currently in review."
            );
            navigation.goBack();
            refresh();
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            Alert.alert("Error Ocurred, Please try again");
            setLoading(false);
          });
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      <Text style={styles.Htext}>Tutor Form</Text>
      <View style={styles.Mview}>
        {imgUrl ? (
          <UploadedImg
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            setimage={setimage}
            deleteFile={deleteFile}
          />
        ) : (
          <Screens />
        )}
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
        {idUrl ? (
          <UploadedID
            idUrl={idUrl}
            setIdUrl={setIdUrl}
            setIDimage={setIDimage}
            deleteFile={deleteFile}
          />
        ) : (
          <Screen1 />
        )}
        {docUrl ? (
          <UploadedDoc
            doc={dname}
            docUrl={docUrl}
            setDocUrl={setDocUrl}
            setdoc={setdoc}
            deleteFile={deleteFile}
          />
        ) : (
          <Screen2 />
        )}
        <Inputview
          text="Price (Ghc)"
          value={price}
          setValue={setPrice}
          keyboard="numeric"
        />
        <Duration settime={settime} time={time} />
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
          containerStyle={{ width: "100%" }}
          loading={loading}
          disabled={loading}
          disabledStyle={{ backgroundColor: "#6BAFE8" }}
        />
      </View>
      <Overlay
        overlayStyle={{ padding: 0 }}
        fullScreen={true}
        onBackdropPress={() => setvisi(!visi)}
        isVisible={visi}
      >
        <Cam
          done={done}
          setdone={setdone}
          setvisi={setvisi}
          visi={visi}
          setimage={setimage}
        />
      </Overlay>
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
