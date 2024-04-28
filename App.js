import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";

import React from "react";
import { useCameraPermission, Camera } from "react-native-vision-camera";
import { useCameraDevice } from "react-native-vision-camera";
import { useFrameProcessor } from "react-native-vision-camera";

export default function App() {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    console.log(
      `Frame ${frame.pixelFormat}`
    );
  });

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

  return (
    <Camera isActive={true} device={device} style={StyleSheet.absoluteFill} pixelFormat="rgb" frameProcessor={frameProcessor} />
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
