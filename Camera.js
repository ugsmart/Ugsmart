import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { Icon } from "react-native-elements";

export default Cam = ({ setimage, visi, setvisi, done, setdone }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      faceDetectorSettings={{
        mode: FaceDetector.Constants.Mode.fast,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        runClassifications: FaceDetector.Constants.Classifications.none,
        minDetectionInterval: 100,
        tracking: true,
      }}
      ref={(ref) => {
        this.camera = ref;
      }}
      style={styles.camera}
      type={Camera.Constants.Type.front}
    >
      <TouchableOpacity
        onPress={() => {
          if (this.camera) {
            const photo = this.camera.takePictureAsync({ quality: 0.2 });
            photo.then((res) => {
              setimage(res.uri);
              setdone(true);
              setvisi(!visi);
            });
          }
        }}
        style={styles.touchable}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setvisi(!visi);
        }}
        style={styles.touch}
      >
        <Icon
          name="close-circle-outline"
          size={52}
          color="white"
          type="ionicon"
        />
      </TouchableOpacity>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    alignItems: "center",
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    padding: 5,
    backgroundColor: "black",
    width: 80,
    height: 80,
    borderRadius: 40,
    elevation: 10,
  },
  touch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    left: 20,
    padding: 5,
    borderRadius: 0,
    elevation: 10,
  },
});
