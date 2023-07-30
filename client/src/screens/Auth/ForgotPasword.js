import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
import colors from "../../utils/colors";
import validate from "../../utils/validate";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LinkField from "../../components/LinkField";

const ForgotPasssword = ({ navigation }) => {
  const { state, forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const onFormSubmit = () => {
    const errors = validate({ email });
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      forgotPassword({ email });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Forgot your password?" alignment="center" />
      <Input
        placeholder="Enter your email"
        secureTextEntry={false}
        icon="at-sharp"
        value={email}
        label="Email"
        onChangeText={setEmail}
        errorText={error.email}
      />

      <Button title="Submit" onPress={onFormSubmit} />
      <LinkField
        onPress={() => navigation.navigate("signin")}
        infoText="Go back to"
        linkText="Login?"
      />
    </View>
  );
};

export default ForgotPasssword;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: colors.grey,
    flex: 1,
    paddingHorizontal: 15,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  forgotPassword: {
    fontFamily: "Avenir-Medium",
    color: colors.darkGrey,
    fontSize: 16,
  },
});
