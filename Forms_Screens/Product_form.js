import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { auth, storage } from "../Firebase";
import { isNamedType } from "graphql";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../GraphQL/Mutations";

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

const Ipicker = ({ fun1, fun3, fun2 }) => {
  return (
    <View>
      <Text style={styles.Text}>Product Photos</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            fun1();
          }}
          style={styles.Iopc}
        >
          <Icon
            size={RFPercentage(7)}
            name="add-circle-outline"
            type="ionicon"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            fun2();
          }}
          style={styles.Iopc}
        >
          <Icon
            size={RFPercentage(7)}
            name="add-circle-outline"
            type="ionicon"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            fun3();
          }}
          style={styles.Iopc}
        >
          <Icon
            size={RFPercentage(7)}
            name="add-circle-outline"
            type="ionicon"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const uploadImg = async (image, setImgUrl, setLoading) => {
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
      setLoading(false);
      alert(err.message);
    },
    async () => {
      const url = await storageRef.getDownloadURL();
      setImgUrl(url);
      setLoading(false);
    }
  );
};
const deleteImg = (url, setImgUrl, setImage, setLoading) => {
  setLoading(true);
  storage
    .refFromURL(url)
    .delete()
    .then(() => {
      setImgUrl("");
      setImage(null);
      setLoading(false);
    })
    .catch((err) => {
      alert(err.message);
      setLoading(false);
    });
};
const UploadedImg = ({ imgurl, setImgUrl, setImage }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ flex: 1, marginRight: 2 }}>
      <Image
        style={{ flex: 1, width: "100%", minHeight: 150, borderRadius: 5 }}
        source={{ uri: imgurl }}
      />
      <Button
        title="delete"
        type="outline"
        containerStyle={{ width: "70%" }}
        buttonStyle={{ borderColor: "red" }}
        titleStyle={{ color: "red" }}
        onPress={() => deleteImg(imgurl, setImgUrl, setImage, setLoading)}
        loading={loading}
      />
    </View>
  );
};
const UnuploadedImg = ({ fun, image, setImgUrl }) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          fun();
        }}
        style={styles.Iopc}
      >
        <Image
          style={{ flex: 1, width: "100%", borderRadius: 5 }}
          source={{ uri: image }}
        />
      </TouchableOpacity>
      {image && (
        <Button
          title="upload"
          type="outline"
          containerStyle={{ width: "70%" }}
          onPress={() => uploadImg(image, setImgUrl, setLoading)}
          loading={loading}
        />
      )}
    </View>
  );
};

const Iview = ({
  img1,
  img2,
  img3,
  setimage1,
  setimage2,
  setimage3,
  fun1,
  fun2,
  fun3,
  imgUrl_1,
  imgUrl_2,
  imgUrl_3,
  setImgUrl_1,
  setImgUrl_2,
  setImgUrl_3,
}) => {
  return (
    <View>
      <Text style={styles.Text}>Product Photo</Text>
      <View style={{ flexDirection: "row" }}>
        {imgUrl_1 ? (
          <UploadedImg
            imgurl={imgUrl_1}
            setImgUrl={setImgUrl_1}
            setImage={setimage1}
          />
        ) : (
          <UnuploadedImg fun={fun1} image={img1} setImgUrl={setImgUrl_1} />
        )}
        {imgUrl_2 ? (
          <UploadedImg
            imgurl={imgUrl_2}
            setImgUrl={setImgUrl_2}
            setImage={setimage2}
          />
        ) : (
          <UnuploadedImg fun={fun2} image={img2} setImgUrl={setImgUrl_2} />
        )}
        {imgUrl_3 ? (
          <UploadedImg
            imgurl={imgUrl_3}
            setImgUrl={setImgUrl_3}
            setImage={setimage3}
          />
        ) : (
          <UnuploadedImg fun={fun3} image={img3} setImgUrl={setImgUrl_3} />
        )}
      </View>
    </View>
  );
};

const Catego = ({ value, setValue }) => {
  return (
    <View>
      <Text style={styles.Text}>Product Category</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setValue(value);
        }}
        value={value}
      >
        <RadioButton.Item
          label="Beauty & Cosmetics"
          value="Beauty & Cosmetics"
        />
        <RadioButton.Item label="Educational Items" value="Educational Items" />
        <RadioButton.Item
          label="Electronics & Accessories"
          value="Electronics & Accessories"
        />
        <RadioButton.Item label="Fashion" value="Fashion" />
        <RadioButton.Item label="Food & Drinks" value="Food & Drinks" />
        <RadioButton.Item
          label="Sports & Accessories"
          value="Sports & Accessories"
        />
      </RadioButton.Group>
    </View>
  );
};

const Barter = ({ value, setValue }) => {
  return (
    <View>
      <Text style={styles.Text}>Barter Trading</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setValue(value);
        }}
        value={value}
      >
        <RadioButton.Item label="Yes" value="true" />
        <RadioButton.Item label="No" value="false" />
      </RadioButton.Group>
    </View>
  );
};

export default function Pform({ navigation, route }) {
  const { refresh } = route.params;
  const [Add_Product] = useMutation(ADD_PRODUCT);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [barter, setBarter] = useState("");
  //....Image Picker Codes....///
  const [image1, setimage1] = useState(null);
  const [done1, setdone1] = useState(false);
  const [image2, setimage2] = useState(null);
  const [done2, setdone2] = useState(false);
  const [image3, setimage3] = useState(null);
  const [done3, setdone3] = useState(false);
  console.log(barter);
  const [imgUrl_1, setImgUrl_1] = useState("");
  const [imgUrl_2, setImgUrl_2] = useState("");
  const [imgUrl_3, setImgUrl_3] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setimage1(result.uri);
      setdone1(true);
    }
  };

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setimage2(result.uri);
      setdone2(true);
    }
  };

  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setimage3(result.uri);
      setdone3(true);
    }
  };
  //End...
  const Screen = () => {
    if (image1 || image2 || image3) {
      return (
        <Iview
          fun1={pickImage1}
          fun2={pickImage2}
          fun3={pickImage3}
          img1={image1}
          img2={image2}
          img3={image3}
          setimage1={setimage1}
          setimage2={setimage2}
          setimage3={setimage3}
          imgUrl_1={imgUrl_1}
          imgUrl_2={imgUrl_2}
          imgUrl_3={imgUrl_3}
          setImgUrl_1={setImgUrl_1}
          setImgUrl_2={setImgUrl_2}
          setImgUrl_3={setImgUrl_3}
        />
      );
    } else {
      return <Ipicker fun1={pickImage1} fun2={pickImage2} fun3={pickImage3} />;
    }
  };

  const upload = () => {
    if (
      name === "" ||
      category === "" ||
      description === "" ||
      barter === "" ||
      price === ""
    ) {
      alert("Please fill in all the relevant information");
    } else {
      if (imgUrl_1 === "" || imgUrl_2 === "" || imgUrl_3 === "") {
        alert("Please upload at least three images of the Product");
      } else {
        setLoading(true);
        Add_Product({
          variables: {
            Name: name,
            Category: category,
            Description: description,
            Bater: barter,
            Price: price,
            Images: { Image1: imgUrl_1, Image2: imgUrl_2, Image3: imgUrl_3 },
            usermail: auth.currentUser.email,
          },
        })
          .then(() => {
            setLoading(false);
            alert("Product has been added successfully");
            navigation.goBack();
            refresh();
          })
          .catch((err) => {
            console.log(err);
            alert("Error occured, Please try again!");
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
      <View style={styles.Mview}>
        {Screen()}
        <Inputview text="Product Name" value={name} setValue={setName} />
        <Inputview
          text="Description"
          value={description}
          setValue={setDescription}
        />
        <Catego value={category} setValue={setCategory} />
        <Barter value={barter} setValue={setBarter} />
        <Inputview text="Price Details" value={price} setValue={setPrice} />
        <Button
          title="Done"
          onPress={() => {
            upload();
          }}
          loading={loading}
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
    margin: 2,
  },
});
