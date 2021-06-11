import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "./Firebase";
import firebase from "firebase";
import { useQuery } from "@apollo/client";
import { PROFILE_NAME } from "./GraphQL/Queries";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

export default function Chat({ route }) {
  const { data, loading, error, refetch } = useQuery(PROFILE_NAME, {
    variables: {
      user: auth.currentUser.email,
    },
  });
  const { id } = route.params;
  const [userName, setuserName] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = db.collection("chats").doc(id).collection("messages");

  const refresh = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setuserName(data.Profile.Name);
    }
  }, [data]);

  useEffect(() => {
    const unsub = chatRef.orderBy("createdAt", "desc").onSnapshot((snap) => {
      if (snap)
        setMessages(
          snap.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              createdAt: data.createdAt.toDate(),
            };
          })
        );
    });
    return unsub;
  }, []);

  const onSend = async (messages) => {
    const write = messages.map((m) =>
      chatRef.add({
        ...m,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
    await Promise.all(write).catch((err) => {
      console.log(err);
      alert("Error occured");
    });
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage refresh={refresh} />;
  }

  return (
    <GiftedChat
      placeholder="Type a message..."
      showUserAvatar={true}
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.uid,
        name: userName,
      }}
    />
  );
}
