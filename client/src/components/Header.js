import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "react-native-elements";

const Header = ({ title, alignment }) => {
  return (
    <View style={[styles.container, { alignItems: alignment }]}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.black,
    fontFamily: "Avenir-Medium",
  },
});
