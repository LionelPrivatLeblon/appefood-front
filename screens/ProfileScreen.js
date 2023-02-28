import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/users";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProfileScreen({ navigation }) {
  const newuser = useSelector((state) => state.users.value);
  console.log("test " + newuser);

  //
  function handleLogout() {
    //----> déconnexion
    // je vide le store
    dispatch(logout());
    // je me redirigie vers la page login
    navigation.navigate("Login");
  }

  // ------- retour de la fonction principale --------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      {/* Transformer les boutons et utiliser un touchable opacity pour l'icone et le text */}
      <Text>{newuser.username || "Damien"}</Text>

      {/* ------- Bouton Mes recettes ------- */}
      <TouchableOpacity style={styles.button}>
        <Text>Mes recettes</Text>
        <FontAwesome name="play" size={25} />
      </TouchableOpacity>

      {/* -------  Bouton Mes favoris -------- */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Favoris")}
        style={styles.button}
      >
        <Text>Mes favoris</Text>
        <FontAwesome name="play" size={25} />
      </TouchableOpacity>

      {/* -----    Bouton logout --------*/}
      <TouchableOpacity
        title="logout"
        onPress={() => handleLogout()}
        style={styles.logout}
      >
        <Text>LOGOUT</Text>
      </TouchableOpacity>

      {/* Lorsque je me déconnecte je dois réinitialiser les infos du user dnas le store */}
    </View>
  );
}

/***********************************************/
/*            Styles                           */
/***********************************************/
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 250,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#7D4FB8",
    width: 225,
    height: 59,
    borderRadius: 31,
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  logout: {
    color: "black",
    borderRadius: 40,
    borderWidth: 1,
    height: 80,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "500",
  },
});
