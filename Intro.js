import React from 'react'
import { Image, StyleSheet, View,Text } from 'react-native';
import Introslider from "react-native-app-intro-slider";
import { Icon } from "react-native-elements";
import { RFPercentage } from 'react-native-responsive-fontsize';

const data = [
    {id:"1",title:'Buy and Sell',word:"Take full advantage of our Platform to buy and Sell anything.",image:require('./assets/1.png')},
    {id:"2",title:"Advertise",word:"Let every Individual on Campus know about your Events.",image:require('./assets/2.png')},
    {id:"3",title:"Tutor Finder",word:"No need going through the stress of finding a Peer tutor.",image:require('./assets/3.png')},
]

const introview = ({item})=>{
    return(
     <View style={style.container}>
        <Image style={{width:"100%",height:"50%"}} resizeMode="center" source={item.image}/>
        <Text style={{fontSize:RFPercentage(6),fontFamily:"Titan"}}>{item.title}</Text>
        <Text style={{textAlign:"center",fontFamily:"Noto",fontSize:RFPercentage(2.6)}}>{item.word}</Text>
      </View>  
    )
}

const Next = ()=>{
    return(
        <View style={style.buttonCircle}>
         <Icon color="white" size={30} name="arrow-forward"/>
        </View>
    )
}

const Done = ()=>{
    return(
        <View style={style.buttonCircle}>
         <Icon color="white" size={30} name="done"/>
        </View>
    )
}


export default function Intro({navigation}){
    const Done_function = ()=>{
        navigation.navigate('Login')
    }
    return(
        <Introslider onDone={()=>{Done_function()}} renderDoneButton={Done} renderNextButton={Next} activeDotStyle={{backgroundColor:"#37A7E8"}} dotStyle={{backgroundColor:"grey"}} data={data} renderItem={introview}/>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white"
    },
    buttonCircle: {
        width: 50,
        height: 50,
        backgroundColor: '#37A7E8',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
})