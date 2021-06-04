import React from "react";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements"

//Dummy Data used in our List View.. Should be removed after API Integration...
const Pdata = [
  { id: "1", text: "Beauty & Cosmetics", image:require('../assets/Products/beauty.png') },
  { id: "2", text: "Educational Items", image:require('../assets/Products/edi.png') },
  { id: "3", text: "Electronics & Accessories", image:require('../assets/Products/elec.png') },
  { id: "4", text: "Fashion", image:require('../assets/Products/fashion.png') },
  { id: "5", text: "Food & Drinks", image:require('../assets/Products/food.png') },
  { id: "6", text: "Sports & Accessories", image:require('../assets/Products/sport.png')},
];

const Edata = [
  { id: "1", text: "Arts & Culture",image:require('../assets/Events/arts.png') },
  { id: "2", text: "Education", image:require('../assets/Events/educ.png') },
  { id: "3", text: "Entertainment", image:require('../assets/Events/entertain.png') },
  { id: "4", text: "Religion", image:require('../assets/Events/religion.png') },
  { id: "5", text: "Social & Lifestyle", image:require('../assets/Events/social.png') },
  { id: "6", text: "Sports", image:require('../assets/Events/sport.png') },
];

const Tdata = [
  { id: "1", text: "Basic & Applied Sciences", image:require('../assets/Colleges/science.png') },
  { id: "2", text: "Education", image:require('../assets/Colleges/education.png') },
  { id: "3", text: "Health Sciences", image:require('../assets/Colleges/medo.png') },
  { id: "4", text: "Humanities", image:require('../assets/Colleges/human.png') }
];
//End...


//Individual View used for Product Display...
const Individual_view = ({ text, image,nav, sub })=>{
  return(
    <Pressable onPress={()=>{
      nav.navigate(sub,{name:text})
    }}>
      <ImageBackground blurRadius={0.5} imageStyle={{ flex:1, borderRadius:15 }} source={image} style={styles.background}>
       <Text style={styles.text}>{text}</Text>
      </ImageBackground>
    </Pressable>
  )
}

const Category_view = ({nav, title, data,sub})=>{
  return(
    <View style={{ flex:1 }}>
      <TouchableOpacity onPress={()=>nav.navigate(title)} style={{ flexDirection:'row', padding:5 ,alignItems:'center', justifyContent:'space-between' }}>
        <Text style={styles.title}>{title}</Text>
        <Icon name="chevron-forward-circle-outline" type="ionicon" />
      </TouchableOpacity>  
      <FlatList
        horizontal={true}
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Individual_view text={item.text} nav={nav} image={item.image} sub={sub} />}
      />
    </View>
  )
}

export default function Home({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1,justifyContent:'center' }}
    >
      <Category_view nav={navigation} data={Pdata} title="Products" sub='Product'/>
      <Category_view nav={navigation} data={Edata} title="Events"sub='Event'/>
      <Category_view nav={navigation} data={Tdata} title="Tutors"sub='Tutor'/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontFamily: "Ranch",
    fontSize: RFPercentage(5.2),
    color:'white',
    position:'absolute',
    bottom:8,
    left:15
  },
  background: {
    alignItems:'center',
    justifyContent:'center',
    height:250,
    width:350,
    margin:5,
  },
  title:{
    fontFamily: "Titan",
    fontSize: RFPercentage(4),
  }
});
