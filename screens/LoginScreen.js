import { StatusBar } from "expo-status-bar";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addUserToStore } from "../reducers/users";

//regex pour determiner si adresse mail
const EMAIL_REGEX: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState(false);

  const connexionUser = () => {
    if (EMAIL_REGEX.test(username)) {
      dispatch(addUserToStore(username));
      navigation.navigate("TabNavigator", { screen: "Home" });
    } else {
      setEmailError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.image}
        source={require("../assets/images/avocado-salad.png")}
      />
      <Text>Welcome Inscription</Text>

      <TextInput
        placeholder="Votre Email"
        onChangeText={(value) => setUsername(value)}
        value={username}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => connexionUser()}
      >
        <Text style={styles.textButton}>Valider</Text>
      </TouchableOpacity>
      {emailError && <Text style={styles.error}>Invalid email address</Text>}
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
  input: {
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "00ffff",
  },
  image: {
    height: 100,
    width: 100,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});
