import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import { Button, Icon, AirbnbRating } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SliderBox } from "react-native-image-slider-box";
import { auth, db } from "../Firebase";
import { useMutation, useQuery } from "@apollo/client";
import { P_REVIEWS } from "../GraphQL/Queries";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import * as Linking from "expo-linking";
import { RatingItem } from "../Ratings_Screens/RatingPage";
import { DELETE_P_RATING } from "../GraphQL/Mutations";

const link = Linking.createURL(`/Iproduct`);
const Social = async () => {
  try {
    const result = await Share.share({
      title: "UG Smart",
      message:
        `Heya, I just up some products on UG-Smart you might be intreasted in. Click on the link to know more about the Event.\n` +
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

const Des_view = ({ nav, item, Ratings, refresh, deleMut }) => {
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
        <SliderBox
          resizeMethod={"auto"}
          height={400}
          sliderBoxHeight={370}
          paginationBoxVerticalPadding={1}
          dotColor="red"
          inactiveDotColor="grey"
          images={Object.values(item.Images).slice(1)}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.tview}>
          <Text style={styles.title}>{item.Name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
            <Icon
              name="share-social-outline"
              size={RFPercentage(4)}
              type="ionicon"
              onPress={() => Social()}
            />
          </View>
        </View>
        <Text style={styles.text}>{item.Description}</Text>
        <Text style={styles.Ptext}>Price Details</Text>
        <Text style={styles.price}>{item.Price}</Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={styles.Ptext}>Barter Trade</Text>
          {item.Bater ? (
            <Icon
              color="green"
              name="checkmark-circle-outline"
              type="ionicon"
            />
          ) : (
            <Icon color="red" name="close-circle-outline" type="ionicon" />
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.row}
          onPress={() => {
            Ratings.length === 0
              ? alert("There are no reviews for this Product yet")
              : nav.navigate("Ratings P", { id: item._id });
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
                      nav.navigate("EditRatingP", {
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
                onPress={() =>
                  nav.navigate("Post Rating", {
                    id: item._id,
                    R_refresh: refresh,
                  })
                }
              />
            )}
          </>
        )}
        {item.usermail !== auth.currentUser.email && (
          <Button
            onPress={() => {
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
                        nav.navigate("Chat", { id: docRef.id });
                      })
                      .catch((err) => alert(err.message));
                  } else {
                    nav.navigate("Chat", { id: newChats[0].id });
                    console.log(newChats[0].id);
                  }
                })
                .catch((err) => alert(err.message));
            }}
            title="Chat Me"
            containerStyle={{ marginTop: 10 }}
            buttonStyle={{ padding: 15, backgroundColor: "green", marginTop: 10 }}
          />
        )}
      </View>
    </ScrollView>
  );
};
//checkmark-circle-outline
export default function Iproduct({ navigation, route }) {
  const { item } = route.params;
  const [ratings, setRatings] = useState([]);
  const [Delete_Previews] = useMutation(DELETE_P_RATING);
  const { data, loading, error, refetch } = useQuery(P_REVIEWS, {
    variables: { id: item._id },
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (data) {
      setRatings(data.P_reviews);
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
      deleMut={Delete_Previews}
    />
  );
}
//close-circle
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
    fontSize: RFPercentage(2.4),
    fontFamily: "Rub",
  },
  Ptext: {
    fontWeight: "bold",
    fontSize: RFPercentage(2.8),
    marginRight: 8,
    fontFamily: "Rub",
  },
  content: {
    flex: 1,
    padding: 8,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  price: {
    fontSize: RFPercentage(2.4),
    fontFamily: "Rub",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    paddingRight: 3,

  },
  row2: { flexDirection: "row", alignItems: "center" },
});
