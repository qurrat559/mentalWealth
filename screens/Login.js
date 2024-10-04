import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import COLORS from "../constants/colors";
import axios from "axios";
import Button from "../components/Button";
import { Picker } from "@react-native-picker/picker";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [userType, setUserType] = useState("Individual");
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(
    false
  );
  const [cnicNumber, setCnicNumber] = useState("");
  const [password, setPassword] = useState("");
  const [petName, setPetName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleForgotPassword = () => {
    setForgotPasswordModalVisible(true);
  };
  const handleSubmitNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      showMessage({
        message: "Passwords do not match.",
        type: "danger",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.42.207:3002/forgot-password",
        {
          cnic: cnicNumber,
          petName: petName,
          newPassword: newPassword,
        }
      );

      if (response.data.message === "Password updated successfully") {
        showMessage({
          message: "Password updated successfully.",
          type: "success",
        });
        setForgotPasswordModalVisible(false);
        setPetName("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showMessage({
          message: response.data.message,
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      showMessage({
        message: "An error occurred. Please try again.",
        type: "danger",
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.17.207:3002/login", {
        cnic: cnicNumber,
        password: password,
        role: userType,
      });

      if (response.data.success) {
        const userDetails = response.data.userDetails;

        // Navigate to the home screen and pass user details
        if (userType === "individual") {
          navigation.navigate("IndividualHome", { userDetails });
        } else {
          navigation.navigate("ConsultantHome", { userDetails });
        }

        showMessage({
          message: "Login Successful",
          type: "success",
        });
      } else {
        showMessage({
          message: "Login failed. Please check your credentials.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data.message : error.message
      );
      showMessage({
        message: "An error occurred. Please try again.",
        type: "danger",
      });
    }
  };

  const isValidCNIC = (cnicNumber) => {
    return /^\d{13}$/.test(cnicNumber);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Hey Welcome Back!
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Hello again you have been missed!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            CNIC number
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your CNIC number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "100%",
              }}
              value={cnicNumber}
              onChangeText={setCnicNumber}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: "100%",
              }}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Choose your role
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <Picker
              selectedValue={userType}
              onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
              style={{ height: "100%", width: "100%" }}
            >
              <Picker.Item label="I am an Individual" value="individual" />
              <Picker.Item label="I am consultant" value="consultant" />
            </Picker>
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>Remember Me</Text>
        </View> */}

        <Button
          title="Login"
          filled
          onPress={handleLogin}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Signup
            </Text>
          </Pressable>
        </View>

        {/* Forgot Password */}
        <Pressable onPress={handleForgotPassword}>
          <Text
            style={{
              textDecorationLine: "underline",
              textAlign: "center",
              marginBottom: 10,
              color: COLORS.primary,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>

        {/* Forgot Password Modal */}
        <Modal
          visible={forgotPasswordModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setForgotPasswordModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}
              >
                Forgot Password
              </Text>
              <TextInput
                placeholder="Enter Pet Name"
                value={petName}
                onChangeText={setPetName}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.black,
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 30,
                }}
              />
              <TextInput
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.black,
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 30,
                }}
              />
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.black,
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 30,
                }}
              />
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={handleSubmitNewPassword}
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingHorizontal: 115,
                    paddingVertical: 15,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: COLORS.white, fontSize: 16 }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <FlashMessage position="bottom" />
      </View>
    </SafeAreaView>
  );
};

export default Login;
