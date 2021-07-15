import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Alert, FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Icon } from "react-native-elements";
import ErrorPage from "../ErrorPage";
import { auth, storage } from "../Firebase";
import { DELETE_PRODUCT } from "../GraphQL/Mutations";
import { MY_PRODUCTS } from "../GraphQL/Queries";
import Loading from "../Loading";
import { RFPercentage } from "react-native-responsive-fontsize";

const noImage = require("../assets/noImage.jpg");

const ProductItem = ({ item, toEdit, viewProduct, deleteProduct }) => (
  <View style={styles.eventCon}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Avatar
        source={item.Images.Image1 ? { uri: item.Images.Image1 } : noImage}
        rounded
        size="medium"
      />
      <Text style={styles.title}>{item.Name}</Text>
    </View>
    <View style={{ flexDirection: "row", marginTop: 7 }}>
      <Button
        title="View"
        type="clear"
        titleStyle={{ color: "green" }}
        onPress={() => {
          viewProduct(item);
        }}
      />
      <Button
        title="Edit"
        type="clear"
        onPress={() => {
          toEdit(item);
        }}
      />
      <Button
        title="Delete"
        type="clear"
        titleStyle={{ color: "red" }}
        onPress={() => {
          deleteProduct(item._id, item.Images);
        }}
      />
    </View>
  </View>
);

const MyProducts = ({ navigation }) => {
  const [myProducts, setMyProducts] = useState([]);
  const { data, loading, error, refetch } = useQuery(MY_PRODUCTS, {
    variables: { user: auth.currentUser.email },
    fetchPolicy: "network-only",
  });
  const [Delete_Product] = useMutation(DELETE_PRODUCT);
  useEffect(() => {
    if (data) {
      setMyProducts(data.User_Product);
    }
  }, [data, error]);
  const refresh = () => {
    refetch();
  };
  const deleteImgs = (img1, img2, img3) => {
    storage.refFromURL(img1).delete();
    storage.refFromURL(img2).delete();
    storage.refFromURL(img3).delete();
  };

  const DeleteProduct = (id, Images) => {
    return Alert.alert(
      "Delete Product",
      "Are you sure, action is irreversible.",
      [
        {
          text: "Delete",
          onPress: () => {
            deleteImgs(Images.Image1, Images.Image2, Images.Image3);
            Delete_Product({
              variables: {
                id,
              },
            })
              .then(() => {
                alert("Deleted Successfully");
                refresh();
              })
              .catch((err) => {
                alert("Error occured, Try again");
                console.log(err);
              });
          },
        },
        { text: "Cancel" },
      ]
    );
  };
  const toEdit = (item) => {
    navigation.navigate("Product Edit", { item, refresh });
  };
  const viewProduct = (item) => {
    navigation.navigate("Product Info", { item });
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refresh} />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigation.navigate("Product Form", { refresh });
        }}
      >
        <Icon name="add-outline" type="ionicon" color="white" />
      </TouchableOpacity>
      <View style={{ paddingVertical: 10 }}>
        {myProducts.length === 0 && (
          <View
            style={{ justifyContent: 'center' }}
          >
            <Icon
              size={RFPercentage(6)}
              name="cart-outline"
              type="ionicon"
            />
            <Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>No Products yet</Text>
          </View>
        )}
        <FlatList
          data={myProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductItem
              item={item}
              deleteProduct={DeleteProduct}
              toEdit={toEdit}
              viewProduct={viewProduct}
            />
          )}
        />
      </View>
    </View>
  );
};

export default MyProducts;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 7, backgroundColor: 'white' },
  title: { fontSize: 17, fontWeight: "bold", marginLeft: 5 },
  eventCon: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    elevation: 5,
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 8,
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 10,
  },
});
