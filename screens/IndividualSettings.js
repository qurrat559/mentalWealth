import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUserDetails } from "../UserStore";

const IndividualSettings = ({ navigation, route }) => {
  const userDetails = getUserDetails();
  const [modalVisible, setModalVisible] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHomePress = () => {
    navigation.navigate("IndividualHome");
  };

  const handleLogoutPress = () => {
    navigation.navigate("Login");
  };

  const handleUpdateEmergencyContact = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.81.53:3002/individual/update-emergency-contact",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userDetails?.id,
            emergency_contact: emergencyContact,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Emergency contact updated successfully!");
      } else {
        Alert.alert("Error", result.message || "Failed to update contact.");
      }
    } catch (error) {
      console.error("Error updating emergency contact:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftBox}>
          <Text style={styles.leftText}>Individual</Text>
        </View>
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={() => console.log("User icon pressed")}
        >
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionHeading}>Personal Information</Text>

        {userDetails ? (
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userDetail}>Name: {userDetails.name}</Text>
            <Text style={styles.userDetail}>CNIC: {userDetails.cnic}</Text>
            <Text style={styles.userDetail}>
              Phone: {userDetails.phoneNumber}
            </Text>
            <Text style={styles.userDetail}>Role: {userDetails.role}</Text>
          </View>
        ) : (
          <Text>No user details available</Text>
        )}

        <View style={{ flexDirection: "column", alignSelf: "center" }}>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.updateButtonText}>
              Update Emergency Contact
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleLogoutPress}
          >
            <Text style={styles.updateButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* <Button title="LOGOUT"  /> */}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Enter New Emergency Contact</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter contact number"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button
                title={loading ? "Updating..." : "Update"}
                onPress={handleUpdateEmergencyContact}
                disabled={loading || !emergencyContact}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleHomePress}
        >
          <Ionicons name="home-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    backgroundColor: "#007260",
    elevation: 4,
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
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userDetailsContainer: {
    marginBottom: 20,
  },
  userDetail: {
    fontSize: 18,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: "#007260",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#007260",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBarItem: {
    alignItems: "center",
  },
});

export default IndividualSettings;
