import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "./CustomAlert";

const SelfQuestions = ({ navigation }) => {
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [customAlertTitle, setCustomAlertTitle] = useState("");
  const [customAlertMessage, setCustomAlertMessage] = useState("");
  const [customAlertColor, setCustomAlertColor] = useState("black");
  const [riskLevel, setRiskLevel] = useState(""); // Define the risk level state

  const handleHomePress = () => {
    navigation.navigate("IndividualHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("IndividualSettings");
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [answers, setAnswers] = useState(Array(30).fill("No"));

  const handleStartAssessment = () => {
    setModalVisible(true);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://192.168.81.53:3002/mental-health-assessment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers }),
        }
      );

      if (!response.ok) {
        // Log response details if there's an error
        const responseText = await response.text();
        console.error(
          "Response Error: ",
          response.status,
          response.statusText,
          responseText
        );
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      const riskLevel = data.riskLevel;

      let alertColor = "black";
      switch (riskLevel) {
        case "Low":
          alertColor = "green";
          break;
        case "Medium":
          alertColor = "#FFD700";
          break;
        case "High":
          alertColor = "red";
          break;
        default:
          alertColor = "black";
      }

      // Set the state for the custom alert
      setCustomAlertTitle("Risk Level");
      setCustomAlertMessage(
        `Your risk level of mental health issues is ${riskLevel}`
      );
      setCustomAlertColor(alertColor);
      setCustomAlertVisible(true);
      setRiskLevel(riskLevel); // Set the risk level state
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to fetch data. Please try again later.");
    } finally {
      setModalVisible(false);
    }
  };

  const questions = [
    "Have you experienced any significant changes in your mood recently?",
    "Do you have trouble falling asleep or staying asleep?",
    "Have you noticed any changes in your appetite or eating habits?",
    "Do you often feel anxious or worried without any specific reason?",
    "Have you been feeling more fatigued or lethargic than usual?",
    "Do you frequently experience physical symptoms such as headaches, stomach aches, or muscle tension?",
    "Have you had difficulty concentrating or making decisions lately?",
    "Do you find yourself avoiding social activities or withdrawing from others?",
    "Have you been engaging in any harmful behaviors, such as substance abuse or self-harm?",
    "Do you feel hopeless or pessimistic about the future?",
    "Have you experienced any traumatic events or major life changes recently?",
    "Have you considered seeking help from a mental health professional?",
    " Do you often feel irritable or easily frustrated?",
    "Have you been feeling unusually sad or empty?",
    "Do you experience sudden and intense feelings of panic or fear?",
    "Have you noticed a decrease in your interest or pleasure in activities you usually enjoy?",
    "Do you have difficulty remembering things or experience frequent memory lapses?",
    "Do you feel detached from your surroundings or feel like you’re in a dream-like state?",
    "Do you have difficulty trusting others or feel constantly on guard?",
    "Have you been experiencing flashbacks or intrusive memories of past traumatic events?",
    "Do you find yourself constantly worrying about your health or having irrational fears?",
    "Have you noticed a significant decrease in your self-esteem or self-worth?",
    "Do you have difficulty controlling your thoughts, especially negative ones?",
    "Have you experienced any periods of extreme highs or lows in your mood?",
    "Do you feel excessively guilty or blame yourself for things that are not your fault?",
    "Have you had thoughts of harming yourself or others?",
    "Do you experience sudden anger or rage that seems disproportionate to the situation?",
    "Have you had any trouble performing daily tasks or fulfilling responsibilities at work or home?",
    "Do you feel a sense of dread or impending doom without knowing why?",
    "Do you feel emotionally numb or disconnected from your emotions?",
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/selfQuestions.png")}
          style={styles.emergencyIllustration}
        />
      </View>

      {/* Text below illustration */}
      <View style={styles.emergencyTextContainer}>
        <Text style={styles.emergencyHeaderText}>
          Self-Assessment Questionnaire
        </Text>
        <Text style={styles.emergencySubText}>
          This tool is designed to help you explore and understand your mental
          well-being. By answering a series of questions honestly, you'll gain
          valuable insights into your mood, stress levels, sleep patterns, and
          more. Your responses will remain confidential and secure, guiding you
          towards personalized feedback and suggestions to support your mental
          health journey. Let's get started!
        </Text>
      </View>

      {/* Start assessment button */}
      <TouchableOpacity
        style={styles.startAssessmentButton}
        onPress={handleStartAssessment}
      >
        <Text style={styles.startAssessmentText}>Start Self Assessment</Text>
      </TouchableOpacity>

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

      {/* Question Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {questions.map((question, index) => (
                <View style={styles.questionContainer} key={index}>
                  <Text style={styles.questionText}>
                    {index + 1}. {question}
                  </Text>
                  <View style={styles.radioButtonsContainer}>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        answers[index] === "Yes" && styles.selectedRadioButton,
                      ]}
                      onPress={() => handleAnswerChange(index, "Yes")}
                    >
                      {answers[index] === "Yes" && (
                        <View style={styles.radioButtonInner}></View>
                      )}
                    </TouchableOpacity>
                    <Text style={styles.radioButtonText}>Yes</Text>
                    <TouchableOpacity
                      style={[
                        styles.radioButton,
                        answers[index] === "No" && styles.selectedRadioButton,
                      ]}
                      onPress={() => handleAnswerChange(index, "No")}
                    >
                      {answers[index] === "No" && (
                        <View style={styles.radioButtonInner}></View>
                      )}
                    </TouchableOpacity>
                    <Text style={styles.radioButtonText}>No</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CustomAlert
        visible={customAlertVisible}
        onClose={() => setCustomAlertVisible(false)}
        title={customAlertTitle}
        message={customAlertMessage}
        messageColor={customAlertColor}
        riskLevel={riskLevel}
        navigation={navigation}
      />
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
  imageContainer: {
    alignItems: "center",
    marginTop: 30,
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
  startAssessmentButton: {
    backgroundColor: "#007260",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 90,
    marginBottom: 20,
    alignItems: "center",
  },
  startAssessmentText: {
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
    width: "80%",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007260",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedRadioButton: {
    backgroundColor: "#007260",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  radioButtonText: {
    fontSize: 16,
    marginRight: 20,
  },
  submitButton: {
    backgroundColor: "#007260",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default SelfQuestions;
