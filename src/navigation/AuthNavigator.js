import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/Login";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "./routes";
import Register from "../screen/Register";
const Stack = createStackNavigator();
export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={LOGIN_ROUTE}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={REGISTER_ROUTE}
        component={Register}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
                name={FORGOT_PASSWORD_ROUTE}
                component={ForgotPassword}
                options={{ headerShown: false }}
            /> */}
    </Stack.Navigator>
  );
}
