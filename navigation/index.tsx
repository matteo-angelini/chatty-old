/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect, createContext } from "react";
import {
  ColorSchemeName,
  View,
  Text,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

import { Auth, Hub } from "aws-amplify";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

export const UserContext = createContext(null);

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser);
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      console.log(data.payload.event);

      if (data.payload.event === "signIn" || data.payload.event === "signOut")
        checkUser();
    };

    Hub.listen("auth", listener);

    return () => Hub.remove("auth", listener);
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      {!user ? (
        <AuthStack />
      ) : (
        <UserContext.Provider value={user}>
          <AppStack />
        </UserContext.Provider>
      )}
    </>
  );
}
