import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useCameraPermission, Camera, runAsync } from "react-native-vision-camera";
import { useCameraDevice } from "react-native-vision-camera";
import { useFrameProcessor } from "react-native-vision-camera";
import { useSharedValue } from "react-native-worklets-core";
import { Worklets } from "react-native-worklets-core";
import { VisionCameraProxy,Frame } from "react-native-vision-camera";
import {stream } from "./Plugin";


const SERVER_URL = "ws://10.7.237.84:5000";


export default function App() {

  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  // const {frames, setFrames} = useSharedValue();
  // const [socket, setSocket] = useSharedValue(null);
  // const [sending, setSending] = useState(false);



  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    console.log("Frame:", frame.pixelFormat);
  
    //use socketSend here
    // console.log(xyz(frame));
  
  });

  // useEffect(() => {
  //   // Establish WebSocket connection
  //   const newSocket = io(SERVER_URL);
  //   setSocket(newSocket);

  //   return () => {
  //     // Close WebSocket connection when component unmounts
  //     newSocket.close();
  //   };
  // }, []);




  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No permission</Text>
        <Button onPress={requestPermission} title="Request permission" />
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
// useEffect(()=>{setFramesBuffer([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])},[])
  return (
    <View style={styles.container}>
      <Camera
        isActive={true}
        device={device}
        style={StyleSheet.absoluteFill}
        pixelFormat="rgb"
        frameProcessor={frameProcessor}
      />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
