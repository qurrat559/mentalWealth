import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ConsultantFeedback = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");

  const handleHomePress = () => {
    navigation.navigate("ConsultantHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("ConsultantSettings");
  };

  const handleSubmitFeedback = async () => {
    // Clear previous error messages
    setError1("");
    setError2("");
    setError3("");

    let isValid = true;

    if (question1.trim() === "") {
      setError1("This question is mandatory.");
      isValid = false;
    }
    if (question2.trim() === "") {
      setError2("This question is mandatory.");
      isValid = false;
    }
    if (question3.trim() === "") {
      setError3("This question is mandatory.");
      isValid = false;
    }

    if (!isValid) {
      showMessage({
        message: "Please answer all questions before submitting.",
        type: "danger",
      });
      return;
    }

    const feedbackData = {
      question1,
      question2,
      question3,
    };

    try {
      const response = await axios.post(
        "http://192.168.81.53:3002/submit-consultant-feedback",
        feedbackData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        showMessage({
          message: "Feedback submitted successfully",
          type: "success",
        });

        setQuestion1("");
        setQuestion2("");
        setQuestion3("");
        setModalVisible(false);
      } else {
        showMessage({
          message: "Error Occurred",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftBox}>
          <Text style={styles.leftText}>Consultant</Text>
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
            source={require("../assets/feedback.jpg")}
            style={styles.emergencyIllustration}
          />
        </View>
      </View>

      <View style={styles.emergencyTextContainer}>
        <Text style={styles.emergencyHeaderText}>
          Consultant Session Feedback
        </Text>
        <Text style={styles.emergencySubText}>
          Please provide feedback on the session to help us improve.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.startAssessmentButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.startAssessmentText}>Fill Feedback Form</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Session Feedback Form</Text>
            <ScrollView>
              <Text style={styles.questionText}>
                1. How well did the client understand the consultation?
              </Text>
              <TextInput
                style={[
                  styles.feedbackInput,
                  error1 ? styles.errorInput : null,
                ]}
                placeholder="Your answer"
                value={question1}
                onChangeText={(text) => setQuestion1(text)}
              />
              {error1 ? <Text style={styles.errorText}>{error1}</Text> : null}

              <Text style={styles.questionText}>
                2. What challenges did the client face during the session?
              </Text>
              <TextInput
                style={[
                  styles.feedbackInput,
                  error2 ? styles.errorInput : null,
                ]}
                placeholder="Your answer"
                value={question2}
                onChangeText={(text) => setQuestion2(text)}
              />
              {error2 ? <Text style={styles.errorText}>{error2}</Text> : null}

              <Text style={styles.questionText}>
                3. Do you have any suggestions for improving the session?
              </Text>
              <TextInput
                style={[
                  styles.feedbackInput,
                  error3 ? styles.errorInput : null,
                ]}
                placeholder="Your answer"
                value={question3}
                onChangeText={(text) => setQuestion3(text)}
              />
              {error3 ? <Text style={styles.errorText}>{error3}</Text> : null}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitFeedback}
              >
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
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
      <FlashMessage position="bottom" />
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
  emergencyContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
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
  feedbackInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#007260",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default ConsultantFeedback;
