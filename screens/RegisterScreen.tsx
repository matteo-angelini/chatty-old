import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import RegistrationSVG from "../assets/images/register.svg";
import * as ImagePicker from "expo-image-picker";
import { Auth, Hub } from "aws-amplify";

import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [authUser, setAuthUser] = useState(undefined);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(image);
    }
  };

  const signUp = async () => {
    if (password === confirmPassword) {
      try {
        const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
            name: fullName,
          },
        });

        navigation.navigate("ConfirmUserScreen", {
          navigation,
          username: user.getUsername(),
        });
      } catch (error) {
        console.log("error signing up:", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flexGrow: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <RegistrationSVG
            height={180}
            width={180}
            style={{ transform: [{ rotate: "-5deg" }] }}
          />

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
            Register
          </Text>
          <InputField
            label={"Username"}
            autoCapitalize={"none"}
            icon={
              <Feather
                name="user"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            textChangedFunction={setUsername}
            inputType="email"
          />
          {/* <InputField
            label={"Email"}
            autoCapitalize={"none"}
            icon={
              <Feather
                name="at-sign"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            textChangedFunction={setEmail}
            inputType="email"
          /> */}
          <InputField
            label={"Full Name"}
            autoCapitalize={"none"}
            icon={
              <Feather
                name="book"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            textChangedFunction={setFullName}
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
            textChangedFunction={setPassword}
          />
          <InputField
            label={"Confirm password"}
            icon={
              <Feather
                name="lock"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            inputType="password"
            textChangedFunction={setConfirmPassword}
          />
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 30,
            }}
          >
            <Feather
              name="image"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
            <TouchableOpacity onPress={pickImage}>
              <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
                Pick Profile Photo
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton label={"Register"} onPress={signUp} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <Text>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "#703DFE", fontWeight: "700" }}>
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
