import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";

const Input = ({
  placeholder,
  icon,
  secureTextEntry,
  value,
  onChangeText,
  label,
  errorText,
}) => {
  const [border, setBorder] = useState(colors.white);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor: border }]}>
        <Ionicons name={icon} size={22} color={colors.primary} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => setBorder(colors.primary)}
          onBlur={() => setBorder(colors.white)}
        />
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: colors.white,
    borderWidth: 1,
  },
  label: {
    fontFamily: "Avenir-Medium",
    color: colors.darkGrey,
    fontWeight: "700",
    fontSize: 15,
  },
  input: {
    flex: 1,
    marginLeft: 15,
    color: colors.black,
    paddingLeft: 5,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    borderColor: colors.grey,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    marginLeft: 15,
    marginTop: 5,
  },
});
