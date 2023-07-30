import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
  TouchableOpacity,
} from "react-native";
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
  const { state, signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const onFormSubmit = () => {
    const errors = validate({ name, email, password });
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      signup({ name, email, password });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Signup" alignment="center" />
      <Input
        placeholder="Enter your name"
        secureTextEntry={false}
        icon="person"
        value={name}
        label="Name"
        onChangeText={setName}
        errorText={error.name}
      />
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
      <Button title="Signup" onPress={onFormSubmit} />

      <LinkField
        onPress={() => navigation.navigate("signin")}
        infoText="Already a member?"
        linkText="Login"
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
});
