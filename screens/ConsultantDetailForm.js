import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const ConsultantDetailForm = ({ route, navigation }) => {
  const { userDetails = {} } = route.params || {};

  const [form, setForm] = useState({
    name: userDetails.name || "",
    specialization: "",
    availableDates: "",
    consultationFee: "",
    notes: "",
    clinicTiming: "",
    address: "",
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.specialization ||
      !form.availableDates ||
      !form.clinicTiming ||
      !form.address ||
      !form.consultationFee
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.42.207:3002/consultant-detail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Form data submitted successfully:", result);
        alert("Consultant details saved successfully!");
        navigation.navigate("ConsultantHome");
      } else {
        const errorData = await response.json();
        console.error("Failed to submit consultant details:", errorData);
        alert(`Failed to save consultant details: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting consultant details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleHomePress = () => {
    navigation.navigate("ConsultantHome", { userDetails });
  };

  const handleSettingsPress = () => {
    navigation.navigate("ConsultantSettings", { userDetails });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftBox}>
          <Text style={styles.leftText}>Consultant</Text>
        </View>
        <TouchableOpacity style={styles.rightIconContainer}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />

          <Text style={styles.label}>Specialization</Text>
          <TextInput
            style={styles.input}
            value={form.specialization}
            onChangeText={(value) => handleInputChange("specialization", value)}
            placeholder="e.g., General Consultant"
          />

          <Text style={styles.label}>Available Dates</Text>
          <TextInput
            style={styles.input}
            value={form.availableDates}
            onChangeText={(value) => handleInputChange("availableDates", value)}
            placeholder="e.g., 2024-09-01, 2024-09-05"
          />

          <Text style={styles.label}>Timings</Text>
          <TextInput
            style={styles.input}
            value={form.clinicTiming}
            onChangeText={(value) => handleInputChange("clinicTiming", value)}
            placeholder="e.g., 3:30 pm - 4:30 pm"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={form.Address}
            onChangeText={(value) => handleInputChange("address", value)}
            placeholder="e.g., Robert Robertson, 1234 NW Bobcat Lanes"
          />

          <Text style={styles.label}>Consultation Fee</Text>
          <TextInput
            style={styles.input}
            value={form.consultationFee}
            onChangeText={(value) =>
              handleInputChange("consultationFee", value)
            }
            placeholder="e.g., $100"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.notes}
            onChangeText={(value) => handleInputChange("notes", value)}
            multiline={true}
            numberOfLines={4}
            placeholder="Any additional information"
          />

          <Button
            title="Submit Details"
            onPress={handleSubmit}
            style={styles.Buttons}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom navigation bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleHomePress}
        >
          <Ionicons name="home-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConsultantDetailForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#007260",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 14,
    marginTop: 40,
  },
  leftBox: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  leftText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rightIconContainer: {
    padding: 5,
    borderRadius: 15,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 100, // Ensure the form is above the bottom bar
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  Buttons: {
    backgroundColor: "#007260",
    // padding: 15,
    // borderRadius: 10,
    // marginHorizontal: 90,
    // marginBottom: 20,
    // alignItems: "center",
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#007260",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 14,
  },
  bottomBarItem: {
    alignItems: "center",
  },
});
