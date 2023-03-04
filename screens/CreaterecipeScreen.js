import { StatusBar } from "expo-status-bar";

//Import des composants
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  Button,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";

//Import etat
import { useState } from "react";

//Import Reducers
import { useDispatch } from "react-redux";
import { addRecipeToStore } from "../reducers/createrecipe";

//j'importe le tableau de données
import { ingredients } from "../data/dataArrays";

export default function Createrecipe({ navigation }) {
  const dispatch = useDispatch();
  //const [username, setUsername] = useState("");

  //Mes Etats
  //MSG Message Error
  const [recipeuserError, setRecipeUserError] = useState(false);
  const [recipevalidate, setRecipeValidate] = useState(false);

  const [recipetitle, setRecipetitle] = useState("");
  const [recipecategoryId, setRecipecategoryId] = useState("");
  const [recipeservingNb, setRecipeservingNb] = useState("");
  const [recipevoteAverage, setRecipevoteAverage] = useState("");
  const [recipephotoUrl, setRecipephotoUrl] = useState("");
  const [recipephotoArray, setRecipephotoArray] = useState("");
  const [recipetime, setRecipeTime] = useState("");
  const [recipedescription, setRecipeDescription] = useState("");
  const [recipeingredient, setRecipeingredient] = useState("");

  const [isChecked, setIsChecked] = useState();

  //const recipeingredient = [];

  //Fonction SignUP
  const recipeRegister = () => {
    fetch("http://192.168.10.106:3000/createrecipes/newrecipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //Je recupère les valeurs des etats crées en haut

        title: recipetitle, //String,
        categoryId: recipecategoryId, //Number,
        servingNb: recipeservingNb, //Number,
        voteAverage: recipevoteAverage, //Number,
        photo_url: recipephotoUrl, //String,
        photosArray: recipephotoArray, //String,
        time: recipetime, //Number,
        ingredients: recipeingredient, //Number,
        description: recipedescription, //String,
      }),
    })
      //transformation de la reponse dans le bon format
      .then((response) => response.json())
      .then((data) => {
        //Si c'est bon, cela s'enregistre en DB et je conserve les informations du User
        //via le Reducer et je redirige le User sur la page Search === HomeScreen.js
        if (data.result) {
          dispatch(addRecipeToStore(recipetitle));
          setRecipeValidate(true);
          setRecipeUserError();
        } else {
          //erreur qui s'affiche si username est deja enregistré en base de donnée
          setRecipeUserError(true);

          // efface les autres messages d'erreur
          setRecipeValidate();
          // Vide les champs de saisie
        }
      });
  };

  const displayIngredient = () => {
    return (
      <ScrollView>
        <View style={styles.blocscrollview}>
          {ingredients.map((data) => (
            <BouncyCheckbox
              style={styles.blocingredient}
              size={25}
              fillColor="#D4BFBF"
              unfillColor="#FFFFFF"
              text={data.name}
              iconStyle={{ borderColor: "#D4BFBF" }}
              innerIconStyle={{ borderWidth: 2 }}
              //onPress={isChecked(data.ingredientId)}
              onChangeText={(value) => setRecipeingredient(value)}
              //value={data.ingredientId}
              value={recipeingredient}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  const displayIngredient2 = () =>
    fetch("http://192.168.10.106:3000/createrecipes/displayrecette")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.recipe);
        <View>test</View>;
        /*if (data.weather) {
          for (let i = 0; i < data.weather.length; i++) {
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item }} />
            </View>;
            document.querySelector("#cityList").innerHTML += `
				<div class="cityContainer">
				<p class="name">${data.weather[i].cityName}</p>
				<p class="description">${data.weather[i].description}</p>
				<img class="weatherIcon" src="images/${data.weather[i].main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather[i].tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather[i].tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather[i].cityName}">Delete</button>
			</div>
			`;
          }
          updateDeleteCityEventListener();
        }*/
      });

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
      <View style={styles.masqueCover}></View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.containersignin}>
          <Text style={styles.formtitle}>Création de la recette :</Text>

          <TextInput
            placeholder="Nom de la recette"
            onChangeText={(value) => setRecipetitle(value)}
            value={recipetitle}
            style={styles.inputtext}
          />

          <TextInput
            placeholder="Nom de la catégorie"
            onChangeText={(value) => setRecipecategoryId(value)}
            value={recipecategoryId}
            style={styles.inputtext}
          />

          <TextInput
            placeholder="Pour combien de personne"
            onChangeText={(value) => setRecipeservingNb(value)}
            value={recipeservingNb}
            style={styles.inputtext}
          />

          <TextInput
            placeholder="Votre Note"
            onChangeText={(value) => setRecipevoteAverage(value)}
            value={recipevoteAverage}
            style={styles.inputtext}
          />

          <TextInput
            placeholder="Photo à la une"
            onChangeText={(value) => setRecipephotoUrl(value)}
            value={recipephotoUrl}
            style={styles.inputtext}
          />

          <TextInput
            placeholder="Gallerie photo"
            onChangeText={(value) => setRecipephotoArray(value)}
            value={recipephotoArray}
            style={styles.inputtext}
          />

          <TextInput
            placeholder="Temps de préparation"
            onChangeText={(value) => setRecipeTime(value)}
            value={recipetime}
            style={styles.inputtext}
          />
          {displayIngredient()}

          <TextInput
            placeholder="Decription"
            onChangeText={(value) => setRecipeDescription(value)}
            value={recipedescription}
            style={styles.inputtext}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => recipeRegister()}
          >
            <Text style={styles.textButton}>Valider</Text>
          </TouchableOpacity>
          {recipeuserError && (
            <Text style={styles.error}>Cette recette existe déja</Text>
          )}

          {recipevalidate && (
            <Text style={styles.good}>Recette enregistrée</Text>
          )}
        </View>
      </ScrollView>
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
    position: "relative",
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
  scrollView: {
    width: width,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
  good: {
    marginTop: 10,
    color: "green",
  },

  formtitle: {
    color: "#7D4FB8",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  containersignin: {
    justifyContent: "center",
    alignItems: "center",
    height: height,
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
  blocingredient: {
    width: 100,
    color: "#FFFFFF",
    margin: 5,
  },
  blocscrollview: {
    margin: 5,
    width: 300,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
