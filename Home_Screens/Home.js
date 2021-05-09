import React from 'react';
import { StyleSheet, View, ScrollView,Text,TouchableOpacity, FlatList, ImageBackground, } from 'react-native';
import { Avatar, Icon } from 'react-native-elements'
import {RFPercentage} from 'react-native-responsive-fontsize'
import Swiper from 'react-native-swiper'


//Dummy Data used in our List View.. Should be removed after API Integration...
const Data = [{id:'1',date:'28/04/2021',img:require('../assets/nike1.jpg')},
{id:'2',date:'28/04/2021',img:require('../assets/nike2.jpg')},
{id:'3',date:'28/04/2021',img:require('../assets/nike3.jpg')},
{id:'4',date:'28/04/2021',img:require('../assets/nike2.jpg')},
{id:'5',date:'28/04/2021',img:require('../assets/nike2.jpg')},
{id:'6',date:'28/04/2021',img:require('../assets/nike2.jpg')}]
//End...

//Individual View used for Product Display...
const Eview = ({nav})=>{
  return(
    <TouchableOpacity onPress={()=>{nav.navigate('Product Info')}} style={styles.tutorview}>
      <Avatar rounded={true} size={RFPercentage(20)} source={require('../assets/nike2.jpg')}/>
      <Text style={{textAlign:'center',fontFamily:'Ranch',fontSize:RFPercentage(3.8),marginTop:10}}>Lighthouse Party</Text>
      <Text style={{textAlign:'center',fontSize:RFPercentage(2.8),fontFamily:'Ranch'}}>23/05/21</Text>
    </TouchableOpacity>
  )
}

const Page = (name,nav)=>{
  if(name == 'Events'){
    nav.navigate('Events')
  }else if(name == 'Products'){
    nav.navigate('Products')
  }else if(name == 'Tutors'){
    nav.navigate('Tutors')
  }
}

//View used for our Category List in the Product Home View...
const Viewz = ({name,nav})=>{
  return(
   <View style={styles.content}>
    <TouchableOpacity onPress={()=>{Page(name,nav)}} style={styles.touch}>
     <Text style={styles.title}>{name}</Text>
     <Icon name="chevron-forward-circle-outline" type='ionicon'/>
    </TouchableOpacity>
    <FlatList horizontal={true} data={Data} keyExtractor={item=>item.id} renderItem={({item})=><Eview nav={nav}/>}/>
   </View>
  )
}
//End...

//Data used into Naming Categories for our Product Home page...
const Name = [{id:'1',name:'Events'},
{id:'2',name:'Products'},
{id:'3',name:'Tutors'}]
//End...

const Swiscreen = ({img,t1,t2})=>{
  return(
    <ImageBackground blurRadius={0.5} source={img} style={{flex:1,justifyContent:'flex-end',padding:8}}>
      <Text style={{color:'white',fontSize:RFPercentage(2.8),fontFamily:'Noto',fontWeight:'bold'}}>{t1}</Text>
      <Text style={{color:'white',fontFamily:'Noto',fontWeight:'bold'}}>{t2}</Text>
    </ImageBackground>
  )
}
/** */
export default function Home({navigation}){
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}}>
        <Swiper containerStyle={{height:RFPercentage(40)}} autoplay={true}>
          <Swiscreen t1='Ekow Yankah' t2='Ghc 20.00/per session' img={require('../assets/tutor.jpg')}/>
          <Swiscreen t1='Lighthoue Party' t2='23/04/21' img={require('../assets/chu.png')}/>
          <Swiscreen t1='The Harp' t2='14/04/21' img={require('../assets/harp.jpeg')}/>
        </Swiper>
      <FlatList data={Name} keyExtractor={item=>item.id} renderItem={({item})=> <Viewz nav={navigation} name={item.name}/>}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  searchview:{
    height:RFPercentage(40),
    backgroundColor:'red'
  },
  content:{
    flex:4,
    padding:5,
    justifyContent:'center',
    marginTop:10
  },
  title:{
    fontFamily:'Titan',
    fontSize:RFPercentage(4.2),
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