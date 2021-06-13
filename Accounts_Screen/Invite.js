import React from 'react';
import { ScrollView, StyleSheet, Text, Share } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Button, Icon } from 'react-native-elements'

const Social = async () => {
  try {
    const result = await Share.share({
      title: "UG Smart",
      message: `Hey there Legonite, click on the link below to downlod the UG-Smart app and take full advantage of our platform to Buy and Sell any Product to students and also find peer tutors on Campus to help you in your Academics.\n 
      https://expo.io/@adlai/Ugsmart`})
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export default function Invite() {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }} style={styles.container}>
      <Icon name='share-outline' size={RFPercentage(12)} type='ionicon' />
      <Text style={styles.text}>Let others know about Ugsmart and increase our Community Users.</Text>
      <Button onPress={() => Social()} title="Share" buttonStyle={{ marginTop: 20, padding: 20, backgroundColor: "#37A7E8" }} containerStyle={{ width: "100%" }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  text: {
    margin: 10,
    fontFamily: 'Noto',
    fontSize: RFPercentage(3),
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
