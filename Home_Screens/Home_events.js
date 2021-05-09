import React from 'react';
import { StyleSheet, View, ScrollView,Text,TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Icon } from 'react-native-elements'
import {RFPercentage} from 'react-native-responsive-fontsize'
import { Search } from '../Home_Screens/Home_tutor'


//Dummy Data used...will be removed after Api is Done....
const Data = [{id:'1',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'2',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'3',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'4',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'5',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'6',date:'28/04/2021',img:require('../assets/chu.png')}]
//End...

//View for Individual event used in Flatlist...
const Eview = ({date,img,nav})=>{
  return(
    <TouchableOpacity onPress={()=>{nav.navigate('Event Info')}} style={styles.tutorview}>
      <Avatar rounded={true} size={RFPercentage(20)} source={img}/>
      <Text style={{textAlign:'center',fontFamily:'Ranch',fontSize:RFPercentage(3.8),marginTop:10}}>Lighthouse Party</Text>
      <Text style={{textAlign:'center',fontSize:RFPercentage(2.8),fontFamily:'Ranch'}}>{date}</Text>
    </TouchableOpacity>
  )
}
//End...

//View for Event Home page Content...
const Viewz = ({name,nav})=>{
  return(
   <View style={styles.content}>
    <TouchableOpacity onPress={()=>{nav.navigate('Event')}} style={styles.touch}>
     <Text style={styles.title}>{name}</Text>
     <Icon name="chevron-forward" type='ionicon'/>
    </TouchableOpacity>
    <FlatList horizontal={true} data={Data} keyExtractor={item=>item.id} renderItem={({item})=><Eview nav={nav} date={item.date} img={item.img}/>}/>
   </View>
  )
}
//End...

//Data used for Categorizing Events in the List view
const Name = [{id:'1',name:'Arts & Culture'},
{id:'2',name:'Education'},
{id:'3',name:'Entertainment'},
{id:'4',name:'Religion'},
{id:'5',name:'Social & Lifestyle'},
{id:'6',name:'Sports'}]
//End...



export default function Hevent({navigation}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
     <View style={styles.container}>
      <View style={styles.searchview}>
       <Search place="Search Event..."/>
      </View>
       <FlatList data={Name} keyExtractor={item=>item.id} renderItem={({item})=> <Viewz nav={navigation} name={item.name}/>}/>
     </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    backgroundColor:"white"
  },
  searchview:{
    flex:0.1,
    alignItems:'center',
    justifyContent:'center',
    padding:8
  },
  content:{
    flex:4,
    padding:5,
    justifyContent:'center',
  },
  title:{
    fontFamily:'Titan',
    fontSize:RFPercentage(3.4),
    padding:5
  },
  Event:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
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
  },
  touch:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
})