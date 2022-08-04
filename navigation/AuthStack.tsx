import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ConfirmUserScreen from "../screens/ConfirmUserScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ConfirmUserScreen" component={ConfirmUserScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
