import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
import colors from "../../utils/colors";
import validate from "../../utils/validate";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LinkField from "../../components/LinkField";
import ErrorMessage from "../../components/ErrorMessage";

const SignUpScreen = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const onFormSubmit = () => {
    const errors = validate({ email, password });
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      signin({ email, password });
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Login" alignment="center" />
      <Input
        placeholder="Enter your email"
        secureTextEntry={false}
        icon="at-sharp"
        value={email}
        label="Email"
        onChangeText={setEmail}
        errorText={error.email}
      />
      <Input
        placeholder="Enter your password"
        secureTextEntry={true}
        icon="md-lock-closed"
        value={password}
        label="Password"
        onChangeText={setPassword}
        errorText={error.password}
      />
      {state.errorMessage ? (
        <ErrorMessage message={state.errorMessage} />
      ) : null}
      <Button title="Login" onPress={onFormSubmit} />
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={() => navigation.navigate("forgot-password")}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <LinkField
        onPress={() => navigation.navigate("signup")}
        infoText="New here?"
        linkText="Signup"
      />
    </View>
  );
};

export default SignUpScreen;

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
