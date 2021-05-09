import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize'

export default function Edit() {
  return (
    <View style={styles.container}>
      <Text>Open up Editt.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})