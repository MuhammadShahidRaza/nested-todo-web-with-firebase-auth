import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { APP_ROUTE, AUTH_ROUTE } from "./routes";
import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOGGED_IN } from "../constant/strings";
const Stack = createStackNavigator();

function MainNavigator() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    async function IsLoggedIn() {
      AsyncStorage.getItem(USER_LOGGED_IN).then((res) => {
        if (res) {
          setLoggedIn(true);
        }
        // setIsLoading(false);
      });
    }
    IsLoggedIn();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AUTH_ROUTE}
    >
      {loggedIn ? (
        <>
          <Stack.Screen name={APP_ROUTE} component={AppNavigator} />
          {/* <Stack.Screen name={AUTH_ROUTE} component={AuthNavigator} /> */}
        </>
      ) : (
        <>
          <Stack.Screen name={AUTH_ROUTE} component={AuthNavigator} />
          <Stack.Screen name={APP_ROUTE} component={AppNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainNavigator;
