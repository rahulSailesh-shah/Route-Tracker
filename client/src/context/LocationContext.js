import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "change_name":
      return { ...state, name: payload };
    case "add_current_location":
      return { ...state, currentLocation: payload };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "add_location":
      return {
        ...state,
        locations: [...state.locations, payload],
      };
    case "reset":
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const changeName = (dispatch) => (name) => {
  dispatch({ type: "change_name", payload: name });
};

const startRecording = (dispatch) => () => {
  console.log("START RECORDING");
  dispatch({ type: "start_recording" });
};

const stopRecording = (dispatch) => () => {
  console.log("STOP RECORDING");
  dispatch({ type: "stop_recording" });
};

const addLocation = (dispatch) => (location, recording) => {
  dispatch({ type: "add_current_location", payload: location });
  if (recording) {
    dispatch({ type: "add_location", payload: location });
  }
};

const reset = (dispatch) => () => {
  dispatch({ type: "reset" });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { recording: false, locations: [], currentLocation: null, name: "" }
);
