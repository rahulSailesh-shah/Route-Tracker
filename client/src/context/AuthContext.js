import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import trackerApi from "../api/tracker";
import { navigate } from "../utils/RootNavigation";

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "add_error":
      return { ...state, errorMessage: payload };
    case "signup":
    case "signin":
    case "password-change":
      return { ...state, errorMessage: "", token: payload, resetToken: null };
    case "reset-password ":
      return { ...state, errorMessage: "", token: null, resetToken: payload };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const signup =
  (dispatch) =>
  async ({ name, email, password }) => {
    try {
      const response = await trackerApi.post("/auth/register", {
        name,
        email,
        password,
      });
      // await AsyncStorage.setItem(token, response.data.token);
      dispatch({ type: "signup", payload: response.data.token });
      navigate("home");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: error.response.data.errorMessage,
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/auth/login", {
        email,
        password,
      });
      // await AsyncStorage.setItem(token, response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("home");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: error.response.data.message,
      });
    }
  };

const forgotPassword =
  (dispatch) =>
  async ({ email }) => {
    try {
      const response = await trackerApi.post("/auth/sendotp", { email });
      if (response.data.data) {
        navigate("verify-otp");
      }
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: error.response.data.message,
      });
    }
  };

const verifyOtp =
  (dispatch) =>
  async ({ otp }) => {
    try {
      const response = await trackerApi.post("/auth/verifyotp", { otp });
      dispatch({ type: "reset-password", payload: response.data.resetToken });
      navigate("reset-password");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: error.response.data.message,
      });
    }
  };

const resetPassword =
  (dispatch) =>
  async ({ resetToken, password }) => {
    console.log(resetToken, password);
    try {
      const response = await trackerApi.put("/auth/resetpassword", {
        resetToken,
        password,
      });
      dispatch({ type: "password-change", payload: response.data.token });
      navigate("home");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: error.response.data.message,
      });
    }
  };

const signout = (dispatch) => () => {
  dispatch({ type: "signout" });
  navigate("auth");
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, forgotPassword, verifyOtp, resetPassword, signout },
  {
    token: null,
    errorMessage: "",
    resetToken: null,
  }
);
