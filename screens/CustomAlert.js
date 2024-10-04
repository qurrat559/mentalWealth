import React from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";

const CustomAlert = ({
  visible,
  onClose,
  title,
  message,
  messageColor,
  riskLevel,
  navigation,
}) => {
  const handleconsultantPress = () => {
    navigation.navigate("Consultantconnect");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
          <Text style={{ color: messageColor, marginTop: 10 }}>{message}</Text>
          {riskLevel === "Low" ? (
            <TouchableOpacity
              onPress={onClose}
              style={{
                alignSelf: "center",
                marginTop: 20,
                backgroundColor: "#cc0000",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <Text style={{ color: "white" }}>Close</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={handleconsultantPress}
                style={{
                  backgroundColor: "#007260",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Connect with Consultant
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  backgroundColor: "#cc0000",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
