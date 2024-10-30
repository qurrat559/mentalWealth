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

const ShowConsultantFeedback = ({ navigation }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const user = getUserDetails();

  const handleHomePress = () => {
    navigation.navigate("AdminHome");
  };

  const handleSettingsPress = () => {
    navigation.navigate("AdminSettings");
  };

  const fetchFeedbackData = async () => {
    try {
      const response = await fetch(
        "http://192.168.81.53:3002/admin/consultant-feedback",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Feedback fetched successfully:", result);
        setFeedbacks(result?.data);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch feedback:", errorData);
        alert(`Failed to fetch feedback: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Consultant Feedback</Text>
      </View>

      <ScrollView style={styles.feedbackList}>
        {feedbacks.map((feedback) => (
          <View key={feedback.id} style={styles.feedbackItem}>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={styles.label}>
                How well did the client understand the consultation?{" "}
              </Text>
              <Text style={styles.feedbackDetails}>{feedback.question1}</Text>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={styles.label}>
                What challenges did the client face during the session?{" "}
              </Text>
              <Text style={styles.feedbackDetails}>{feedback.question2}</Text>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={styles.label}>
                Do you have any suggestions for improving the session?{" "}
              </Text>
              <Text style={styles.feedbackDetails}>{feedback.question3}</Text>
            </View>
            <Text style={styles.feedbackDetails}>
              <Text style={styles.label}>Date: </Text>
              {new Date(feedback.created_at).toDateString()}
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
  feedbackList: {
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  feedbackItem: {
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
  feedbackDetails: {
    fontSize: 15,
    color: "#666",
    marginBottom: 4,
  },
  label: {
    fontSize: 15,
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

export default ShowConsultantFeedback;
