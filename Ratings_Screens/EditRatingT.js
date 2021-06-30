import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { AirbnbRating, Button, Divider } from "react-native-elements";
import { EDIT_T_RATING } from "../GraphQL/Mutations";

const EditRatingT = ({ navigation, route }) => {
  const { userRating, R_refresh } = route.params;
  //   console.log(userRating);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewlength, setReviewlength] = useState(0);
  const [bLoading, setBLoading] = useState(false);

  const [Edit_Treviews] = useMutation(EDIT_T_RATING);
  useEffect(() => {
    setRating(userRating.value);
    setReview(userRating.comment);
    setReviewlength(review.length);
  }, [userRating]);

  const comm = (r) => {
    setRating(r);
  };

  const submit = () => {
    Keyboard.dismiss();
    setBLoading(true);
    Edit_Treviews({
      variables: {
        id: userRating._id,
        value: rating,
        comment: review,
      },
    })
      .then(() => {
        alert("Review has successfully been updated");
        navigation.goBack();
        R_refresh();
        setBLoading(false);
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        alert("Error occured, Please try again!");
        setBLoading(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Rate your experience</Text>
      <Divider style={{ marginTop: 20 }} />

      <AirbnbRating
        count={5}
        size={30}
        showRating={true}
        onFinishRating={comm}
        defaultRating={rating}
        selectedColor="green"
      />

      <TextInput
        multiline
        maxLength={300}
        placeholder="Write a review (Optional)"
        style={styles.TextInput}
        value={review}
        onChangeText={(val) => {
          setReview(val);
          setReviewlength(val.length);
        }}
      />
      <Text style={styles.numText}>{reviewlength}/300</Text>
      <Button
        buttonStyle={{ backgroundColor: "green", marginTop: 10 }}
        title="Submit"
        loading={bLoading}
        onPress={submit}
      />
    </ScrollView>
  );
};

export default EditRatingT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  TextInput: {
    borderColor: "green",
    padding: 5,
    borderWidth: 1,
    fontSize: 16,
    marginTop: 10,
  },
  numText: {
    textAlign: "right",
    marginVertical: 2,
  },
});
