import React,{useState} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Button, Icon } from "react-native-elements";
import { RFPercentage } from 'react-native-responsive-fontsize';



const Textview = ({text,num,jud,icon})=>{
  return(
    <View style={{backgroundColor:"#eee",width:"100%",padding:5,marginTop:num,borderRadius:5,flexDirection:"row"}}>
      <View style={{flex:0.5,padding:5,alignItems:"center",justifyContent:"center"}}>
       <Icon size={25} name={icon} type="ionicon"/>
      </View>
      <View style={{flex:4.2,padding:5,justifyContent:"center"}}>
       <TextInput style={{fontSize:RFPercentage(2.8),padding:5}} placeholder={text} secureTextEntry={jud}/>
      </View>
    </View>
  )
}


const Textview1 = ({num})=>{
    const[jud,setjud] = useState(true)
    const[eye,seteye] = useState("eye-off-outline")
    //Function that changes icon on press
    const check = ()=>{
        if(eye == "eye-off-outline"){seteye("eye-outline")}
        else{seteye("eye-off-outline")}
    }
    //End...
    return(
      <View style={{backgroundColor:"#eee",width:"100%",padding:5,marginTop:num,borderRadius:5,flexDirection:"row"}}>
        <View style={{flex:0.5,padding:5,alignItems:"center",justifyContent:"center"}}>
         <Icon size={25} name="lock-open-outline" type="ionicon"/>
        </View>
        <View style={{flex:4.2,padding:5,justifyContent:"center"}}>
         <TextInput style={{fontSize:RFPercentage(2.8),padding:5}} placeholder="Password" secureTextEntry={jud}/>
        </View>
        <View style={{flex:0.5,padding:5,alignItems:"center",justifyContent:"center"}}>
         <Icon size={22} name={eye} onPress={()=>{setjud(!jud);check()}} type="ionicon"/>
        </View>
      </View>
    )
}

export default function Login({navigation}){
    return(
      <ScrollView contentContainerStyle={{flexGrow:1}}>
       <View style={style.logview}>
         <Image style={style.img} resizeMode="center" source={require("./assets/img.png")}/>
         <Text style={{fontSize:RFPercentage(8.5),fontFamily:'Titan',alignSelf:'center'}}>Login</Text>
         <Textview text="Email" num={20} icon="mail-outline" jud={false}/>
         <Textview1 num={10} jud={true}/>
         <Button title="Login" onPress={()=>{navigation.navigate('Main')}} buttonStyle={{marginTop:20,padding:15,backgroundColor:"#37A7E8"}} containerStyle={{width:"100%"}}/>
         <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}} style={style.Opac}>
          <Text style={style.text}>Don't have an Account? Sign up now.</Text>
         </TouchableOpacity>
      </View>
      </ScrollView>
    )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#e3e3e3"
  },
  logview:{
    flex:1,
    backgroundColor:"white",
    justifyContent:"center",
    padding:10
  },
  img:{
    width:120,
    height:120,
    marginBottom:20,
    alignSelf:'center'
  },
  text:{
    fontFamily:'Noto',
    fontWeight:'bold',
    textAlign:'center',
    fontSize:RFPercentage(2.5),
    color:'grey'
  },
  Opac:{
    marginTop:10
  }
})