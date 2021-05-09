import React from 'react';
import { StyleSheet,ScrollView,View,Text,ImageBackground } from 'react-native';
import { Button,Icon,Avatar } from 'react-native-elements'
import {RFPercentage} from 'react-native-responsive-fontsize'

const Des_view = ({nav})=>{
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
      <View style={styles.container}>
        <ImageBackground  blurRadius={5} style={{flex:1,padding:20,alignItems:'center',justifyContent:'center'}} source={require('../assets/tutor.jpg')}>
         <Avatar rounded={true} size={300} source={require("../assets/tutor.jpg")}/>
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <View style={styles.tview}>
         <Text style={styles.title}>Cedric Ahenkorah</Text>
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <Icon name='heart-outline' style={{marginRight:10}} size={RFPercentage(4.5)} type='ionicon'/>
           <Icon name='share-social-outline' size={RFPercentage(4)} type='ionicon'/>
         </View> 
        </View>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, unum alterum tincidunt vel an, oportere dissentiet eam ut. Unum putent legimus vim ex, in odio omnium verear per, te duo sapientem salutatus reprehendunt. Omittam fabellas dissentias ei nam, voluptua officiis conceptam no duo. Alterum detraxit hendrerit vix ex.</Text>
        <Text style={styles.Ptext}>Price Details</Text>
        <Text>Ghc 30.00/lesson negotiable</Text>
        <Button onPress={()=>{nav.navigate('Chat')}} title="Chat Me" containerStyle={{marginTop:10}} buttonStyle={{padding:15,backgroundColor:'green'}}/>
      </View>   
    </ScrollView>
  );
}

export default function Itutor({navigation}) {
  return (
    <Des_view nav={navigation}/>
  );
}

const styles = StyleSheet.create({
  title:{
      fontSize:RFPercentage(3.5),
      fontFamily:'Titan'
  },
  tview:{
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row'
  },
  date:{
      marginTop:10,
      fontSize:16,
      fontWeight:"bold"
  },
  text:{
      fontSize:RFPercentage(2.2),
      fontFamily:'Noto'
  },
  Ptext:{
    fontWeight:'bold',
    fontSize:RFPercentage(2.6)
  },
  content:{
      flex:1,
      padding:8,
      backgroundColor:"white"
  },
  container:{
      flex:1,
      justifyContent:"center",
      backgroundColor:"white",
  }
})
