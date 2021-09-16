import { useQuery } from "@apollo/client";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { GET_PRODUCT_CATEGORY } from "../GraphQL/Queries";
import { Search } from "../Home_Screens/Home_tutor";
import Loading from "../Loading";

const noImage = require("../assets/noImage.jpg");

const Eview = ({ nav, item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate("Product Info", { item });
      }}
      style={styles.tutorview}
    >
      <Avatar
        rounded={true}
        size={RFPercentage(22)}
        source={item.Images.Image1 ? { uri: item.Images.Image1 } : noImage}
      />
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Rub",
          fontSize: RFPercentage(3),
          marginTop: 10,
        }}
      >
        {item.Name}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: RFPercentage(2),
          fontFamily: "Rub",
        }}
      >
        Ghc {item.Price}
      </Text>
      {item.Bater && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Bater trade</Text>
          <Icon
            containerStyle={{ alignSelf: "center", marginLeft: 5 }}
            type="ionicon"
            name="checkmark-circle"
            color="green"
            size={16}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function Sproduct({ navigation, route }) {
  const { name } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_PRODUCT_CATEGORY, {
    variables: { cate: name },
  });

  const [productCate, setProductCate] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState([]);
  useEffect(() => {
    if (data) {
      setProductCate(data.Product_Cate);
    }
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }, [data]);
  useLayoutEffect(() => {
    setSearched(
      productCate.filter(
        (item) =>
          item.Name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
      )
    );
  }, [searchInput, productCate]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refetch} />;
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchview}>
          <Search
            place="Search Product..."
            value={searchInput}
            setValue={setSearchInput}
          />
        </View>
        <View style={styles.content}>
          {productCate.length === 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Icon
                size={RFPercentage(10)}
                name="cart-outline"
                type="ionicon"
              />
              <Text>No Products under this Category yet.</Text>
            </View>
          )}
          {searched.length === 0 && productCate.length !== 0 && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Products found.</Text>
            </View>
          )}
          <FlatList
            numColumns={2}
            data={searched}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Eview nav={navigation} item={item} />}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  searchview: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  content: {
    flex: 4,
    padding: 5,
    justifyContent: "center",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
    maxHeight: 220,
    maxWidth: "50%",
  },
});
