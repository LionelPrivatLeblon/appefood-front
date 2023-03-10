import { StatusBar } from "expo-status-bar";

//Import des composants
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

//Expo
import * as ImagePicker from "expo-image-picker";

//librairy Icon
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

//Import etat
import React, { useState, useEffect, useRef } from "react";

//Import Reducers
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, removePhoto } from "../reducers/users";
import { addRecipeToStore } from "../reducers/createrecipe";

export default function Createrecipe(props) {
  const { navigation, route } = props;
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

  const [image, setImage] = useState(null);

  const [recipeingredient, setRecipeingredient] = useState([
    { ingredientId: 0, name: "Huile", isChecked: false },
    { ingredientId: 1, name: "Sel", isChecked: false },
    { ingredientId: 2, name: "Pomme de terre Russet", isChecked: false },
    { ingredientId: 3, name: "Paprika", isChecked: false },
    { ingredientId: 4, name: "Poivre Noir", isChecked: false },
    { ingredientId: 5, name: "Sel de c??leri", isChecked: false },
    { ingredientId: 6, name: "Sauge s??ch??e", isChecked: false },
    { ingredientId: 7, name: "Ail en poudre", isChecked: false },
    { ingredientId: 8, name: "??pice moulu", isChecked: false },
    { ingredientId: 9, name: "Gr??gano s??ch??", isChecked: false },
    { ingredientId: 10, name: "Basilic s??ch??", isChecked: false },
    { ingredientId: 11, name: "Marjolaine s??ch??", isChecked: false },
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
    { ingredientId: 22, name: "Oignon hach??", isChecked: false },
    { ingredientId: 23, name: "P??te de tomate", isChecked: false },
    { ingredientId: 24, name: "Poudre de chili", isChecked: false },
    { ingredientId: 25, name: "B??uf hach??", isChecked: false },
    {
      ingredientId: 26,
      name: "Haricots rouges rinc??s et ??goutt??s",
      isChecked: false,
    },
    { ingredientId: 27, name: "Grande tortilla", isChecked: false },
    { ingredientId: 28, name: "Firtos", isChecked: false },
    { ingredientId: 29, name: "cheddar r??p??", isChecked: false },
    { ingredientId: 30, name: "Chaux", isChecked: false },
    { ingredientId: 31, name: "Cumin en poudre", isChecked: false },
    { ingredientId: 32, name: "Poivre de cayenne", isChecked: false },
    { ingredientId: 33, name: "Poisson blanc feuillet??", isChecked: false },
    { ingredientId: 34, name: "Avocat", isChecked: false },
    { ingredientId: 35, name: "Piment rouge", isChecked: false },
    { ingredientId: 36, name: "Oignons", isChecked: false },
    { ingredientId: 37, name: "Poivron vert", isChecked: false },
    { ingredientId: 38, name: "Poivron rouge", isChecked: false },
    { ingredientId: 39, name: "P??te ?? pizza", isChecked: false },
    { ingredientId: 40, name: "Ketchup", isChecked: false },
    { ingredientId: 41, name: "Sauce piquante", isChecked: false },
    { ingredientId: 42, name: "Beurre", isChecked: false },
    { ingredientId: 43, name: "Cr??me ??paisse", isChecked: false },
    { ingredientId: 44, name: "Yaourt au lait entier", isChecked: false },
    { ingredientId: 45, name: "Fromage", isChecked: false },
    { ingredientId: 46, name: "Mozzarella", isChecked: false },
    { ingredientId: 47, name: "branches de c??leri", isChecked: false },
    { ingredientId: 48, name: "Parmesan", isChecked: false },
    { ingredientId: 49, name: "Pancetta", isChecked: false },
    { ingredientId: 40, name: "Spaghetti", isChecked: false },
    { ingredientId: 51, name: "Ail", isChecked: false },
    { ingredientId: 52, name: "Lasagne", isChecked: false },
    { ingredientId: 53, name: "Sauce italienne", isChecked: false },
    { ingredientId: 54, name: "Tomate ??cras??e", isChecked: false },
    { ingredientId: 55, name: "Sucre", isChecked: false },
    { ingredientId: 56, name: "persil frais hach??", isChecked: false },
    { ingredientId: 57, name: "Ricotta", isChecked: false },
    { ingredientId: 58, name: "Graine de fenouil", isChecked: false },
    { ingredientId: 59, name: "Bannane", isChecked: false },
    { ingredientId: 60, name: "Fraise congel??e", isChecked: false },
    { ingredientId: 61, name: "Yaourt ?? la grecque", isChecked: false },
  ]);

  //Fonction SignUP
  const recipeRegister = () => {
    const ingredients = recipeingredient
      .filter((e) => e.isChecked)
      .map((e) => e.ingredientId);
    fetch("https://appefood-back-eight.vercel.app/createrecipes/newrecipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //Je recup??re les valeurs des etats cr??es en haut

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
          //erreur qui s'affiche si username est deja enregistr?? en base de donn??e
          setRecipeUserError(true);

          // efface les autres messages d'erreur
          setRecipeValidate();
          // Vide les champs de saisie
        }
      });
  };

  const displayIngredient2 = () =>
    fetch("https://appefood-back-eight.vercel.app/createrecipes/displayrecette")
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
          {recipeingredient.map((item, i) => (
            <BouncyCheckbox
              style={styles.blocingredient}
              text={item.name}
              disableBuiltInState
              isChecked={item.isChecked}
              onPress={() => handleCheckboxPress(item.ingredientId)}
              size={20}
              fillColor="#D4BFBF"
              unfillColor="#ffffff"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 1 }}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  /***********************************************/
  /*    Import Image depuis Galerie              */
  /***********************************************/

  const pickImage = async () => {
    const formData = new FormData();
    // No permissions request is necessary for launching the image library
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    formData.append("photoOfGallery", {
      uri: image.assets[0].uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    fetch("https://appefood-back-eight.vercel.app/image", {
      method: "POST",
      body: formData,
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addPhoto(data.url));
      })
      .catch((error) => console.log(error));

    if (!image.canceled) {
      setImage(image.assets[0].uri);
    }
  };

  //

  //return fonction Principale
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <Image
          style={styles.bgimage}
          source={require("../assets/images/vue-dessus-cuvette-lentilles-variete-condiments-min4.jpg")}
        />
        <View style={styles.masqueCover}></View>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={25} color="#7D4FB8" />
          </TouchableOpacity>
          <View style={styles.containersignin}>
            <Text style={styles.formtitle}>Cr??ation de la recette :</Text>

            <TextInput
              placeholder="Nom de la recette"
              onChangeText={(value) => setRecipetitle(value)}
              value={recipetitle}
              style={styles.inputtext}
            />

            <TextInput
              placeholder="Nom de la cat??gorie"
              onChangeText={(value) => setRecipecategoryId(value)}
              value={recipecategoryId}
              style={styles.inputtext}
            />

            <TextInput
              placeholder="Nombre de personne"
              onChangeText={(value) => setRecipeservingNb(value)}
              value={recipeservingNb}
              style={styles.inputtext}
            />

            <TextInput
              placeholder="Note"
              onChangeText={(value) => setRecipevoteAverage(value)}
              value={recipevoteAverage}
              style={styles.inputtext}
            />

            <TextInput
              placeholder="Photo ?? la une"
              onChangeText={(value) => setRecipephotoUrl(value)}
              value={recipephotoUrl}
              style={styles.inputtext}
            />

            <TextInput
              placeholder="Temps de pr??paration"
              onChangeText={(value) => setRecipeTime(value)}
              value={recipetime}
              style={styles.inputtext}
            />

            <View>
              <Button
                title="Ajoutez une image ?? votre recette !"
                onPress={pickImage}
              />
              {image && (
                <Image
                  source={{ url: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>

            <Text style={{ color: "#FFF" }}>
              Selectionnez vos Ingredients :
            </Text>
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
              <Text style={styles.textButton}>Valider</Text>
            </TouchableOpacity>
            {recipeuserError && (
              <Text style={styles.error}>Cette recette existe d??ja</Text>
            )}

            {recipevalidate && (
              <Text style={styles.good}>Recette enregistr??e</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
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
    opacity: 0.9,
  },
  blocingredient: {
    width: "40%",
    height: 20,
    color: "#FFFFFF",
    margin: 2,
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
  sectionCheckbox: {
    height: 20,
  },
});
