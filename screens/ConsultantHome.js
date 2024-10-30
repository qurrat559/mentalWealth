import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ConsultantHome = ({ route, navigation }) => {
  const { userDetails } = route.params || {};

  console.log(userDetails);

  const handleSettingsPress = () => {
    navigation.navigate("ConsultantSettings", { userDetails });
  };

  const handleDetailForm = () => {
    // Navigate to the Emergency component
    navigation.navigate("ConsultantForm");
  };

  const handleFeedbackForm = () => {
    // Navigate to the Emergency component
    navigation.navigate("ConsultantFeedback");
  };

  const handleViewPatient = () => {
    // Navigate to the Emergency component
    navigation.navigate("ViewPatient");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Left side: Box indicating individual home */}
        <View style={styles.leftBox}>
          <Text style={styles.leftText}>Consultant</Text>
        </View>

        {/* Right side: User icon */}
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={() => console.log("User icon pressed")}
        >
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeText}>Welcome consultant !</Text>
      </View>

      <View style={styles.fourBoxesContainer}>
        <TouchableOpacity style={styles.box} onPress={handleDetailForm}>
          <View style={styles.boxContent}>
            <FontAwesome name="list-alt" size={40} color="#007260" />
            <Text style={styles.boxText}>Fill Detail Form</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={handleViewPatient}>
          <View style={styles.boxContent}>
            <Ionicons name="people-outline" size={40} color="#007260" />
            <Text style={styles.boxText}>View Patients</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxx} onPress={handleFeedbackForm}>
          <View style={styles.boxContent}>
            <FontAwesome name="comments" size={40} color="#007260" />
            <Text style={styles.boxText}>Feedback</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom navigation bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarItem}>
          <Ionicons name="home-outline" size={24} color="white" />
          {/* <Text style={styles.bottomBarText}>Home</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color="white" />
          {/* <Text style={styles.bottomBarText}>Emergency</Text> */}
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
  content: {
    flex: 1, // Fill remaining space
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
  welcomeBox: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },

  fourBoxesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 14,
  },

  box: {
    width: "48%",
    height: 145,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  boxx: {
    width: "48%",
    height: 150,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },

  boxContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ConsultantHome;
