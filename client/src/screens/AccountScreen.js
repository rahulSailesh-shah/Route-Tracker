import { StyleSheet, Text, ScrollView, Pressable } from "react-native";
import React, { useContext } from "react";
import Header from "../components/Header";
import colors from "../utils/colors";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <ScrollView style={styles.container}>
      <Header title="Account" alignment="flex-start" />
      <Pressable onPress={() => signout()}>
        <Text style={styles.logout}>LogOut</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  logout: {
    fontFamily: "Avenir-Medium",
    fontSize: 18,
  },
});
