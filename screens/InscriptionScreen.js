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

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const connexionUser = () => {
    dispatch(addUserToStore(username));
    navigation.navigate("TabNavigator");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome Inscription</Text>
      <TextInput
        placeholder="Votre Nom"
        onChangeText={(value) => setUsername(value)}
        value={username}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => connexionUser()}
      >
        <Text>Valider</Text>
      </TouchableOpacity>
    </View>
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
});
