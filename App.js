import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./Signup";
import Intro from "./Intro";
import { useFonts } from "expo-font";
import Loading from "./Loading";
import { auth } from "./Firebase";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Main from "./Main";

const client = new ApolloClient({
  uri: "https://afternoon-beach-13592.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [loaded] = useFonts({
    Acolo: require("./fonts/Aclonica-Regular.ttf"),
    Ranch: require("./fonts/Rancho-Regular.ttf"),
    Titan: require("./fonts/TitanOne-Regular.ttf"),
    Noto: require("./fonts/NotoSansJP-Regular.otf"),
  });

  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      setUserLoggedIn(authUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (!loaded) {
    return null;
  }

  const Stack = createStackNavigator();
  if (loading) {
    return <Loading />;
  }

  if (userLoggedIn === null) {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />

            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: true, headerTitle: null }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
