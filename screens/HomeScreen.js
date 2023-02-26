import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector } from "react-redux";

export default function Home({ navigation }) {
  const newuser = useSelector((state) => state.users.value);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text>Welcome Home</Text>
      <Text>{newuser.username}</Text>
      <Button
        title="Go to Inscription"
        onPress={() => navigation.navigate("Login")}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
