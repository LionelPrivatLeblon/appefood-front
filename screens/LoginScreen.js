import { StatusBar } from "expo-status-bar";

//Import des composants
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

//Import etat
import { useState } from "react";

//Import Reducers
import { useDispatch } from "react-redux";
import { addUserToStore, login, logout } from "../reducers/users";

//regex pour determiner si adresse pseudo =6 caractere
const PSEUDO_REGEX = /[0-9a-zA-Z]{6,}/;
const PASSWORD_REGEX = /[0-9a-zA-Z]{6,}/;

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  //const [username, setUsername] = useState("");

  //Mes Etats
  //MSG Message Error
  const [suregexError, setSuRegexError] = useState(false);
  const [suuserError, setSuUserError] = useState(false);
  const [siregexError, setSiRegexError] = useState(false);
  const [siuserError, setSiUserError] = useState(false);

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  //Fonction SignUP
  const handleRegister = () => {
    //On verifie que sa reponde au REGEX
    if (
      PSEUDO_REGEX.test(signUpUsername) &&
      PASSWORD_REGEX.test(signUpPassword)
    ) {
      fetch("http://192.168.10.174:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //Je recupère les valeurs des etats crées en haut
          username: signUpUsername,
          password: signUpPassword,
        }),
      })
        //transformation de la reponse dans le bon format
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          //Si c'est bon, cela s'enregistre en DB et je conserve les informations du User
          //via le Reducer et je redirige le User sur la page Search === HomeScreen.js
          if (data.result) {
            dispatch(addUserToStore(signUpUsername));
            navigation.navigate("TabNavigator", { screen: "Search" });
          } else {
            //erreur qui s'affiche si username est deja enregistré en base de donnée
            setSuUserError(true);

            // efface les autres messages d'erreur
            setSuRegexError();
            setSiUserError();
            setSiRegexError();
            // Vide les champs de saisie
            setSignUpUsername();
            setSignUpPassword();
          }
        });
    } else {
      //erreur qui s'affiche si username et password ont moins de 6 caracteres
      setSuRegexError(true);
      // efface les autres messages d'erreur
      setSuUserError();
      setSiRegexError();
      setSiUserError();
      // Vide les champs de saisie
      setSignUpUsername();
      setSignUpPassword();
    }
  };

  //Fonction SignIn
  const handleConnection = () => {
    //On verifie que sa reponde au REGEX
    if (
      PSEUDO_REGEX.test(signInUsername) &&
      PASSWORD_REGEX.test(signInPassword)
    ) {
      fetch("http://192.168.10.174:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signInUsername,
          password: signInPassword,
        }),
      })
        //transformation de la reponse dans le bon format
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            //je redirige le User sur la page Search === HomeScreen.js
            navigation.navigate("TabNavigator", { screen: "Search" });
            dispatch(login(signInUsername));
          } else {
            //erreur qui s'affiche si username n'est pas en base de donnée
            setSiUserError(true);
            // efface les autres messages d'erreur
            setSiRegexError();
            setSuRegexError();
            setSuUserError();
            // Vide les champs de saisie
            setSignInUsername();
            setSignInPassword();
          }
        });
    } else {
      //erreur qui s'affiche si username et password ont moins de 6 caracteres
      setSiRegexError(true);
      // efface les autres messages d'erreur
      setSiUserError();
      setSuRegexError();
      setSuUserError();
      // Vide les champs de saisie
      setSignInUsername();
      setSignInPassword();
    }
  };

  //Fonction pour se deconnecter et se rediriger sur la page LoginScreen.sj
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Search");
    //dispatch(removeAllBookmark());
  };

  //Fonction de base pour se loge => remplacer par handleRegister
  // const connexionUser = () => {
  //   if (PSEUDO_REGEX.test(signUpUsername)) {
  //     dispatch(addUserToStore(signUpUsername));
  //     navigation.navigate("TabNavigator", { screen: "Search" });
  //   } else {
  //     setRegexError(true);
  //   }
  // };

  //Return de ma fonction principale
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.bgimage}
        source={require("../assets/images/vue-dessus-cuvette-lentilles-variete-condiments-min.jpg")}
      />
      <KeyboardAvoidingView></KeyboardAvoidingView>
      <View style={styles.masqueCover}></View>
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
            <Text style={styles.error}>
              Cet utilisateur est inconnu ou mot de passe incorrect
            </Text>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

/***********************************************/
/*            Styles                           */
/***********************************************/
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    flexDirection: "column",
    justifyContent: "center",
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },

  error: {
    marginTop: 10,
    color: "#7D4FB8",
  },

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
  bgimage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    height: height,
    resizeMode: "cover",
  },
  masqueCover: {
    backgroundColor: "#000000",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.6,
  },
});
