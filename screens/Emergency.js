import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const Emergency = ({ navigation }) => {
  const [emergencyContact, setEmergencyContact] = useState("");

  useEffect(() => {
    // Fetch the emergency contact from the API
    const fetchEmergencyContact = async () => {
      try {
        const response = await fetch(
          "http://192.168.42.207:3002/api/emergency"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmergencyContact(data.emergencyContact);
      } catch (error) {
        console.error("Error fetching emergency contact:", error);
      }
    };

    fetchEmergencyContact();
  }, []);

  const handleHomePress = () => {
    navigation.navigate("IndividualHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("IndividualSettings");
  };

  const handleEmergencyCall = () => {
    if (emergencyContact) {
      Linking.openURL(`tel:${emergencyContact}`);
    } else {
      console.log("No emergency contact available");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Left side: Box indicating individual home */}
        <View style={styles.leftBox}>
          <Text style={styles.leftText}>Individual</Text>
        </View>

        {/* Right side: User icon */}
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={() => console.log("User icon pressed")}
        >
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.emergencyContainer}>
        {/* Illustration related to emergency */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require("../assets/emergency.png")}
            style={styles.emergencyIllustration}
          />
        </View>

        {/* Text below illustration */}
        <View style={styles.emergencyTextContainer}>
          <Text style={styles.emergencyHeaderText}>Emergency Contact</Text>
          <Text style={styles.emergencySubText}>
            You can call here in case of an emergency. By default, it is
            Pakistan's suicide helpline number. You can change the number by
            going to settings.
          </Text>
        </View>

        {/* Call emergency button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={handleEmergencyCall}
          >
            <Text style={styles.callButtonText}>Call Emergency</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom navigation bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleHomePress}
        >
          <Ionicons name="home-outline" size={24} color="white" />
          {/* <Text style={styles.bottomBarText}>Home</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
          {/* <Text style={styles.bottomBarText}>Settings</Text> */}
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
    // paddingHorizontal: 20,
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
});

export default Emergency;
