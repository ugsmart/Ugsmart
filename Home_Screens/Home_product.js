import React from 'react';
import { StyleSheet, View, ScrollView,Text,TouchableOpacity, FlatList } from 'react-native';
import { Avatar, Icon } from 'react-native-elements'
import {RFPercentage} from 'react-native-responsive-fontsize'
import { Search } from '../Home_Screens/Home_tutor'


//Dummy Data used in our List View.. Should be removed after API Integration...
const Data = [{id:'1',date:'28/04/2021',img:require('../assets/nike1.jpg')},
{id:'2',date:'28/04/2021',img:require('../assets/nike2.jpg')},
{id:'3',date:'28/04/2021',img:require('../assets/nike3.jpg')},
{id:'4',date:'28/04/2021',img:require('../assets/nike2.jpg')},
{id:'5',date:'28/04/2021',img:require('../assets/nike2.jpg')},
{id:'6',date:'28/04/2021',img:require('../assets/nike2.jpg')}]
//End...

//Individual View used for Product Display...
const Eview = ({date,img,nav})=>{
  return(
    <TouchableOpacity onPress={()=>{nav.navigate('Product Info')}} style={styles.tutorview}>
      <Avatar rounded={true} size={RFPercentage(20)} source={img}/>
      <Text style={{textAlign:'center',fontFamily:'Ranch',fontSize:RFPercentage(3.8),marginTop:10}}>Lighthouse Party</Text>
      <Text style={{textAlign:'center',fontSize:RFPercentage(2.8),fontFamily:'Ranch'}}>{date}</Text>
    </TouchableOpacity>
  )
}

//View used for our Category List in the Product Home View...
const Viewz = ({name,nav})=>{
  return(
   <View style={styles.content}>
    <TouchableOpacity onPress={()=>{nav.navigate('Product')}} style={styles.touch}>
     <Text style={styles.title}>{name}</Text>
     <Icon name="chevron-forward" type='ionicon'/>
    </TouchableOpacity>
    <FlatList horizontal={true} data={Data} keyExtractor={item=>item.id} renderItem={({item})=><Eview nav={nav} date={item.date} img={item.img}/>}/>
   </View>
  )
}
//End...

//Data used into Naming Categories for our Product Home page...
const Name = [{id:'1',name:'Beauty & Cosmetics'},
{id:'2',name:'Educational Items'},
{id:'3',name:'Electronics & Accessories'},
{id:'4',name:'Fashion'},
{id:'5',name:'Food & Drinks'},
{id:'6',name:'Sports & Accessories'}]
//End...

export default function Hproduct({navigation}){
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
     <View style={styles.container}>
      <View style={styles.searchview}>
       <Search place="Search Product..."/>
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