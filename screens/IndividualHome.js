import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IndividualHome = ({ route, navigation }) => {
  const { userDetails } = route.params || {};

  const handleEmergencyPress = () => {
    // Navigate to the Emergency component
    navigation.navigate("Emergency");
  };

  const handleSelfQuestionPress = () => {
    // Navigate to the Emergency component
    navigation.navigate("SelfQuestions");
  };

  const handleHomePress = () => {
    navigation.navigate("IndividualHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("IndividualSettings", { userDetails });
  };

  const handleWorkoutPress = () => {
    navigation.navigate("Workout");
  };

  const handleconsultantPress = () => {
    navigation.navigate("Consultantconnect");
  };

  const handleFeedbackPress = () => {
    navigation.navigate("Feedback");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Welcome text box */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeText}>Welcome user !</Text>
      </View>

      {/* Four boxes */}
      <View style={styles.fourBoxesContainer}>
        <TouchableOpacity style={styles.box} onPress={handleSelfQuestionPress}>
          <View style={styles.boxContent}>
            <FontAwesome name="list-alt" size={40} color="#007260" />
            <Text style={styles.boxText}>Self Assessment</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={handleconsultantPress}>
          <View style={styles.boxContent}>
            <Ionicons name="people-outline" size={40} color="#007260" />
            <Text style={styles.boxText}>Connect with your Consultant</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={handleWorkoutPress}>
          <View style={styles.boxContent}>
            <MaterialCommunityIcons name="dumbbell" size={40} color="#007260" />
            <Text style={styles.boxText}>Workout Section</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={handleEmergencyPress}>
          <View style={styles.boxContent}>
            <FontAwesome name="phone" size={40} color="#007260" />
            <Text style={styles.boxText}>Emergency Contact</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxx} onPress={handleFeedbackPress}>
          <View style={styles.boxContent}>
            <FontAwesome name="comments" size={40} color="#007260" />
            <Text style={styles.boxText}>Feedback</Text>
          </View>
        </TouchableOpacity>
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
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
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
    width: "48%", // Adjusted width to accommodate two boxes in a row
    height: 145, // Adjust height as needed
    marginBottom: 20, // Add margin between boxes
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

export default IndividualHome;
