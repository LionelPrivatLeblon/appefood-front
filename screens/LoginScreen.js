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
import { addUserToStore, login, logout } from "../reducers/users";

//regex pour determiner si adresse pseudo =6 caractere
const PSEUDO_REGEX: RegExp = /[0-9a-zA-Z]{6,}/;
const PASSWORD_REGEX: RegExp = /[0-9a-zA-Z]{6,}/;

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  //const [username, setUsername] = useState("");
  //MSG Message Error
  const [suregexError, setSuRegexError] = useState(false);
  const [suuserError, setSuUserError] = useState(false);
  const [siregexError, setSiRegexError] = useState(false);
  const [siuserError, setSiUserError] = useState(false);

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleRegister = () => {
    if (
      PSEUDO_REGEX.test(signUpUsername) &&
      PASSWORD_REGEX.test(signUpPassword)
    ) {
      fetch("http://192.168.10.141:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpUsername,
          password: signUpPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            navigation.navigate("TabNavigator", { screen: "Home" });
            dispatch(login({ username: signUpUsername, token: data.token }));
            setSignUpUsername("");
            setSignUpPassword("");
            setSuUserError(false);
            setSuRegexError(false);
          } else {
            setSuUserError(true); //erreur qui s'affiche si username n'est pas deja enregistré en base de donnée
          }
        });
    } else {
      setSuRegexError(true); //erreur qui s'affiche si username et password ont moins de 6 caracteres
    }
  };

  const handleConnection = () => {
    if (
      PSEUDO_REGEX.test(signInUsername) &&
      PASSWORD_REGEX.test(signInPassword)
    ) {
      fetch("http://192.168.10.141:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signInUsername,
          password: signInPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            navigation.navigate("TabNavigator", { screen: "Home" });
            dispatch(login({ username: signInUsername, token: data.token }));
            setSignInUsername("");
            setSignInPassword("");
            setSiUserError(false);
            setSiRegexError(false);
          } else {
            setSiUserError(true); //erreur qui s'affiche si username n'est pas en base de donnée
          }
        });
    } else {
      setSiRegexError(true); //erreur qui s'affiche si username et password ont moins de 6 caracteres
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllBookmark());
  };

  const connexionUser = () => {
    if (PSEUDO_REGEX.test(signUpUsername)) {
      dispatch(addUserToStore(signUpUsername));
      navigation.navigate("TabNavigator", { screen: "Home" });
    } else {
      setRegexError(true);
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

      <View style={styles.signup}>
        <Text>Inscription</Text>

        <TextInput
          placeholder="Votre Pseudo"
          onChangeText={(value) => setSignUpUsername(value)}
          value={signUpUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Votre mot de passe"
          onChangeText={(password) => setSignUpPassword(password)}
          value={signUpPassword}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleRegister()}
          //onPress={() => connexionUser()}
        >
          <Text style={styles.textButton}>Inscription</Text>
        </TouchableOpacity>
        {suregexError && (
          <Text style={styles.error}>
            Veuillez saisir un mot de passe et un identifiant de 6 caractères
            minimum
          </Text>
        )}
        {suuserError && (
          <Text style={styles.error}>Cet utilisateur existe deja</Text>
        )}
      </View>

      <View style={styles.signin}>
        <Text>Connexion</Text>
        <TextInput
          placeholder="Votre Pseudo"
          onChangeText={(value) => setSignInUsername(value)}
          value={signInUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Votre mot de passe"
          onChangeText={(value) => setSignInPassword(value)}
          value={signInPassword}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleConnection()}
        >
          <Text style={styles.textButton}>Connexion</Text>
        </TouchableOpacity>
        {siregexError && (
          <Text style={styles.error}>
            Veuillez saisir un mot de passe et un identifiant de 6 caractères
            minimum
          </Text>
        )}
        {siuserError && (
          <Text style={styles.error}>Cet utilisateur est inconnu</Text>
        )}
      </View>
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
  signup: {
    margin: 100,
  },
  signin: {
    margin: 100,
  },
});
