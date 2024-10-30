import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUserDetails } from "../UserStore";

const ViewPatient = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const user = getUserDetails();

  const handleHomePress = () => {
    navigation.navigate("ConsultantHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("ConsultantSettings");
  };

  const fetchPatientData = async () => {
    try {
      const response = await fetch(
        "http://192.168.81.53:3002/consultant/get-patients",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Patients fetched successfully:", result);
        setPatients(result?.data);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch patients:", errorData);
        alert(`Failed to fetch patients: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Patient List</Text>
      </View>

      <ScrollView style={styles.patientList}>
        {patients.map((patient) => (
          <View key={patient.appointment_id} style={styles.patientItem}>
            <Text style={styles.patientName}>{patient.individual_name}</Text>
            <Text style={styles.patientDetails}>
              <Text style={styles.label}>CNIC: </Text>
              {patient.individual_cnic}
            </Text>
            <Text style={styles.patientDetails}>
              <Text style={styles.label}>Appointment Time: </Text>
              {patient.appointment_timing}
            </Text>
            <Text style={styles.patientDetails}>
              <Text style={styles.label}>Appointment Day: </Text>
              {patient.appointment_day}
            </Text>
            <Text style={styles.patientDetails}>
              <Text style={styles.label}>Consultant: </Text>
              {patient.consultant_name} ({patient.consultant_specialization})
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleHomePress}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingVertical: 20,
    backgroundColor: "#007260",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
  },
  patientList: {
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  patientItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  patientName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  patientDetails: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
    color: "#444",
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
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    elevation: 10,
  },
  bottomBarItem: {
    alignItems: "center",
  },
});

export default ViewPatient;
