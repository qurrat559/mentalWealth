import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import FlashMessage, { showMessage } from "react-native-flash-message";
import COLORS from "../constants/colors";
import Button from "../components/Button";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [userType, setUserType] = useState("individual");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cnicNumber, setCnicNumber] = useState("");
  const [petName, setPetName] = useState("");
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const handleSignUp = () => {
    axios
      .post("http://192.168.81.53:3002/signup", {
        name: name,
        phoneNumber: phoneNumber,
        password: password,
        cnicNumber: cnicNumber,
        petName: petName,
        userType: userType,
      })
      .then((response) => {
        // Handle success response
        showMessage({
          message: "User created successfully",
          type: "success",
        });
        navigation.navigate("Login");
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        showMessage({
          message: "Error creating user",
          type: "danger",
        });
      });

    if (!name || !phoneNumber || !password || !cnicNumber || !petName) {
      showMessage({
        message: "Please fill in all fields.",
        type: "danger",
      });
      return;
    }

    if (!isChecked) {
      showMessage({
        message: "Please agree to the terms and conditions.",
        type: "danger",
      });
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      showMessage({
        message: "Please enter a valid phone number (10 digits).",
        type: "danger",
      });
      return;
    }

    if (!isValidCNIC(cnicNumber)) {
      showMessage({
        message: "Please enter a valid CNIC number (13 digits).",
        type: "danger",
      });
      return;
    }

    if (password.length < 8) {
      showMessage({
        message: "Password must be at least 8 characters long.",
        type: "danger",
      });
      return;
    }
  };

  const showTermsAndConditions = () => {
    Alert.alert(
      "Terms and Conditions",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: true }
    );
  };

  const isValidCNIC = (cnicNumber) => {
    return /^\d{13}$/.test(cnicNumber);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const openDialog = () => {
    setIsDialogVisible(true);
  };

  const closeDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 5,
              color: COLORS.black,
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Connect with your consultant today!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            Name
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
              placeholder="Enter your Name"
              placeholderTextColor={COLORS.black}
              keyboardType="default"
              style={{
                width: "100%",
              }}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        {/* New CNIC number field */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            CNIC Number
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
              onChangeText={(num) => {
                setCnicNumber(num);
              }}
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
            Mobile Number
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+92"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
              }}
            />

            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "80%",
              }}
              value={phoneNumber}
              onChangeText={(phoneNum) => {
                setPhoneNumber(phoneNum);
              }}
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

        {/* Answer a secret question */}
        <TouchableOpacity onPress={openDialog}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginVertical: 8,
              textDecorationLine: "underline",
              color: COLORS.primary,
            }}
          >
            Answer a secret question
          </Text>
        </TouchableOpacity>

        {/* Dialog box for pet name */}
        <Modal
          visible={isDialogVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeDialog}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 40,
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                  padding: 10,
                }}
              >
                Enter Pet Name
              </Text>
              <TextInput
                placeholder="Enter your pet's name"
                placeholderTextColor={COLORS.grey}
                style={{
                  width: "100%",
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 10,
                  marginBottom: 20,
                }}
                value={petName}
                onChangeText={setPetName}
              />
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={closeDialog}
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingHorizontal: 55,
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

        <View
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

          <Pressable onPress={showTermsAndConditions}>
            <Text
              style={{ textDecorationLine: "underline", fontWeight: "bold" }}
            >
              I agree to the terms and conditions
            </Text>
          </Pressable>
        </View>

        <Button
          title="Sign Up"
          filled
          onPress={handleSignUp}
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
            marginVertical: 5,
          }}
        >
          <Text style={{ fontSize: 16, color: COLORS.black }}>
            Already have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>

        <FlashMessage position="bottom" />
      </View>
    </SafeAreaView>
  );
};

export default Signup;
