import React from  'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Hproduct from './Home_Screens/Home_product'
import Pform from './Forms_Screens/Product_form'
import { Icon } from 'react-native-elements'

const Exic = ({color,ic})=>{
  return(
    <Icon color={color} type='ionicon' name={ic}/>
  )
}

export default function Ptabs() {
  const Tab = createMaterialTopTabNavigator()
  return (
    <Tab.Navigator tabBarOptions={{showIcon:true}}>
     <Tab.Screen name="Products" component={Hproduct} options={{tabBarIcon:({color})=><Exic ic='cart-outline'/>}}/>
     <Tab.Screen name="Sell Product" component={Pform} options={{tabBarIcon:({color})=><Exic ic='cash-outline'/>}}/>
    </Tab.Navigator>
  );
}
