import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";

import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

import { Feather } from "@expo/vector-icons";
import LoginSVG from "../assets/images/react.svg";
import { Auth } from "aws-amplify";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  const signIn = async () => {
    try {
      const user = await Auth.signIn(username, password);
      console.log("User sign in");
    } catch (error) {
      setErrorText(error);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 25, justifyContent: "flex-start" }}>
        <View style={{ alignItems: "center" }}>
          <LoginSVG
            height={250}
            width={250}
            style={{ transform: [{ rotate: "-5deg" }] }}
          />
        </View>

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
          Login
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
          label={"Password"}
          icon={
            <Feather
              name="lock"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
          textChangedFunction={setPassword}
        />

        <View style={{ paddingTop: 30 }} />
        <CustomButton label={"Login"} onPress={signIn} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#703DFE", fontWeight: "700" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          style={{ justifyContent: "center" }}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modals}>
            <Text
              style={{
                alignSelf: "center",
                width: 600,
                textAlign: "center",
              }}
            >
              {errorText}
            </Text>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modals: {
    margin: 50,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "center",
  },
});

export default LoginScreen;
