import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import ErrorPage from "../ErrorPage";
import { GET_PRODUCTS } from "../GraphQL/Queries";
import { Search } from "../Home_Screens/Home_tutor";
import Loading from "../Loading";

const noImage = require("../assets/noImage.jpg");

//Individual View used for Product Display...
const Eview = ({ item, nav }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("Product Info", { item });
      }}
      style={styles.tutorview}
    >
      <Avatar
        rounded={true}
        size={RFPercentage(20)}
        source={item.Images.Image1 ? { uri: item.Images.Image1 } : noImage}
      />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Ranch",
          fontSize: RFPercentage(3.8),
          marginTop: 10,
        }}
      >
        {item.Name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: RFPercentage(2.8),
          fontFamily: "Ranch",
        }}
      >
        {item.Price}
      </Text>
    </TouchableOpacity>
  );
};

//View used for our Category List in the Product Home View...
const Viewz = ({ name, nav, data }) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Product", { name });
        }}
        style={styles.touch}
      >
        <Text style={styles.title}>{name}</Text>
        <Icon name="chevron-forward" type="ionicon" />
      </TouchableOpacity>
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Eview nav={nav} item={item} />}
      />
    </View>
  );
};
//End...

export default function Hproduct({ navigation }) {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
  const [beautyCos, setBeautyCos] = useState([]);
  const [educational, setEducational] = useState([]);
  const [elecAcc, setElecAcc] = useState([]);
  const [fashion, setFashion] = useState([]);
  const [foodD, setFoodD] = useState([]);
  const [sportsA, setSportsA] = useState([]);

  const refresh = () => {
    refetch();
  };
  useEffect(() => {
    if (data) {
      const products = data.Products;
      const beaut = products.filter(
        (item) => item.Category === "Beauty & Cosmetics"
      );
      setBeautyCos(beaut);
      const edu = products.filter(
        (item) => item.Category === "Educational Items"
      );
      setEducational(edu);
      const elec = products.filter(
        (item) => item.Category === "Electronics & Accessories"
      );
      setElecAcc(elec);
      const fash = products.filter((item) => item.Category === "Fashion");
      setFashion(fash);
      const food = products.filter((item) => item.Category === "Food & Drinks");
      setFoodD(food);
      const sports = products.filter(
        (item) => item.Category === "Sports & Accessories"
      );
      setSportsA(sports);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refresh} />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.searchview}>
          <Search place="Search Product..." />
        </View>
        {beautyCos.length > 0 && (
          <Viewz nav={navigation} name="Beauty & Cosmetics" data={beautyCos} />
        )}
        {educational.length > 0 && (
          <Viewz nav={navigation} name="Educational Items" data={educational} />
        )}
        {elecAcc.length > 0 && (
          <Viewz
            nav={navigation}
            name="Electronics & Accessories"
            data={elecAcc}
          />
        )}
        {fashion.length > 0 && (
          <Viewz nav={navigation} name="Fashion" data={fashion} />
        )}
        {foodD.length > 0 && (
          <Viewz nav={navigation} name="Food & Drinks" data={foodD} />
        )}
        {sportsA.length > 0 && (
          <Viewz nav={navigation} name="Sports & Accessories" data={sportsA} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchview: {
    flex: 0.1,
    alignItems: "center",
    padding: 8,
  },
  content: {
    flex: 4,
    padding: 5,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Titan",
    fontSize: RFPercentage(3.4),
    padding: 5,
  },
  Event: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tutorview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    elevation: 5,
    maxHeight: 230,
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
