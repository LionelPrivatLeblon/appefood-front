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
const PSEUDO_REGEX = /[0-9a-zA-Z]{6,}/;
const PASSWORD_REGEX = /[0-9a-zA-Z]{6,}/;

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
      fetch("http://192.168.0.17:3000/users/signup", {
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
            dispatch(addUserToStore(signUpUsername));
            navigation.navigate("TabNavigator", { screen: "Search" });
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
      fetch("http://192.168.0.17:3000/users/signin", {
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
            navigation.navigate("TabNavigator", { screen: "Search" });
            dispatch(addUserToStore(signInUsername));
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
    navigation.navigate("Search");
    //dispatch(removeAllBookmark());
  };

  const connexionUser = () => {
    if (PSEUDO_REGEX.test(signUpUsername)) {
      dispatch(addUserToStore(signUpUsername));
      navigation.navigate("TabNavigator", { screen: "Search" });
    } else {
      setRegexError(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.containersignin}>
        <View style={styles.signup}>
          <Text style={styles.formtitle}>Pseudo :</Text>

          <TextInput
            placeholder="Votre Pseudo"
            onChangeText={(value) => setSignUpUsername(value)}
            value={signUpUsername}
            style={styles.inputtext}
          />
          <Text style={styles.formtitle}>Mot de passe :</Text>
          <TextInput
            placeholder="Votre mot de passe"
            onChangeText={(password) => setSignUpPassword(password)}
            value={signUpPassword}
            style={styles.inputtext}
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
          <Text style={styles.formtitle}>Pseudo :</Text>
          <TextInput
            style={styles.inputtext}
            placeholder="Votre Pseudo"
            onChangeText={(value) => setSignInUsername(value)}
            value={signInUsername}
          />
          <Text style={styles.formtitle}>Mot de passe :</Text>
          <TextInput
            style={styles.inputtext}
            placeholder="Votre mot de passe"
            onChangeText={(value) => setSignInPassword(value)}
            value={signInPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button2}
            activeOpacity={0.8}
            onPress={() => handleConnection()}
          >
            <Text style={styles.textButton2}>Déjà un compte ?</Text>
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
  titlesignup: {
    color: "#D4BFBF",
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputtext: {
    backgroundColor: "#F3F2F5",
    padding: 10,
    margin: 5,
    color: "D4BFBF",
    width: 300,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    textAlign: "center",
  },
  textButton2: {
    color: "#7D4FB8",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#7D4FB8",
    width: 225,
    height: 59,
    borderRadius: 31,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button2: {
    backgroundColor: "#FFFFFF",

    borderWidth: 5,
    borderColor: "#7D4FB8",
    width: 225,
    height: 59,
    borderRadius: 31,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    height: 100,
    width: 100,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
  signup: {},
  signin: {},
  formtitle: {
    color: "#7D4FB8",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  containersignin: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
