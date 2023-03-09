//import des composants
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

//Reducers
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/users";

//Import Librairie
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProfileScreen({ navigation }) {
  //Affiche la valeur du reducers Users qui a été recupéré sur LoginScreen.js
  const newuser = useSelector((state) => state.users.value);

  const dispatch = useDispatch();

  // console.log("test " + newuser);

  //Fonction de deconnexion
  function handleLogout() {
    // je vide le store
    dispatch(logout());

    // je me redirigie vers la page login
    navigation.navigate("Login");
  }

  // ------- retour de la fonction principale --------
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/images/vue-dessus-cuvette-lentilles-variete-condiments-min.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          {/* Transformer les boutons et utiliser un touchable opacity pour l'icone et le text */}
          <Text style={styles.title}>Bon appétit {newuser.username}!</Text>

          {/* ------- Bouton Mes recettes ------- */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textColor}>Mes recettes</Text>
            {/* <FontAwesome name="play" size={25} /> */}
          </TouchableOpacity>

          {/* -------  Bouton Mes favoris -------- */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Favoris")}
            style={styles.button}
          >
            <Text style={styles.textColor}>Mes favoris</Text>
            {/* <FontAwesome name="play" size={25} /> */}
          </TouchableOpacity>

          {/* -----    Bouton logout --------*/}
          <TouchableOpacity
            title="logout"
            onPress={() => handleLogout()}
            style={styles.logout}
          >
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
        {/* Lorsque je me déconnecte je dois réinitialiser les infos du user dnas le store */}
      </ImageBackground>
    </SafeAreaView>
  );
}

/***********************************************/
/*            Styles                           */
/***********************************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(	0, 0, 0, 0.6)",
  },
  background: {
    width: "100%",
    height: "100%",
  },

  button: {
    width: 225,
    height: 59,
    borderRadius: 31,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7D4FB8",
    width: 225,
    height: 59,
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textColor: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logout: {
    borderColor: "#7D4FB8",
    backgroundColor: "white",
    borderRadius: 40,
    borderWidth: 5,
    height: 59,
    width: 225,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logoutText: {
    color: "#7D4FB8",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#7D4FB8",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    width: "100%",
    height: 40,
  },
});
