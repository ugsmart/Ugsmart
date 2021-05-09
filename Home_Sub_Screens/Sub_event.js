import React from 'react';
import { StyleSheet, View, ScrollView,Text,TouchableOpacity, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements'
import {RFPercentage} from 'react-native-responsive-fontsize'
import { Search } from '../Home_Screens/Home_tutor'


const Data = [{id:'1',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'2',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'3',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'4',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'5',date:'28/04/2021',img:require('../assets/chu.png')},
{id:'6',date:'28/04/2021',img:require('../assets/chu.png')}]

const Eview = ({nav,date,img})=>{
  return(
    <TouchableOpacity onPress={()=>{nav.navigate('Event')}} style={styles.tutorview}>
      <Avatar rounded={true} size={RFPercentage(22)} source={img}/>
      <Text style={{textAlign:'center',fontFamily:'Ranch',fontSize:RFPercentage(3.8),marginTop:10}}>Lighthouse Party</Text>
      <Text style={{textAlign:'center',fontSize:RFPercentage(2.8),fontFamily:'Ranch'}}>{date}</Text>
    </TouchableOpacity>
  )
}

export default function Sevent({navigation}) {
  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
     <View style={styles.container}>
      <View style={styles.searchview}>
       <Search place="Search Event..."/>
      </View>
      <View style={styles.content}>
       <Text style={styles.title}>Events</Text>
       <FlatList numColumns={2} data={Data} keyExtractor={item=>item.id} renderItem={({item})=><Eview nav={navigation} date={item.date} img={item.img}/>}/>
      </View>
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
    justifyContent:'center'
  },
  title:{
    fontFamily:'Titan',
    marginBottom:10,
    fontSize:30
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
  }
})