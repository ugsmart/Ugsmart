import React,{useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { Button, Avatar } from 'react-native-elements'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as ImagePicker from 'expo-image-picker'

const Inputview = ({text}) =>{
  return(
    <View>
      <Text style={styles.Text}>{text}</Text>
      <TextInput multiline={true} style={styles.Input}/>
    </View>
  )
}

const Ipicker = ({fun})=>{
  return(
    <View style={{alignItems:'center'}}>
      <Text style={styles.Text}>Photo</Text>
      <Avatar onPress={()=>{fun()}} rounded={true} size='xlarge' overlayContainerStyle={{backgroundColor:'silver',}} icon={{name:'person-outline', type:'ionicon'}}/>
    </View>
  )
}

const Ipicker2 = ({img,fun})=>{
  return(
    <View style={{alignItems:'center'}}>
      <Text style={styles.Text}>Photo</Text>
      <Avatar onPress={()=>{fun()}} source={{uri:img}} rounded={true} size='xlarge' overlayContainerStyle={{backgroundColor:'silver',}}/>
    </View>
  )
}

export default function Tform() {
   //....Image Picker Codes....///
   const[image,setimage] = useState(null)
   const[done,setdone] = useState(false)
   const pickImage = async () => {
       let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         quality: 1,
       });
   
       console.log(result);
   
       if (!result.cancelled) {
         setimage(result.uri);
         setdone(true)
       }
   };
   //End...

   const Screens = ()=>{
     if(done){
       return(<Ipicker2 fun={pickImage} img={image}/>)
     }
     else{
       return(<Ipicker fun={pickImage}/>)
     }
   }


  return (
    <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.container}>
      <Text style={styles.Htext}>Tutor Form</Text>
      <View style={styles.Mview}>
       {Screens()}
       <Inputview text="Program of Study"/>
       <Inputview text="Description"/>
       <Inputview text="Price Details"/>
       <Button title="Done" onPress={()=>{navigation.navigate('Home')}} buttonStyle={{marginTop:20,padding:15,backgroundColor:"#37A7E8"}} containerStyle={{width:"100%"}}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  Mview:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    padding:10
  },
  Htext:{
    fontFamily:'Titan',
    fontSize:RFPercentage(5.5),
    marginBottom:10,
    alignSelf:'center'
  },
  Input:{
    padding:8,
    fontSize:18,
    borderWidth:0.5,
    borderRadius:5
  },
  Text:{
    fontWeight:'bold',
    marginBottom:2,
    marginTop:10
  },
  Opacv:{
    flex:1,
    borderWidth:0.5,
    alignItems:'center',
    padding:10,
    flexDirection:'row',
    borderRadius:5
  },
  Text1:{
    fontWeight:'bold',
    marginLeft:10
  },
  Iopc:{
    alignItems:'center',
    justifyContent:'center',
    borderWidth:0,
    borderRadius:5,
    height:150,
    flex:1,
    padding:0,
    backgroundColor:'#e3e3e3'
  }
});
