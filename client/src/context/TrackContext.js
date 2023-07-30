import React, { useReducer } from "react";
import trackerApi from "../api/tracker";

const TrackContext = React.createContext();

const trackReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "fetch-tracks":
      return [...payload];
    default:
      return state;
  }
};

export const TrackProvider = ({ children }) => {
  const [tracks, dispatch] = useReducer(trackReducer, []);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const fetchTracks = async ({ token }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await trackerApi.get("/track", config);
      dispatch({ type: "fetch-tracks", payload: response.data.data });
    } catch (error) {
      console.log("Error", error.response.data);
    }
  };

  const createTrack = async ({ name, locations, token }) => {
    let distance = 0;
    for (let i = 0; i < locations.length - 1; i++) {
      const lat1 = locations[i].coords.latitude;
      const lon1 = locations[i].coords.latitude;
      const lat2 = locations[i + 1].coords.latitude;
      const lon2 = locations[i + 1].coords.latitude;

      distance = distance + getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      locations,
      name,
      distance,
    };
    try {
      await trackerApi.post("/track", data, config);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <TrackContext.Provider value={{ tracks, fetchTracks, createTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export default TrackContext;
