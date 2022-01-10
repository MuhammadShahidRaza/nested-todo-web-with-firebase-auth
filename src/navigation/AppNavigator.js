import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HOME_ROUTE } from "./routes";
import Home from "../screen/Home";
const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME_ROUTE}
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
