import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "./Firebase";
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

  useLayoutEffect(() => {
    const unsub = chatRef.orderBy("createdAt", "desc").onSnapshot((snap) =>
      setMessages(
        snap.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );
    return unsub;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    chatRef.add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

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
