import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar } from "react-native-elements";
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
import Edit from "./Accounts_Screen/Edit";
import Invite from "./Accounts_Screen/Invite";
import Verify from "./Verify";
import TutorEdit from "./Forms_Screens/Edit_Tutor_form";
import Splash from "./SplashScreen";
import Eform from "./Forms_Screens/Event_form";
import EditEvent from "./Forms_Screens/Edit_Event_Form";

//icon={{name:'person-outline', type:'ionicon'}}
//Header Right view...
const Left = () => {
  return (
    <Avatar
      source={require("./assets/tutor.jpg")}
      rounded={true}
      size={RFPercentage(6.5)}
      overlayContainerStyle={{ backgroundColor: "silver" }}
    />
  );
};

//Header Center view...
const Header = () => {
  return (
    <Image
      style={{ width: RFPercentage(7.5), height: RFPercentage(7.5) }}
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          options={{
            headerTitle: () => <Header />,
            headerLeft: () => <Left />,
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
          name="Product Info"
          options={{ headerStyle: { elevation: 0 } }}
          component={Iproduct}
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
          name="Edit"
          options={{
            headerTitle: "Profile Edit",
            headerStyle: { elevation: 0 },
          }}
          component={Edit}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
