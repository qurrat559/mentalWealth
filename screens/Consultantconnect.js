import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Consultantconnect = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleHomePress = () => {
    navigation.navigate("IndividualHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("IndividualSettings");
  };

  const consultants = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiology",
      clinicAddress: "123 Heartbeat St.",
      timings: "9 AM - 5 PM",
      availableDays: "Monday - Friday",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Neurology",
      clinicAddress: "456 Brainwave Ave.",
      timings: "10 AM - 6 PM",
      availableDays: "Tuesday, Thursday, Saturday",
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "Pediatrics",
      clinicAddress: "789 Childcare Blvd.",
      timings: "8 AM - 3 PM",
      availableDays: "Monday, Wednesday, Friday",
    },
    // Add more dummy consultants as needed
  ];

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

      <View style={styles.emergencyContainer}>
        <View style={styles.illustrationContainer}>
          <Image
            source={require("../assets/consultantConnects.jpg")}
            style={styles.emergencyIllustration}
          />
        </View>

        <View style={styles.emergencyTextContainer}>
          <Text style={styles.emergencyHeaderText}>
            Connect With Your Desired Consultant
          </Text>
          <Text style={styles.emergencySubText}>
            Explore a world of consultancy expertise with Consultant Connection.
            Our platform offers seamless access to skilled consultants across
            diverse fields, ready to provide tailored advice and solutions. From
            business strategies to personal development, unlock the guidance you
            need to thrive.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.callButtonText}>View consultants</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Consultants</Text>
            <ScrollView style={styles.consultantList}>
              {consultants.map((consultant) => (
                <View key={consultant.id} style={styles.consultantItem}>
                  <Text style={styles.consultantName}>{consultant.name}</Text>
                  <Text style={styles.consultantSpecialty}>
                    {consultant.specialty}
                  </Text>
                  <Text style={styles.consultantAddress}>
                    {consultant.clinicAddress}
                  </Text>
                  <Text style={styles.consultantTimings}>
                    Timings: {consultant.timings}
                  </Text>
                  <Text style={styles.consultantAvailableDays}>
                    Available Days: {consultant.availableDays}
                  </Text>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Appointment</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
  emergencyContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  illustrationContainer: {
    marginBottom: 20,
  },
  emergencyIllustration: {
    width: 250,
    height: 250,
  },
  emergencyTextContainer: {
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  emergencyHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emergencySubText: {
    padding: 10,
    color: "grey",
    fontSize: 16,
    textAlign: "center",
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 20,
  },
  bottomBarItem: {
    alignItems: "center",
  },
  bottomBarText: {
    color: "#fff",
    marginTop: 4,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  callButton: {
    backgroundColor: "#007260",
    padding: 15,
    borderRadius: 10,
  },
  callButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  consultantList: {
    width: "100%",
  },
  consultantItem: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  consultantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  consultantSpecialty: {
    fontSize: 16,
    color: "grey",
  },
  consultantAddress: {
    fontSize: 14,
    color: "grey",
  },
  consultantTimings: {
    fontSize: 14,
    color: "grey",
  },
  consultantAvailableDays: {
    fontSize: 14,
    color: "grey",
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: "#007260",
    padding: 10,
    borderRadius: 5,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Consultantconnect;
