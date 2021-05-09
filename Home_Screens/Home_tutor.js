import React from 'react';
import { StyleSheet,ScrollView,View,Text,TextInput,FlatList,TouchableOpacity } from 'react-native';
import { Icon,Avatar } from 'react-native-elements'
import {RFPercentage} from 'react-native-responsive-fontsize'

//Search Box Component used in the other Home views...
export const Search = ({place})=>{
  return(
    <View style={{backgroundColor:"#eee",width:"100%",borderRadius:5,flexDirection:"row"}}>
      <View style={{flex:0.5,padding:5,alignItems:"center",justifyContent:"center"}}>
       <Icon size={25} name='search-outline' type="ionicon"/>
      </View>
      <View style={{flex:4.2,padding:5,justifyContent:"center"}}>
       <TextInput style={{fontSize:RFPercentage(2.8),padding:5}} placeholder={place}/>
      </View>
    </View>
  )
}
//End...

//Dummy Data used for our Tutor View...Should be removed afterApi Integrtion...
const Data= [{id:'1',name:'Ekow Nyankah',course:'Bsc. Computer Science'},
{id:'2',name:'David Adlai Nettey',course:'Bsc. Computer Science'},
{id:'3',name:'Cedric Ahenkorah',course:'Bsc.Computer Science'},
{id:'4',name:'Lynda Nettey',course:'Bsc.Earth Science'},
{id:'5',name:'Ama Nyankah',course:'Bsc.Information Tehnology'},
{id:'6',name:'Kofi Nyankah',course:'Bsc.Business Administration'},]
//End...

//Tutor Profile View....
const Tutor = ({nam,cor,nav})=>{
  return(
    <TouchableOpacity onPress={()=>{nav.navigate('Tutor Info')}} style={styles.tutorview}>
      <Avatar size={RFPercentage(20)} rounded={true} source={require('../assets/tutor.jpg')}/>
      <Text style={{textAlign:'center',fontFamily:'Ranch',fontSize:RFPercentage(3.8),marginTop:10}}>{nam}</Text>
      <Text style={{textAlign:'center',fontSize:RFPercentage(2.8),fontFamily:'Ranch'}}>{cor}</Text>
    </TouchableOpacity>
)
}
//End..

export default function Htutor({navigation}) {
return (
<ScrollView contentContainerStyle={{flexGrow:1}}>
  <View style={styles.container}>
    <View style={styles.searchview}>
    <Search place="Search Tutor..."/>
  </View>
    <View style={styles.content}>
      <FlatList numColumns={2} data={Data} keyExtractor={item=>item.id} renderItem={({item})=><Tutor nav={navigation} cor={item.course} nam={item.name}/>}/>
    </View>
  </View>
</ScrollView>
);
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:"center",
      backgroundColor:"white",
  },
  searchview:{
    flex:0.1,
    alignItems:'center',
    justifyContent:'center',
    padding:8
  },
  content:{
    flex:4,
    justifyContent:'center',
    padding:8
  },
  tutorview:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    margin:5,
    elevation:5
  }
})
