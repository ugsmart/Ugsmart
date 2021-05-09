import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Icon } from 'react-native-elements'
import {RFPercentage} from 'react-native-responsive-fontsize'


const Logout = ()=>{
  return(
    Alert.alert('Ugsmart','You are sure you want to Log out?',[{text:'Yes'},{text:'No'}])
  )
}

const Delete = ()=>{
  return(
    Alert.alert('Ugsmart','Deleting your account is an irreversible action.',[{text:'Delete'},{text:'Cancel'}])
  )
}

const Transition = ({nav,name})=>{
    nav.navigate(name)
}

const Data = [{id:'1',name:'Edit Profile',icon:'person-add-outline'},
{id:'2',name:'Change Password',icon:'shield-checkmark-outline'},
{id:'3',name:'Be a Peer Tutor',icon:'book-outline'},
{id:'4',name:'Invite',icon:'share-social-outline'},
{id:'5',name:'Log out',icon:'log-out-outline'},
{id:'6',name:'Delete Account',icon:'trash-bin-outline'}]

const Screens = (nam,nav)=>{
  if(nam == 'Delete Account'){
    Delete()
  }
  else if(nam == 'Log out'){
    Logout()
  }
  else if(nam == 'Invite'){
     nav.navigate('Invite')
  }
  else if(nam == 'Be a Peer Tutor'){
    nav.navigate('Ctutor')
  }
  else if(nam == 'Change Password'){
    nav.navigate('Change')
  }
  else if(nam == 'Edit Profile'){
    nav.navigate('Edit')
  }
}

const Aview = ({name,icon,nav})=>{
  return(
    <TouchableOpacity onPress={()=>{Screens(name,nav)}} style={styles.Touch}>
      <Icon name={icon} size={RFPercentage(5.5)} type='ionicon'/>
      <Text style={styles.Text}>{name}</Text>
    </TouchableOpacity>
  )
}
export default function Haccount({navigation}) {
  return (
    <View style={styles.container}>
     <FlatList shos data={Data} keyExtractor={item =>item.id} renderItem={({item})=> <Aview nav={navigation} icon={item.icon} name={item.name}/>}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:8
  },
  Touch:{
    flex:1,
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    marginTop:10
  },
  Text:{
    margin:10,
    fontFamily:'Noto',
    fontSize:RFPercentage(3),
  }
});
