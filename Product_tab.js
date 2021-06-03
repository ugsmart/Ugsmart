import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Hproduct from "./Home_Screens/Home_product";
import { Icon } from "react-native-elements";
import MyProducts from "./Home_Screens/MyProducts";

const Exic = ({ color, ic }) => {
  return <Icon color={color} type="ionicon" name={ic} />;
};

export default function Ptabs() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator tabBarOptions={{ showIcon: true }}>
      <Tab.Screen
        name="Products"
        component={Hproduct}
        options={{ tabBarIcon: ({ color }) => <Exic ic="cart-outline" /> }}
      />
      <Tab.Screen
        name="My Products"
        component={MyProducts}
        options={{ tabBarIcon: ({ color }) => <Exic ic="cash-outline" /> }}
      />
    </Tab.Navigator>
  );
}
