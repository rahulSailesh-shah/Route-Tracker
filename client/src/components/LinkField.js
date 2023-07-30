import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../utils/colors";

const LinkField = ({ onPress, infoText, linkText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>{infoText} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LinkField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  infoText: {
    fontFamily: "Avenir-Medium",
    color: colors.darkGrey,
    fontSize: 16,
  },
  link: {
    fontFamily: "Avenir-Medium",
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
});
