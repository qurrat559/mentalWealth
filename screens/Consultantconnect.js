import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getUserDetails } from "../UserStore";

const Consultantconnect = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [consultant, setConsultant] = useState([]);
  const user = getUserDetails();

  const handleHomePress = () => {
    navigation.navigate("IndividualHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("IndividualSettings");
  };

  const handleSubmit = async (item) => {
    try {
      let form = {
        individual_id: user.id,
        consultant_id: item.id,
      };
      const response = await fetch(
        "http://192.168.81.53:3002/individual/book-appointment",
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
        console.log("appointment booked successfully:", result);
        alert("Appointment booked successfully!");
        navigation.navigate("ConsultantHome");
      } else {
        const errorData = await response.json();
        console.error("Failed to book appointment:", errorData);
        alert(`Failed to book appointment ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting consultant details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchConsultantData = async () => {
    try {
      const response = await fetch(
        "http://192.168.81.53:3002/individual/get-consultant",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("resssssssss", response);

      if (response.ok) {
        const result = await response.json();

        console.log("Form data fetched successfully:", result);
        setConsultant(result?.data);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch consultant details:", errorData);
        alert(`Failed to fetch consultant details: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching consultant details:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchConsultantData();
  }, []);

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
              {consultant.map((consultant) => (
                <View key={consultant.id} style={styles.consultantItem}>
                  <Text style={styles.consultantName}>{consultant.name}</Text>
                  <Text style={styles.consultantSpecialty}>
                    {consultant.specialization}
                  </Text>
                  <Text style={styles.consultantAddress}>
                    {consultant.address}
                  </Text>
                  <Text style={styles.consultantTimings}>
                    Timings: {consultant.clinic_timing}
                  </Text>
                  <Text style={styles.consultantAvailableDays}>
                    Available Day: {consultant.available_days}
                  </Text>
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleSubmit(consultant)}
                  >
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#007260",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  consultantList: {
    width: "100%",
    maxHeight: 500,
  },
});

export default Consultantconnect;
