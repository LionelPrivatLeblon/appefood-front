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

import { Camera } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BouncyCheckbox from "react-native-bouncy-checkbox";

//Import etat
import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";

//Import Reducers
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, removePhoto } from "../reducers/users";
import { addRecipeToStore } from "../reducers/createrecipe";

export default function Createrecipe() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.value);

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

  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const [recipeingredient, setRecipeingredient] = useState([
    { ingredientId: 0, name: "Huile", isChecked: false },
    { ingredientId: 1, name: "Sel", isChecked: false },
    { ingredientId: 2, name: "Pomme de terre Russet", isChecked: false },
    { ingredientId: 3, name: "Paprika", isChecked: false },
    { ingredientId: 4, name: "Poivre Noir", isChecked: false },
    { ingredientId: 5, name: "Sel de céleri", isChecked: false },
    { ingredientId: 6, name: "Sauge séchée", isChecked: false },
    { ingredientId: 7, name: "Ail en poudre", isChecked: false },
    { ingredientId: 8, name: "épice moulu", isChecked: false },
    { ingredientId: 9, name: "Grégano séché", isChecked: false },
    { ingredientId: 10, name: "Basilic séché", isChecked: false },
    { ingredientId: 11, name: "Marjolaine séché", isChecked: false },
    { ingredientId: 12, name: "All purpose floor", isChecked: false },
    { ingredientId: 13, name: "Sucre Marron", isChecked: false },
    { ingredientId: 14, name: "Sel casher", isChecked: false },
    { ingredientId: 15, name: "Poulet entier", isChecked: false },
    { ingredientId: 16, name: "Oeufs", isChecked: false },
    { ingredientId: 17, name: "Huile vierge", isChecked: false },
    { ingredientId: 18, name: "Eau", isChecked: false },
    { ingredientId: 19, name: "Oignon en poudre", isChecked: false },
    { ingredientId: 20, name: "MSG", isChecked: false },
    { ingredientId: 21, name: "Poitrine de poulet", isChecked: false },
    { ingredientId: 22, name: "Oignon haché", isChecked: false },
    { ingredientId: 23, name: "Pâte de tomate", isChecked: false },
    { ingredientId: 24, name: "Poudre de chili", isChecked: false },
    { ingredientId: 25, name: "Bœuf haché", isChecked: false },
    {
      ingredientId: 26,
      name: "Haricots rouges rincés et égouttés",
      isChecked: false,
    },
    { ingredientId: 27, name: "Grande tortilla", isChecked: false },
    { ingredientId: 28, name: "Firtos", isChecked: false },
    { ingredientId: 29, name: "cheddar râpé", isChecked: false },
    { ingredientId: 30, name: "Chaux", isChecked: false },
    { ingredientId: 31, name: "Cumin en poudre", isChecked: false },
    { ingredientId: 32, name: "Poivre de cayenne", isChecked: false },
    { ingredientId: 33, name: "Poisson blanc feuilleté", isChecked: false },
    { ingredientId: 34, name: "Avocat", isChecked: false },
    { ingredientId: 35, name: "Piment rouge", isChecked: false },
    { ingredientId: 36, name: "Oignons", isChecked: false },
    { ingredientId: 37, name: "Poivron vert", isChecked: false },
    { ingredientId: 38, name: "Poivron rouge", isChecked: false },
    { ingredientId: 39, name: "Pâte à pizza", isChecked: false },
    { ingredientId: 40, name: "Ketchup", isChecked: false },
    { ingredientId: 41, name: "Sauce piquante", isChecked: false },
    { ingredientId: 42, name: "Beurre", isChecked: false },
    { ingredientId: 43, name: "Créme épaisse", isChecked: false },
    { ingredientId: 44, name: "Yaourt au lait entier", isChecked: false },
    { ingredientId: 45, name: "Fromage", isChecked: false },
    { ingredientId: 46, name: "Mozzarella", isChecked: false },
    { ingredientId: 47, name: "branches de céleri", isChecked: false },
    { ingredientId: 48, name: "Parmesan", isChecked: false },
    { ingredientId: 49, name: "Pancetta", isChecked: false },
    { ingredientId: 40, name: "Spaghetti", isChecked: false },
    { ingredientId: 51, name: "Ail", isChecked: false },
    { ingredientId: 52, name: "Lasagne", isChecked: false },
    { ingredientId: 53, name: "Sauce italienne", isChecked: false },
    { ingredientId: 54, name: "Tomate écrasée", isChecked: false },
    { ingredientId: 55, name: "Sucre", isChecked: false },
    { ingredientId: 56, name: "persil frais haché", isChecked: false },
    { ingredientId: 57, name: "Ricotta", isChecked: false },
    { ingredientId: 58, name: "Graine de fenouil", isChecked: false },
    { ingredientId: 59, name: "Bannane", isChecked: false },
    { ingredientId: 60, name: "Fraise congelée", isChecked: false },
    { ingredientId: 61, name: "Yaourt à la grecque", isChecked: false },
  ]);

  //Fonction SignUP
  const recipeRegister = () => {
    const ingredients = recipeingredient
      .filter((e) => e.isChecked)
      .map((e) => e.ingredientId);
    fetch("http://192.168.10.138:3000/createrecipes/newrecipe", {
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
        ingredients: ingredients, //recipeingredient, //Number,
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

    //console.log("test " + recipeingredient.name);
  };

  const displayIngredient2 = () =>
    fetch("http://192.168.10.106:3000/createrecipes/displayrecette")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.recipe);
        <View>test</View>;
      });

  const CheckboxList = () => {
    const handleCheckboxPress = (itemId) => {
      const newList = recipeingredient.map((ingredient) => {
        if (ingredient.ingredientId === itemId) {
          return { ...ingredient, isChecked: !ingredient.isChecked };
        }
        return ingredient;
      });
      setRecipeingredient(newList);
    };

    return (
      <ScrollView>
        <View style={styles.blocscrollview}>
          {recipeingredient.map((item) => (
            <BouncyCheckbox
              style={styles.blocingredient}
              text={item.name}
              disableBuiltInState
              isChecked={item.isChecked}
              onPress={() => handleCheckboxPress(item.ingredientId)}
              size={25}
              fillColor="#D4BFBF"
              unfillColor="#ffffff"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    console.log("test " + photo.uri);

    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    fetch("http://192.168.10.138:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(addPhoto(photo.uri));
      });
  };

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const renderCamera = () => {
    return (
      <Camera ref={(ref) => (cameraRef = ref)} style={styles.camera}>
        <View style={styles.snapContainer}>
          <TouchableOpacity onPress={() => cameraRef && takePicture()}>
            <FontAwesome name="circle-thin" size={95} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </Camera>
    );
  };

  const photos = users.photos.map((data, i) => {
    return (
      <View key={i} style={styles.photoContainer}>
        <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
          <FontAwesome
            name="times"
            size={20}
            color="#000000"
            style={styles.deleteIcon}
          />
        </TouchableOpacity>

        <Image source={{ uri: data }} style={styles.photo} />
      </View>
    );
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
          {CheckboxList()}

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
            <Text>{users.username}</Text>
            <Text style={styles.textButton}>Valider</Text>
          </TouchableOpacity>
          {recipeuserError && (
            <Text style={styles.error}>Cette recette existe déja</Text>
          )}

          {recipevalidate && (
            <Text style={styles.good}>Recette enregistrée</Text>
          )}
        </View>
        {/* Debut import Camera */}
        {renderCamera()}
        <View style={styles.galleryContainer}>{photos}</View>
        {/* Fin import Camera */}
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
    position: "relative",
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

  camera: {
    flex: 1,
    width: width,
    height: 200,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonCamera: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },

  galleryContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  photoContainer: {
    alignItems: "flex-end",
  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
  },
  title: {
    fontFamily: "Futura",
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
  },
  deleteIcon: {
    marginRight: 10,
  },
  text: {
    marginBottom: 15,
  },
});
