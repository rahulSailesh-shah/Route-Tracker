import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../utils/colors";

const OTPInput = ({
  value: { pin1, pin2, pin3, pin4 },
  onChangeText,
  errorText,
}) => {
  const inp1 = useRef("");
  const inp2 = useRef("");
  const inp3 = useRef("");
  const inp4 = useRef("");

  const [border, setBorder] = useState({
    border1: colors.white,
    border2: colors.white,
    border3: colors.white,
    border4: colors.white,
  });

  const { border1, border2, border3, border4 } = border;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inp1}
          style={{ ...styles.input, borderColor: border1 }}
          autoCapitalize="none"
          keyboardType="number-pad"
          autoCorrect={false}
          maxLength={1}
          value={pin1}
          onChangeText={(text) => {
            if (pin1 === "") {
              inp2.current.focus();
            }
            onChangeText(text, "pin1");
          }}
          onFocus={() => setBorder({ ...border, border1: colors.primary })}
          onBlur={() => setBorder({ ...border, border1: colors.white })}
        />
        <TextInput
          ref={inp2}
          style={{ ...styles.input, borderColor: border2 }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => {
            if (pin2 === "") {
              inp3.current.focus();
            }
            onChangeText(text, "pin2");
          }}
          value={pin2}
          onFocus={() => setBorder({ ...border, border2: colors.primary })}
          onBlur={() => setBorder({ ...border, border2: colors.white })}
        />
        <TextInput
          ref={inp3}
          style={{ ...styles.input, borderColor: border3 }}
          autoCapitalize="none"
          keyboardType="number-pad"
          autoCorrect={false}
          maxLength={1}
          onChangeText={(text) => {
            if (pin3 === "") {
              inp4.current.focus();
            }
            onChangeText(text, "pin3");
          }}
          value={pin3}
          onFocus={() => setBorder({ ...border, border3: colors.primary })}
          onBlur={() => setBorder({ ...border, border3: colors.white })}
        />
        <TextInput
          ref={inp4}
          style={{ ...styles.input, borderColor: border4 }}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => onChangeText(text, "pin4")}
          value={pin4}
          onFocus={() => setBorder({ ...border, border4: colors.primary })}
          onBlur={() => setBorder({ ...border, border4: colors.white })}
        />
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  input: {
    color: colors.black,
    fontSize: 18,
    fontFamily: "Avenir-Medium",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1.2,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    marginLeft: 40,
    marginTop: 12,
  },
});
