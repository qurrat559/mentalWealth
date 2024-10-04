import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const IndividualSettings = ({ navigation, route }) => {
  const { userDetails } = route.params || {};

  const handleHomePress = () => {
    navigation.navigate("IndividualHome");
  };

  const handleLogoutPress = () => {
    navigation.navigate("Login");
  };

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

      <View style={styles.content}>
        <Text style={styles.sectionHeading}>Personal Information</Text>

        {userDetails ? (
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userDetail}>Name: {userDetails.name}</Text>
            <Text style={styles.userDetail}>CNIC: {userDetails.cnic}</Text>
            <Text style={styles.userDetail}>
              Phone: {userDetails.phoneNumber}
            </Text>
            <Text style={styles.userDetail}>Role: {userDetails.role}</Text>
          </View>
        ) : (
          <Text>No user details available</Text>
        )}

        <Button title="LOGOUT" onPress={handleLogoutPress} />
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarItem}
          onPress={handleHomePress}
        >
          <Ionicons name="home-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem}>
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
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userDetailsContainer: {
    marginBottom: 20,
  },
  userDetail: {
    fontSize: 18,
    marginBottom: 10,
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

export default IndividualSettings;
