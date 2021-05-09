import React from 'react';
import { StyleSheet, View, ScrollView, Image,Text } from 'react-native';
import { Icon } from 'react-native-elements'
import {RFPercentage} from 'react-native-responsive-fontsize'


const Des_view = ()=>{
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
      <View style={styles.container}>
        <Image source={require("../assets/img.png")}/>
      </View>
      <View style={styles.content}>
        <View style={styles.tview}>
         <Text style={styles.title}>About</Text>
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <Icon name='heart-outline' style={{marginRight:10}} size={RFPercentage(4.5)} type='ionicon'/>
           <Icon name='share-social-outline' size={RFPercentage(4)} type='ionicon'/>
         </View> 
        </View>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, unum alterum tincidunt vel an, oportere dissentiet eam ut. Unum putent legimus vim ex, in odio omnium verear per, te duo sapientem salutatus reprehendunt. Omittam fabellas dissentias ei nam, voluptua officiis conceptam no duo. Alterum detraxit hendrerit vix ex.</Text>
      </View>   
    </ScrollView>
  );
}

//Ievent = Information event 
export default function Ievent() {
  return (
    <Des_view/>
  );
}

const styles = StyleSheet.create({
  title:{
      fontSize:RFPercentage(4.2),
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
      fontSize:RFPercentage(2.4),
      fontFamily:'Noto'
  },
  content:{
      flex:1,
      padding:8,
      backgroundColor:"white"
  },
  container:{
      flex:1,
      justifyContent:"center",
      alignItems:'center',
      backgroundColor:"white"
  }
})