import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../utils/colors";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    fontFamily: "Avenir-Medium",
  },
});
