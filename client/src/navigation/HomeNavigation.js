import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import TrackCreateScreen from "../screens/TrackCreateScreen";
import AccountScreen from "../screens/AccountScreen";
import TrackNavigation from "./TrackNavigation";
import colors from "../utils/colors";

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 80,
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          paddingTop: 16,
          borderRadius: 32,
        },
      }}
    >
      <Tab.Screen
        name="track"
        component={TrackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-list-circle-sharp"
              size={36}
              color={focused ? colors.white : colors.primaryLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name="track-create"
        component={TrackCreateScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-add-circle"
              size={36}
              color={focused ? colors.white : colors.primaryLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-settings"
              size={34}
              color={focused ? colors.white : colors.primaryLight}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
