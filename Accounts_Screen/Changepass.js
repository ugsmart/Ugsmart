import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {RFPercentage} from 'react-native-responsive-fontsize'
import { Button, Icon } from 'react-native-elements'

const Textview = ()=>{
  return(
    <View style={{width:"100%",padding:5,borderRadius:5,marginTop:10}}>
      <View style={{padding:5,justifyContent:"center",borderBottomWidth:0.3}}>
       <TextInput style={{fontSize:RFPercentage(2.8),padding:5,textAlign:'center'}} placeholder='Should be 8 Characters long...'/>
      </View>
    </View>
  )
}
export default function Change() {
  return (
    <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center',alignItems:'center'}} style={styles.container}>
      <Icon name='shield-checkmark-outline' color='green' size={RFPercentage(15)} type='ionicon'/>
      <Text style={styles.text}>Enter your new Password in the space below.</Text>
      <Textview/>
      <Button title="Change Password" buttonStyle={{marginTop:20,padding:20,backgroundColor:"#37A7E8"}} containerStyle={{width:"100%"}}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10
  },
  text:{
    margin:10,
    fontFamily:'Noto',
    fontSize:RFPercentage(3),
    textAlign:'center',
    fontWeight:'bold'
  },
  box:{
    fontSize:18,
    borderBottomWidth:0.3,
    padding:12
  }
});
