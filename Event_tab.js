import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Hevent from "./Home_Screens/Home_events";
import Eform from "./Forms_Screens/Event_form";
import { Icon } from "react-native-elements";
import MyEvents from "./Home_Screens/MyEvents";

const Exic = ({ color, ic }) => {
  return <Icon color={color} type="ionicon" name={ic} />;
};

export default function Etabs() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator tabBarOptions={{ showIcon: true }}>
      <Tab.Screen
        name="Events"
        component={Hevent}
        options={{ tabBarIcon: () => <Exic ic="newspaper-outline" /> }}
      />
      <Tab.Screen
        name="My Events"
        component={MyEvents}
        options={{ tabBarIcon: () => <Exic ic="megaphone-outline" /> }}
      />
    </Tab.Navigator>
  );
}
