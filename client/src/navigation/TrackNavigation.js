import { createStackNavigator } from "@react-navigation/stack";

import TrackListScreen from "../screens/TrackListScreen";
import TrackDetailScreen from "../screens/TrackDetailScreen";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="track-list" component={TrackListScreen} />
      <Stack.Screen name="track-detail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
