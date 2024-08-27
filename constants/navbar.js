import React from "react";
import { Text, View, StyleSheet, StatusBar, Pressable } from "react-native";
import { COLORS } from "./theme";

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, { color: COLORS.white }]}>MAIN</Text>

      <Pressable
        onPress={() => {
          console.log("INFO pressed");
          navigation.navigate("Info");
        }}
      >
        <Text style={styles.headerText}>INFO</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          console.log("SETTINGS pressed");
          navigation.navigate("Settings");
        }}
      >
        <Text style={styles.headerText}>SETTINGS</Text>
      </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerText: {
    minWidth: 100,
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Navbar;
