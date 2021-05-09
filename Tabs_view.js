import React from  'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import Haccount from './Home_Screens/Home_account'
import Home from './Home_Screens/Home'
import Htutor from './Home_Screens/Home_tutor'
import Etabs from './Event_tab'
import Ptabs from './Product_tab'
import {useRoute} from '@react-navigation/native'


export default function Tabs() {
  const route = useRoute()
  console.log(route.name)
  
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator activeColor='green' shifting={true} barStyle={{backgroundColor:'white'}}>
     <Tab.Screen name="Home" component={Home} options={{tabBarIcon:'home'}}/>
     <Tab.Screen name="Products" component={Ptabs} options={{tabBarIcon:'store'}}/>
     <Tab.Screen name="Events" component={Etabs} options={{tabBarIcon:'calendar'}}/>
     <Tab.Screen name="Tutors" component={Htutor} options={{tabBarIcon:'school'}}/>
     <Tab.Screen name="Profile" component={Haccount} options={{tabBarIcon:'account-circle'}}/>   
    </Tab.Navigator>
  );
}
