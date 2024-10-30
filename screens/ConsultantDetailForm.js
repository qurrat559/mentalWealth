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
import { Dropdown } from "react-native-element-dropdown";

const availableDays = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const availableTimings = [
  { label: "12:00 - 13:00", value: "12:00 - 13:00" },
  { label: "13:00 - 14:00", value: "13:00 - 14:00" },
  { label: "14:00 - 15:00", value: "14:00 - 15:00" },
  { label: "15:00 - 16:00", value: "15:00 - 16:00" },
  { label: "16:00 - 17:00", value: "16:00 - 17:00" },
];

const ConsultantDetailForm = ({ route, navigation }) => {
  const { userDetails = {} } = route.params || {};

  const [form, setForm] = useState({
    name: userDetails.name || "",
    specialization: "",
    availableDays: [],
    consultationFee: "",
    notes: "",
    clinicTiming: [],
    address: "",
  });

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.specialization ||
      !form.availableDays ||
      !form.clinicTiming ||
      !form.address ||
      !form.consultationFee
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.81.53:3002/consultant-detail",
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

          <Text style={styles.label}>Available Days</Text>
          <Dropdown
            style={styles.dropdown}
            data={availableDays}
            labelField="label"
            valueField="value"
            placeholder="Select available days"
            value={form.availableDays}
            onChange={(item) => handleInputChange("availableDays", item)}
            multiple={true}
            search
            searchPlaceholder="Search..."
          />

          <Text style={styles.label}>Timings</Text>
          <Dropdown
            style={styles.dropdown}
            data={availableTimings}
            labelField="label"
            valueField="value"
            placeholder="Select clinic timings"
            value={form.clinicTiming}
            onChange={(item) => handleInputChange("clinicTiming", item)}
            multiple={true}
            search
            searchPlaceholder="Search..."
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={form.address}
            onChangeText={(value) => handleInputChange("address", value)}
            placeholder="e.g., 1234 NW Bobcat Lanes"
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

  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
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
