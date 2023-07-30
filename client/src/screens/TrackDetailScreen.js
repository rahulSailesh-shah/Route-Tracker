import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import MapView, { Polyline } from "react-native-maps";

import TrackContext from "../context/TrackContext";
import Header from "../components/Header";
import colors from "../utils/colors";

const TrackDetailScreen = ({ route }) => {
  const { tracks } = useContext(TrackContext);
  const track = tracks.filter((track) => track._id === route.params.id)[0];
  const initialCoords = track.locations[0].coords;

  const formatDate = (trackDate) => {
    const date = new Date(trackDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(date);
  };

  return (
    <ScrollView style={styles.container}>
      <Header title={track.name} alignment="flex-start" />
      <Text style={styles.date}>{formatDate(track.createdAt)}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
      <Text style={styles.distance}>
        Total Distance: {parseFloat(track.distance).toFixed(3)}km{" "}
      </Text>
    </ScrollView>
  );
};

export default TrackDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  date: {
    fontSize: 12,
    color: colors.black,
    fontFamily: "Avenir-Medium",
    marginTop: -20,
    marginBottom: 20,
  },
  map: {
    height: 450,
    borderRadius: 15,
    marginBottom: 30,
  },
  distance: {
    fontFamily: "Avenir-Medium",
    fontSize: 18,
  },
});
