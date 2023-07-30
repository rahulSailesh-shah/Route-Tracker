import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { navigate } from "../utils/RootNavigation";
import colors from "../utils/colors";

const TrackItem = ({ track }) => {
  const formatDate = (trackDate) => {
    const date = new Date(trackDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;
    return formattedDate;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate("track-detail", { id: track._id })}
    >
      <View>
        <Text style={styles.date}>{formatDate(track.createdAt)}</Text>
        <Text style={styles.title}>{track.name}</Text>
      </View>
      <Ionicons name="arrow-forward-circle" size={32} color={colors.white} />
    </TouchableOpacity>
  );
};

export default TrackItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: "Avenir-Medium",
    marginBottom: 3,
  },
  title: {
    fontSize: 20,
    fontFamily: "Avenir-Medium",
    color: colors.white,
  },
});
