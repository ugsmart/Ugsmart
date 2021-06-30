import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Chat from "./Chat";
import Tab from "./Tabs_view";
import Ievent from "./Info_Screens/Event_info";
import Itutor from "./Info_Screens/Tutor_info";
import Iproduct from "./Info_Screens/Product_info";
import Sevent from "./Home_Sub_Screens/Sub_event";
import Sproduct from "./Home_Sub_Screens/Sub_product";
import Tform from "./Forms_Screens/Tutor_form";
import Change from "./Accounts_Screen/Changepass";
import Invite from "./Accounts_Screen/Invite";
import Verify from "./Verify";
import TutorEdit from "./Forms_Screens/Edit_Tutor_form";
import Splash from "./SplashScreen";
import Eform from "./Forms_Screens/Event_form";
import EditEvent from "./Forms_Screens/Edit_Event_Form";
import Pform from "./Forms_Screens/Product_form";
import ProductEdit from "./Forms_Screens/Edit_Product_Form";
import Stutor from "./Home_Sub_Screens/sub_Tutor";
import RatingPage from "./Ratings_Screens/RatingPage";
import PostRating from "./Ratings_Screens/PostRating";
import ChatHistory from "./ChatHistory";
import PostTRating from "./Ratings_Screens/PostTRating";
import RatingPageT from "./Ratings_Screens/RatingPageT";
import EditRatingP from "./Ratings_Screens/EditRatingP";
import EditRatingT from "./Ratings_Screens/EditRatingT";

//Header Center view...
const Header = () => {
  return (
    <Image
      style={{ width: RFPercentage(6), height: RFPercentage(6) }}
      source={require("./assets/icon.png")}
    />
  );
};

const Stack = createStackNavigator();
const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: true,
            headerTitle: null,
            headerStyle: { elevation: 0 },
          }}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{
            headerShown: true,
            headerTitle: null,
            headerStyle: { elevation: 0 },
          }}
        />
        <Stack.Screen
          name="Main"
          options={{
            headerTitle: () => <Header />,
            headerLeft: null,
            headerTitleAlign: "center",
            headerLeftContainerStyle: { margin: 10 },
            headerStyle: { elevation: 0 },
          }}
          component={Tab}
        />
        <Stack.Screen
          name="Chat"
          options={{ headerStyle: { elevation: 0 } }}
          component={Chat}
        />
        <Stack.Screen
          name="Chat History"
          options={{ headerStyle: { elevation: 0 } }}
          component={ChatHistory}
        />
        <Stack.Screen
          name="Event Info"
          options={{ headerStyle: { elevation: 0 } }}
          component={Ievent}
        />
        <Stack.Screen
          name="Event Form"
          options={{ headerStyle: { elevation: 0 } }}
          component={Eform}
        />
        <Stack.Screen
          name="Tutor Info"
          options={{ headerStyle: { elevation: 0 } }}
          component={Itutor}
        />
        <Stack.Screen
          name="Product Form"
          options={{ headerStyle: { elevation: 0 } }}
          component={Pform}
        />
        <Stack.Screen
          name="Product Info"
          options={{ headerStyle: { elevation: 0 } }}
          component={Iproduct}
        />
        <Stack.Screen
          name="Product Edit"
          options={{ headerStyle: { elevation: 0 } }}
          component={ProductEdit}
        />
        <Stack.Screen
          name="Event"
          options={{ headerStyle: { elevation: 0 } }}
          component={Sevent}
        />
        <Stack.Screen
          name="Edit Event"
          options={{ headerStyle: { elevation: 0 } }}
          component={EditEvent}
        />
        <Stack.Screen
          name="Product"
          options={{ headerStyle: { elevation: 0 } }}
          component={Sproduct}
        />
        <Stack.Screen
          name="Ctutor"
          options={{ headerTitle: null, headerStyle: { elevation: 0 } }}
          component={Tform}
        />
        <Stack.Screen
          name="EditTutor"
          options={{ headerTitle: null, headerStyle: { elevation: 0 } }}
          component={TutorEdit}
        />
        <Stack.Screen
          name="Tutor"
          options={{ headerStyle: { elevation: 0 } }}
          component={Stutor}
        />
        <Stack.Screen
          name="Change"
          options={{
            headerTitle: "Change Password",
            headerStyle: { elevation: 0 },
          }}
          component={Change}
        />
        <Stack.Screen
          name="Invite"
          options={{ headerTitle: "Invite", headerStyle: { elevation: 0 } }}
          component={Invite}
        />
        <Stack.Screen
          name="Ratings P"
          component={RatingPage}
          options={{ headerTitle: "Ratings and Reviews" }}
        />
        <Stack.Screen
          name="Post Rating"
          component={PostRating}
          options={{ headerTitle: "Rate Product" }}
        />
        <Stack.Screen
          name="EditRatingP"
          component={EditRatingP}
          options={{ headerTitle: "Edit Review" }}
        />
        <Stack.Screen
          name="Ratings T"
          component={RatingPageT}
          options={{ headerTitle: "Ratings and Reviews" }}
        />
        <Stack.Screen name="Rate Tutor" component={PostTRating} />
        <Stack.Screen
          name="EditRatingT"
          component={EditRatingT}
          options={{ headerTitle: "Edit Review" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
