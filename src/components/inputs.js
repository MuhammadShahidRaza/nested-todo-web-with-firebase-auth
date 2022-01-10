import React from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import { IsIOS } from "../utils/helpers";

const { scale } = Dimensions.get("screen");

export function Input({ containerStyle, inputStyle, ...inputProps }) {
  const container = { ...styles.container, ...containerStyle };
  const input = { ...styles.input, ...inputStyle };
  return (
    <View style={container}>
      <TextInput style={input} {...inputProps} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "center",
    borderRadius: 100,
    width: "100%",
    paddingHorizontal: 15,
    // paddingVertical:   10  ,
    paddingVertical: IsIOS() ? scale * 5 : scale,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  input: {
    color: "black",
  },
});
