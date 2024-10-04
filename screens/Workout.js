import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Linking } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const Workout = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutDataModalVisible, setWorkoutDataModalVisible] = useState(false);
  const [muscles, setMuscles] = useState("");
  const [intensityLevel, setIntensityLevel] = useState("");
  const [workoutData, setWorkoutData] = useState(null);

  const handleHomePress = () => {
    navigation.navigate("IndividualHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("IndividualSettings");
  };

  const handleStartWorkout = () => {
    setModalVisible(true);
  };

  const handleWorkoutSubmit = async () => {
    setModalVisible(false); // Hide the workout parameters modal
    try {
      await fetchWorkoutData(); // Fetch workout data based on selected parameters
      setWorkoutDataModalVisible(true); // Show the display workout modal after data is fetched
    } catch (error) {
      console.error("Failed to fetch workout data:", error);
      // Optionally, handle the error, e.g., by showing an error message
    }
  };

  const fetchWorkoutData = async () => {
    const options = {
      method: "GET",
      url: "https://work-out-api1.p.rapidapi.com/search",
      params: {
        Muscles: muscles,
        Intensity_Level: intensityLevel,
      },
      headers: {
        "X-RapidAPI-Key": "23cde47d67msh39bb36c7d0ae138p131a80jsn0b885e7fb06f",
        "X-RapidAPI-Host": "work-out-api1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      // Assuming the response data is an array of workout objects
      setWorkoutData(response.data);
      setWorkoutDataModalVisible(true);
    } catch (error) {
      console.error(error);
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
            source={require("../assets/workout.png")}
            style={styles.emergencyIllustration}
          />
        </View>

        {/* Text below illustration */}
        <View style={styles.emergencyTextContainer}>
          <Text style={styles.emergencyHeaderText}>Workout Section</Text>
          <Text style={styles.emergencySubText}>
            Ready to start your fitness and mental health journey? Browse our
            workout library, choose your first workout, and let's get moving!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.startWorkoutButton}
          onPress={handleStartWorkout}
        >
          <Text style={styles.startWorkoutText}>Start Workout</Text>
        </TouchableOpacity>

        {/* Modal for workout parameters */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Workout Parameters</Text>
              <View style={styles.inputContainer}>
                <Text>Muscles</Text>
                <RNPickerSelect
                  onValueChange={(value) => setMuscles(value)}
                  items={[
                    { label: "Biceps", value: "Biceps" },
                    { label: "Triceps", value: "Triceps" },
                    { label: "Chest", value: "Chest" },
                    { label: "Back", value: "Back" },
                    { label: "Legs", value: "Legs" },
                    { label: "Abs", value: "Abs" },
                    { label: "Stretching", value: "Stretching" },
                    { label: "Warm Up", value: "Warm Up" },
                    { label: "Lats", value: "Lats" },
                    { label: "Hamstring", value: "Hamstring" },
                    { label: "Calves", value: "Calves" },
                    { label: "Quadriceps", value: "Quadriceps" },
                    { label: "Trapezius", value: "Trapezius" },
                    { label: "Shoulders", value: "Shoulders" },
                    { label: "Glutes", value: "Glutes" },
                  ]}
                  style={pickerSelectStyles}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text>Intensity Level</Text>
                <RNPickerSelect
                  onValueChange={(value) => setIntensityLevel(value)}
                  items={[
                    { label: "Beginner", value: "Beginner" },
                    { label: "Intermediate", value: "Intermediate" },
                    { label: "Expert", value: "Expert" },
                  ]}
                  style={pickerSelectStyles}
                />
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleWorkoutSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for displaying workouts */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={workoutDataModalVisible}
          onRequestClose={() => setWorkoutDataModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView>
                {workoutData &&
                  workoutData.map((workout, index) => (
                    <View key={index} style={styles.workoutContainer}>
                      <Text style={styles.workoutHeading}>
                        Workout {index + 1}
                      </Text>
                      <View style={styles.modalContent}>
                        <Text style={styles.boldHeading}>Muscles:</Text>
                        <Text style={styles.modalText}>{workout.Muscles}</Text>

                        <Text style={styles.boldHeading}>Intensity Level:</Text>
                        <Text style={styles.modalText}>
                          {workout.Intensity_Level}
                        </Text>

                        <Text style={styles.boldHeading}>Equipment:</Text>
                        <Text style={styles.modalText}>
                          {workout.Equipment}
                        </Text>

                        <Text style={styles.boldHeading}>Workout:</Text>
                        <Text style={styles.modalText}>{workout.WorkOut}</Text>

                        <Text style={styles.boldHeading}>Beginner Sets:</Text>
                        <Text style={styles.modalText}>
                          {workout["Beginner Sets"]}
                        </Text>

                        <Text style={styles.boldHeading}>
                          Intermediate Sets:
                        </Text>
                        <Text style={styles.modalText}>
                          {workout["Intermediate Sets"]}
                        </Text>

                        <Text style={styles.boldHeading}>Expert Sets:</Text>
                        <Text style={styles.modalText}>
                          {workout["Expert Sets"]}
                        </Text>

                        <Text style={styles.boldHeading}>Explanation:</Text>
                        <Text style={styles.modalText}>
                          {workout.Explaination}
                        </Text>

                        <Text style={styles.boldHeading}>
                          Complete Explanation:
                        </Text>
                        <Text style={styles.modalText}>
                          {workout["Long Explanation"]}
                        </Text>

                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => Linking.openURL(workout.Video)}
                        >
                          <Text style={styles.closeButtonText}>Tutorial</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.closeButtons}
                onPress={() => setWorkoutDataModalVisible(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

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
    marginBottom: 20, // Add margin bottom to create space between illustration and button
  },
  emergencyIllustration: {
    width: 250, // Adjust the width of the illustration
    height: 250, // Adjust the height of the illustration
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
  startWorkoutButton: {
    backgroundColor: "#007260",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  startWorkoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Dark overlay for modal
  },
  modalContent: {
    width: "80%", // Adjust the width of the modal content
    height: "50%", // Adjust the height of the modal content
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#007260",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for modal
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Adjust modal width as needed
    maxWidth: 400, // Ensure modal does not get too wide on larger screens
  },
  closeButtons: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    backgroundColor: "#cc0000", // Match the theme color
    marginTop: 20, // Add some space above the close button
  },
  closeButton: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    backgroundColor: "#007260", // Match the theme color
    marginTop: 20, // Add some space above the close button
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "#000000",
    marginBottom: 15,
    fontSize: 16, // Adjust font size for readability
  },
  // Additional styles for better readability and spacing
  modalContent: {
    padding: 20, // Add padding inside the modal
  },
  // Styles for the close button text
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  boldHeading: {
    fontWeight: "bold",
    fontSize: 17,
    // Add any other styling you want for the bold headings
  },
  workoutHeading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center", // This should center the text
    marginBottom: 10, // Add some space between the heading and the details
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 40, // to ensure the text is not cut off
    width: "250%", // Ensure the picker takes full width
  },
});

export default Workout;
