import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import React, { useContext, useCallback, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import useLocation from "../hooks/useLocation";

// import "../_mockLocation";
import { Context as LocationContext } from "../context/LocationContext";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import Header from "../components/Header";
import colors from "../utils/colors";

const TrackCreateScreen = () => {
  const { state, addLocation } = useContext(LocationContext);
  const isFocused = useIsFocused();

  const callback = useCallback(
    (location) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );

  const [err] = useLocation(isFocused || state.recording, callback);

  return (
    <ScrollView style={styles.container}>
      <Header title="Record your Track." alignment="flex-start" />
      <Map />
      {err !== "" ? <Text>Please Enable location services</Text> : null}
      <TrackForm />
      <View style={{ marginBottom: 400 }} />
    </ScrollView>
  );
};

export default TrackCreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
});
