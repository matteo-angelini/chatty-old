import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Image, useWindowDimensions } from "react-native";
import { Feather } from "@expo/vector-icons";

import ChatRoomScreen from "../screens/ChatRoomScreen";
import HomeScreen from "../screens/HomeScreen";
import ContactsScreen from "../screens/ContactsScreen";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

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
        options={{
          headerTitle: ChatRoomHeader,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{ headerTitle: "Contacts" }}
      />
    </Stack.Navigator>
  );
};

const HomeHeader = (props) => {
  const { width } = useWindowDimensions();

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
      <Feather
        name="user-plus"
        size={24}
        color="black"
        style={{ marginHorizontal: 20 }}
        onPress={() => useNavigation().navigate("ContactsScreen")}
      />
      <Feather
        name="log-out"
        size={24}
        color="black"
        style={{ marginHorizontal: 20 }}
        onPress={signOut}
      />
    </View>
  );
};

const ChatRoomHeader = (props) => {
  const { width } = useWindowDimensions();
  console.log(props);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 25,
        marginLeft: 50,
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
      <Text style={{ flex: 1, alignItems: "center", fontWeight: "bold" }}>
        {props.children}
      </Text>
    </View>
  );
};

const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export default AppStack;
