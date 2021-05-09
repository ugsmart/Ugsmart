import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Login from "./Login"
import Signup from "./Signup"
import Intro from "./Intro"
import Chat from "./Chat"
import Tab from "./Tabs_view"
import Ievent from './Info_Screens/Event_info'
import Itutor from './Info_Screens/Tutor_info'
import Iproduct from './Info_Screens/Product_info'
import Sevent from './Home_Sub_Screens/Sub_event'
import Sproduct from './Home_Sub_Screens/Sub_product'
import Tform from './Forms_Screens/Tutor_form'
import Change from './Accounts_Screen/Changepass'
import Edit from './Accounts_Screen/Edit'
import Invite from './Accounts_Screen/Invite'
import { useFonts } from "expo-font"
import { Avatar } from 'react-native-elements'
import {Image} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'



export default function App(){
  const[loaded] = useFonts({
    Acolo: require("./fonts/Aclonica-Regular.ttf"),
    Ranch: require("./fonts/Rancho-Regular.ttf"),
    Titan: require("./fonts/TitanOne-Regular.ttf"),
    Noto: require("./fonts/NotoSansJP-Regular.otf")
  })
  
  
  if(!loaded){
    return null;
  }
  
  //icon={{name:'person-outline', type:'ionicon'}}
  //Header Right view...
  const Left = ()=>{
    return(
      <Avatar source={require('./assets/tutor.jpg')} rounded={true} size={RFPercentage(6.5)} overlayContainerStyle={{backgroundColor:'silver'}}/>
    )
  }
  
  //Header Center view...
  const Header = ()=>{
    return(
      <Image style={{width:RFPercentage(5.5),height:RFPercentage(5.5)}} source={require('./assets/img.png')}/>
    )
  }

  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" options={{headerTitle:null,headerStyle:{elevation:0}}} component={Intro}/>
        <Stack.Screen name="Login" options={{headerTitle:null,headerLeft:null,headerStyle:{elevation:0}}} component={Login}/>
        <Stack.Screen name="Signup" options={{headerTitle:null,headerStyle:{elevation:0}}} component={Signup}/>
        <Stack.Screen name="Chat" options={{headerStyle:{elevation:0}}} component={Chat}/>
        <Stack.Screen name="Main" options={{headerTitle:()=><Header/>,headerLeft:()=><Left/>,headerTitleAlign:'center',headerLeftContainerStyle:{margin:10},headerStyle:{elevation:0}}} component={Tab}/>
        <Stack.Screen name="Event Info" options={{headerStyle:{elevation:0}}} component={Ievent}/>
        <Stack.Screen name="Tutor Info" options={{headerStyle:{elevation:0}}} component={Itutor}/>
        <Stack.Screen name="Product Info" options={{headerStyle:{elevation:0}}} component={Iproduct}/>
        <Stack.Screen name="Event" options={{headerStyle:{elevation:0}}} component={Sevent}/>
        <Stack.Screen name="Product" options={{headerStyle:{elevation:0}}} component={Sproduct}/>
        <Stack.Screen name="Ctutor" options={{headerTitle:null,headerStyle:{elevation:0}}} component={Tform}/>
        <Stack.Screen name="Edit" options={{headerTitle:'Profile Edit',headerStyle:{elevation:0}}} component={Edit}/>
        <Stack.Screen name="Change" options={{headerTitle:'Change Password',headerStyle:{elevation:0}}} component={Change}/>
        <Stack.Screen name="Invite" options={{headerTitle:'Invite',headerStyle:{elevation:0}}} component={Invite}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
