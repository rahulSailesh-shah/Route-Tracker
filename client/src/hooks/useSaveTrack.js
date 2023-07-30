import React, { useContext } from "react";

import { Context as LocationContext } from "../context/LocationContext";
import TrackContext from "../context/TrackContext";
import { Context as AuthContext } from "../context/AuthContext";
import { navigate } from "../utils/RootNavigation";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const { reset } = useContext(LocationContext);
  const { state } = useContext(AuthContext);
  const {
    state: { locations, name },
  } = useContext(LocationContext);

  const saveTrack = () => {
    createTrack({ name, locations, token: state.token });
    reset();
    navigate("track-list");
  };

  return [saveTrack];
};
