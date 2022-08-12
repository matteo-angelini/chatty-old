import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ChatRoomScreen from "../screens/ChatRoomScreen";
import HomeScreen from "../screens/HomeScreen";
import UsersScreen from "../screens/UsersScreen";
import { useNavigation } from "@react-navigation/native";
import GroupInfoScreen from "../screens/GroupInfoScreen";
import SettingsScreen from "../screens/Settings";
import ChatRoomHeader from "./ChatRoomHeader";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: HomeHeader }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          headerTitle: () => <ChatRoomHeader id={route.params?.id} />,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen name="GroupInfoScreen" component={GroupInfoScreen} />
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{ headerTitle: "Contacts" }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const HomeHeader = (props) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          // marginLeft: 50,
          fontWeight: "bold",
        }}
      >
        Chatty
      </Text>
      <Pressable onPress={() => navigation.navigate("Settings")}>
        <Feather
          name="settings"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>
      <Feather
        name="user-plus"
        size={24}
        color="black"
        style={{ marginHorizontal: 20 }}
        onPress={() => navigation.navigate("UsersScreen")}
      />
    </View>
  );
};

export default AppStack;
