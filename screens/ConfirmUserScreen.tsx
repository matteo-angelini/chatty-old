import React, { useState } from "react";
import { View, Text } from "react-native";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

import { Feather } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ConfirmUserScreen = () => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const navigator = useNavigation();

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, code);
      navigator.navigate("Login");
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 25, justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "700",
            color: "#333",
            marginBottom: 40,
            paddingTop: 30,
            textAlign: "center",
          }}
        >
          Confirm Account
        </Text>

        <InputField
          label={"Username"}
          autoCapitalize="none"
          icon={
            <Feather
              name="user"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          textChangedFunction={setUsername}
        />
        <InputField
          label={"Insert code sent by email"}
          autoCapitalize="none"
          icon={
            <Feather
              name="user"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          textChangedFunction={setCode}
        />

        <View style={{ paddingTop: 30 }} />
        <CustomButton label={"Login"} onPress={confirmSignUp} />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmUserScreen;
