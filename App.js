import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Signup from "./screens/Signup";
import IndividualHome from "./screens/IndividualHome";
import ConsultantHome from "./screens/ConsultantHome";
import Emergency from "./screens/Emergency";
import SelfQuestions from "./screens/SelfQuestions";
import Consultantconnect from "./screens/Consultantconnect";
import Workout from "./screens/Workout";
import IndividualSettings from "./screens/IndividualSettings";
import Feedback from "./screens/Feedback";
import ConsultantSettings from "./screens/ConsultantSettings";
import ConsultantDetailForm from "./screens/ConsultantDetailForm";
import ConsultantFeedback from "./screens/ConsultantFeedback";
import ViewPatient from "./screens/ViewPatient";
import AdminHome from "./screens/AdminHome";
import AdminSettings from "./screens/AdminSettings";
import ShowConsultantFeedback from "./screens/ShowConsultantFeedback";
import IndividualFeedback from "./screens/IndividualFeedback";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ConsultantHome">
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="IndividualHome"
          component={IndividualHome}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ConsultantHome"
          component={ConsultantHome}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Emergency"
          component={Emergency}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SelfQuestions"
          component={SelfQuestions}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Workout"
          component={Workout}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Consultantconnect"
          component={Consultantconnect}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="IndividualSettings"
          component={IndividualSettings}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Feedback"
          component={Feedback}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ConsultantSettings"
          component={ConsultantSettings}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ConsultantForm"
          component={ConsultantDetailForm}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ConsultantFeedback"
          component={ConsultantFeedback}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ViewPatient"
          component={ViewPatient}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AdminSettings"
          component={AdminSettings}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ShowConsultantFeedback"
          component={ShowConsultantFeedback}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="IndividualFeedback"
          component={IndividualFeedback}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
