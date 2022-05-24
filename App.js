import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";

import Tasks from "./src/screens/tasks";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Tasks />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF6F5",
    flex: 1,
    paddingTop: Platform.OS === "android" ? 28 : 0,
  },
});
