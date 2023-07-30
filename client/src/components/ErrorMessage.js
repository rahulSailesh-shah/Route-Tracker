import { StyleSheet, Text, View } from "react-native";
import React from "react";

import colors from "../utils/colors";

const ErrorMessage = ({ message }) => {
  return <Text style={styles.error}>{message}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    marginLeft: 15,
    marginTop: 5,
    textAlign: "center",
  },
});
