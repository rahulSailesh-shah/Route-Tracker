import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { useContext } from "react";
import Spacer from "./Spacer";
import { Ionicons } from "@expo/vector-icons";

import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";
import Input from "./Input";
import colors from "../utils/colors";

const TrackForm = () => {
  const {
    startRecording,
    stopRecording,
    changeName,
    state: { name, recording, locations },
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Text style={styles.label}>Track name</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="location" size={24} color={colors.primary} />
        <TextInput
          style={styles.input}
          placeholder="Enter track name"
          secureTextEntry={false}
          value={name}
          label="Track Name"
          onChangeText={changeName}
        />
      </View>
      {/* {errorText ? <Text style={styles.error}>{errorText}</Text> : null} */}

      {recording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      {!recording && locations.length !== 0 ? (
        <Button title="Save Recording" onPress={saveTrack} />
      ) : null}
    </>
  );
};

export default TrackForm;

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
    borderWidth: 1,
    borderColor: colors.primary,
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
  },
  error: {
    color: colors.error,
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    marginLeft: 15,
    marginTop: 5,
  },
});
