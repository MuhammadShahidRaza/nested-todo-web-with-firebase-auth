import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigator";
import Home from "./src/screen/Home";
export default function App() {
  return (
    <>
      <NavigationContainer>
         <MainNavigator />  
      </NavigationContainer>
    </>
  );
}
