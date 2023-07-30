import { createStackNavigator } from "@react-navigation/stack";

import ForgotPasssword from "../screens/Auth/ForgotPasword";
import ResetPasssword from "../screens/Auth/ResetPassword";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import VerifyOTP from "../screens/Auth/VerifyOTP";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="signin" component={SignInScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="verify-otp" component={VerifyOTP} />
      <Stack.Screen name="forgot-password" component={ForgotPasssword} />
      <Stack.Screen name="reset-password" component={ResetPasssword} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
