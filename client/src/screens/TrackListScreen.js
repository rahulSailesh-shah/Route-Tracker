import { StyleSheet, View, Button, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";

import colors from "../utils/colors";
import Header from "../components/Header";
import TrackItem from "../components/TrackItem";
import TrackContext from "../context/TrackContext";
import { Context as AuthContext } from "../context/AuthContext";

const TrackListScreen = ({ navigation }) => {
  const { tracks, fetchTracks } = useContext(TrackContext);
  const { state } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      fetchTracks({ token: state.token });
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.tracks} showsVerticalScrollIndicator={false}>
        <Header title="Your Tracks." alignment="flex-start" />
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TrackListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
});
