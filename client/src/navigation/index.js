import { createStackNavigator } from "@react-navigation/stack";

import AuthNavigation from "./AuthNavigation";
import HomeNavigation from "./HomeNavigation";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="auth" component={AuthNavigation} />
      <Stack.Screen name="home" component={HomeNavigation} />
    </Stack.Navigator>
  );
};

export default MainStack;
