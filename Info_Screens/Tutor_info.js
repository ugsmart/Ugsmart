import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Share,
} from "react-native";
import { Button, Icon, Avatar, AirbnbRating } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import ErrorPage from "../ErrorPage";
import { auth, db } from "../Firebase";
import { T_REVIEWS } from "../GraphQL/Queries";
import Loading from "../Loading";
const noImage = require("../assets/noImage.jpg");
import * as Linking from "expo-linking";
import { RatingItem } from "../Ratings_Screens/RatingPage";
import { DELETE_T_RATING } from "../GraphQL/Mutations";

const link = "https://expo.io/@adlai/Ugsmart";
const Social = async () => {
  try {
    const result = await Share.share({
      title: "UG Smart",
      message:
        `Heya, I just put up my Tutor Profile on UG-smart link the link below to download the app and view my Event. '\n` +
        link,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const Des_view = ({
  nav,
  item,
  Ratings,
  refresh,
  deleMut,
  chatLoading,
  setChatLoading,
}) => {
  const [loading, setLoading] = useState(false);
  let total = 0;
  Ratings.map((item) => {
    total = total + item.value;
  });
  const overallRating = (total / Ratings.length).toFixed(1);

  const userRating = Ratings.find(
    (item) => item.usermail === auth.currentUser.email
  );

  const deleteRating = () => {
    Alert.alert("Ugsmart", "Are you sure you want to Delete your review?", [
      {
        text: "Yes",
        onPress: () => {
          setLoading(true);
          deleMut({
            variables: {
              id: userRating._id,
            },
          })
            .then(() => {
              alert("Review deleted successfully");
              refresh();
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              alert("An error occured, Please try again");
              setLoading(false);
            });
        },
      },
      { text: "No" },
    ]);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <ImageBackground
          blurRadius={5}
          style={{
            flex: 1,
            padding: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
          source={item.Image ? { uri: item.Image } : noImage}
        >
          <Avatar
            rounded={true}
            size={300}
            source={item.Image ? { uri: item.Image } : noImage}
          />
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <View style={styles.tview}>
          <Text style={styles.title}>{item.Name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="share-social-outline"
              size={RFPercentage(4)}
              type="ionicon"
              onPress={() => Social()}
            />
          </View>
        </View>
        <Text style={styles.text}>{item.Description}</Text>
        <Text style={styles.Ptext}>Program</Text>
        <Text style={styles.text}>{item.Program}</Text>
        <Text style={styles.Ptext}>Price Details</Text>
        <Text style={styles.text}>
          Ghc {item.Price} {item.Duration}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.row}
          onPress={() => {
            Ratings.length === 0
              ? alert("There are no reviews for this Tutor yet")
              : nav.navigate("Ratings T", { id: item._id });
          }}
        >
          <Text style={styles.Ptext}>Rating and Reviews </Text>
          <Icon name="arrow-right" type="feather" />
        </TouchableOpacity>
        <View style={styles.row2}>
          <Text style={{ fontSize: 45, marginRight: 5 }}>
            {Ratings.length === 0 ? "N/A" : overallRating}
          </Text>
          <AirbnbRating
            count={5}
            showRating={false}
            size={20}
            isDisabled
            defaultRating={overallRating}
          />
          <Text style={{ color: "grey" }}>({Ratings.length})</Text>
        </View>
        {item.usermail !== auth.currentUser.email && (
          <>
            {userRating ? (
              <View>
                <RatingItem item={userRating} div={false} />
                <View style={{ flexDirection: "row" }}>
                  <Button
                    title="Edit Review"
                    titleStyle={{
                      color: "green",
                    }}
                    type="clear"
                    onPress={() => {
                      nav.navigate("EditRatingT", {
                        userRating,
                        R_refresh: refresh,
                      });
                    }}
                  />
                  <Button
                    title="Delete Review "
                    titleStyle={{
                      color: "red",
                    }}
                    type="clear"
                    loading={loading}
                    onPress={() => {
                      deleteRating();
                    }}
                  />
                </View>
              </View>
            ) : (
              <Button
                title="Post review"
                buttonStyle={{ alignSelf: "flex-end" }}
                titleStyle={{
                  color: "green",
                }}
                type="clear"
                onPress={() => {
                  nav.navigate("Rate Tutor", {
                    id: item._id,
                    R_refresh: refresh,
                  });
                }}
              />
            )}
          </>
        )}
        {item.usermail !== auth.currentUser.email && (
          <Button
            onPress={() => {
              setChatLoading(true);
              let chats = [];
              db.collection("chats")
                .get()
                .then((snap) => {
                  snap.docs.map((doc) => {
                    chats.push({ id: doc.id, ...doc.data() });
                  });
                  const newChats = chats.filter(
                    (itemC) =>
                      itemC.chatName.includes(auth.currentUser.email) &&
                      itemC.chatName.includes(item.usermail)
                  );

                  if (newChats.length === 0) {
                    db.collection("chats")
                      .add({
                        chatName: `${auth.currentUser.email}${item.usermail}`,
                      })
                      .then((docRef) => {
                        console.log(docRef.id);
                        setChatLoading(false);
                        nav.navigate("Chat", { id: docRef.id });
                      })
                      .catch((err) => {
                        alert(err.message);
                        setChatLoading(false);
                      });
                  } else {
                    setChatLoading(false);
                    nav.navigate("Chat", { id: newChats[0].id });
                    console.log(newChats[0].id);
                  }
                })
                .catch((err) => {
                  alert(err.message);
                  setChatLoading(false);
                });
            }}
            title="Chat Me"
            containerStyle={{ marginTop: 10 }}
            buttonStyle={{
              padding: 15,
              backgroundColor: "green",
              marginTop: 10,
            }}
            loading={chatLoading}
            disabled={chatLoading}
            disabledStyle={{ backgroundColor: "green" }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default function Itutor({ navigation, route }) {
  const { item } = route.params;
  const [ratings, setRatings] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [Delete_Treviews] = useMutation(DELETE_T_RATING);
  const { data, loading, error, refetch } = useQuery(T_REVIEWS, {
    variables: { id: item._id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setRatings(data.T_reviews);
    }
  }, [data]);
  const refresh = () => {
    refetch();
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refresh} />;
  }

  return (
    <Des_view
      nav={navigation}
      item={item}
      Ratings={ratings}
      refresh={refresh}
      deleMut={Delete_Treviews}
      chatLoading={chatLoading}
      setChatLoading={setChatLoading}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFPercentage(4),
    fontFamily: "Rub",
    fontWeight: "bold",
  },
  tview: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontSize: RFPercentage(2.5),
    fontFamily: "Rub",
  },
  Ptext: {
    fontWeight: "bold",
    fontSize: RFPercentage(3),
  },
  content: {
    flex: 1,
    padding: 8,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 3,
    marginTop: 5,
  },
  row2: { flexDirection: "row", alignItems: "center" },
});
