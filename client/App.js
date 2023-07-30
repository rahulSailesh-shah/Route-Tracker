import { NavigationContainer } from "@react-navigation/native";

import MainStack from "./src/navigation";
import { navigationRef } from "./src/utils/RootNavigation";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { TrackProvider } from "./src/context/TrackContext";

export default function App() {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <MainStack />
          </NavigationContainer>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}
