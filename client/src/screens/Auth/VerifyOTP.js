import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import validate from "../../utils/validate";
import OTPInput from "../../components/OTPInput";
import colors from "../../utils/colors";
import LinkField from "../../components/LinkField";
import Header from "../../components/Header";

const VerifyOTP = ({ navigation }) => {
  const { state, verifyOtp } = useContext(AuthContext);
  const [fields, setFields] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });
  const [error, setError] = useState({});

  const onFormSubmit = () => {
    const otp = fields.pin1 + fields.pin2 + fields.pin3 + fields.pin4;
    const errors = validate({ otp });
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      setError({});
      verifyOtp({ otp });
    }
  };

  const handleTextChange = (value, field) => {
    setFields({ ...fields, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Header title="Verify OTP" alignment="center" />
      <OTPInput
        value={fields}
        onChangeText={(text, type) => handleTextChange(text, type)}
        errorText={error.otp}
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

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    backgroundColor: colors.grey,
    flex: 1,
    paddingHorizontal: 15,
  },
});
