import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize'
import {Button,Icon} from 'react-native-elements'

export default function Invite() {
  return (
    <ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center',flexGrow:1}} style={styles.container}>
      <Icon name='share-outline' size={RFPercentage(12)} type='ionicon'/>
      <Text style={styles.text}>Let others know about Ugsmart and increase our Community Users.</Text>
      <Button title="Share" buttonStyle={{marginTop:20,padding:20,backgroundColor:"#37A7E8"}} containerStyle={{width:"100%"}}/>
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
  }
});
