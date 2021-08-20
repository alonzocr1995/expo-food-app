import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonNav = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: "#B2B1B9",
        color: "#fff",
        alignItems: "center",
        padding: 10,
        margin: 15,
        borderRadius: 6,
        width: 100,
      }}
    >
      <Text style={{ color: "white", fontSize: 18 }}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export default ButtonNav;

const styles = StyleSheet.create({});
