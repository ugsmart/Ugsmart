import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AirbnbRating, Button, Divider } from "react-native-elements";
import { RATE_TUTOR } from "../GraphQL/Mutations";
import { PROFILE_NAME } from "../GraphQL/Queries";
import { auth } from "../Firebase";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";

const PostTRating = ({ navigation, route }) => {
  const { id, R_refresh } = route.params;
  const [userName, setUserName] = useState("");
  const { data, loading, error, refetch } = useQuery(PROFILE_NAME, {
    variables: { user: auth.currentUser.email },
  });
  useEffect(() => {
    if (data) {
      setUserName(data.Profile.Name);
    }
  }, [data]);
  const [Rate_Tutor] = useMutation(RATE_TUTOR);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewlength, setReviewlength] = useState(0);
  const [bLoading, setBLoading] = useState(false);
  const comm = (r) => {
    setRating(r);
  };
  const refresh = () => {
    refetch();
  };
  const submit = () => {
    Keyboard.dismiss();
    setBLoading(true);
    const d = new Date();
    Rate_Tutor({
      variables: {
        Tutor_id: id,
        value: rating,
        comment: review,
        date: d.toLocaleDateString(),
        username: userName,
        usermail: auth.currentUser.email,
      },
    })
      .then(() => {
        alert("Review has successfully been posted");
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
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refresh} />;
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Text style={styles.text}>Rate your experience</Text>
      <Divider style={{ marginTop: 20 }} />

      <AirbnbRating
        count={5}
        size={30}
        showRating={true}
        onFinishRating={comm}
        defaultRating={0}
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
        onPress={() => {
          if (rating === 0) {
            alert("Please select a Rating");
          } else {
            submit();
          }
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default PostTRating;

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
