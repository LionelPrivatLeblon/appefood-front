import React, { useEffect, useState } from "react";

//Librairie Icone
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//Import des composants
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from "react-native";

//Import des fonctions
import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
  getRecipesByIngredientName,
} from "../data/MockDataAPI";

//Methodes Reducers
import { useDispatch, useSelector } from "react-redux";

//j'importe le tableau de données
import { recipes } from "../data/dataArrays";

//Import fonctions reducers
import { addfavorite, unfavorite, updateServings } from "../reducers/favorites";

export default function SearchScreen(props) {
  //Navigation
  const { navigation } = props;

  //Mes Etats
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  /***********************************************/
  /*              Favoris                          */
  /***********************************************/

  //Variable Favoris
  const favorites = useSelector((state) => state.favorites.value);

  // je crée ma fonction pour ajouter ou pas aux favoris
  const handleFavoritesClick = (data) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.Id === data.recipeId
    );
    // console.log("press is fav", data.recipeId);
    //je fais appelle a ma fonction créée dans le reducers

    console.log(data.recipeId);
    if (isFavorite) {
      //j'enlève des favoris
      dispatch(unfavorite(data));
    } else {
      //sinon j'ajoutes
      dispatch(addfavorite(data));
    }
  };

  let fav = favorites.map((data, i) => {
    return <renderRecipes item={data} key={i} />;
  });

  console.log(fav);

  //Cette fonction permet de générer/filtrer une recette
  const handleSearch = (text) => {
    setValue(text);
    var recipeArray1 = getRecipesByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var recipeArray3 = getRecipesByIngredientName(text);

    //La méthode concat permet de fusionner plusieurs tableaux (recipeArray1-recipeArray3)
    var aux = recipeArray1.concat(recipeArray3);
    var recipeArray = [...new Set(aux)];

    //Conditions si il n'y a rien renvoie un tableau vide sinon affiche la recette
    if (text == "") {
      setData([]);
    } else {
      setData(recipeArray);
    }
  };

  //Fonction qui permet de mettre des etoiles sur les cards
  //Item recupère juste une note, par la suite on va faire une boucle dessus afin d'afficher les étoiles
  const Generatestar = (item) => {
    // console.log(item);
    // Average evaluation
    const stars = [];
    for (let i = 0; i < 4; i++) {
      let style;
      if (i < item) {
        //Si le nombre correspond l'icone Star deviendra jaune
        style = "#f1c40f";
      } else {
        //sinon elle deviendra noir
        style = "#000000";
      }
      stars.push(<FontAwesome name="star" size={10} color={style} />);
    }
    return stars;
  };

  //Fonction pour naviguer sur la page Recipe (page : DetailRecetteScreen.js)
  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  // Fonction qui génère une carte recette
  const renderRecipes = ({ item, i }) => {
    //La méthode some() teste si au moins un élément du tableau passe le test implémenté par la fonction fournie.
    // Elle renvoie un booléen indiquant le résultat du test.
    const isFavorite = favorites.some(
      (favorite) => favorite.recipeId === item.recipeId
    );

    return (
      <TouchableHighlight
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => onPressRecipe(item)}
      >
        <View key={i} style={styles.card}>
          <Image style={styles.image} source={{ uri: item.photo_url }} />

          <View style={styles.masque}></View>
          <View style={styles.cardtop}>
            <Text style={styles.cardtitle}>{item.title}</Text>
            {/*<FontAwesome name="heart-o" size={25} color="#EE0056" />*/}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleFavoritesClick()}
            >
              <Ionicons
                onPress={() => handleFavoritesClick(item)}
                name={!isFavorite ? "bookmark-outline" : "bookmark"}
                size={30}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardbottom}>
            <Text>{getCategoryName(item.categoryId)}</Text>
            <View style={styles.star}>{Generatestar(item.voteAverage)}</View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  //C'est le return de la fonction Principale
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
      <SafeAreaView>
        <Image
          style={styles.searchIcon}
          source={require("../assets/icons/search.png")}
        />
        <TextInput
          placeholder="Saisissez un ingredient"
          onChangeText={(value) => setValue(value)}
          value={value}
          style={styles.inputtext}
        />

        {/* // c'est la croix, qui permet de vider le champs Input */}
        <Pressable onPress={() => handleSearch("")}>
          <Image
            style={styles.searchIcon}
            source={require("../assets/icons/close.png")}
          />
        </Pressable>

        {/* //C'est le boutton Generer */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleSearch(value)}
        >
          <Text style={styles.textButton}>Génerer une recette</Text>
        </TouchableOpacity>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

//C'est variable sont utilisé dans le styleSheet

// screen sizing
const { width, height } = Dimensions.get("window");

// orientation must fixed
const SCREEN_WIDTH = width - 20;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 200;
const RECIPE_ITEM_MARGIN = 5;
// 2 photos per width

/***********************************************/
/*            Styles                           */
/***********************************************/

const styles = StyleSheet.create({
  textButton: {
    color: "#FFFFFF",
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
  inputtext: {
    backgroundColor: "#F3F2F5",
    padding: 10,
    margin: 5,
    color: "D4BFBF",
    width: 200,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    width: width,
    height: height,
  },
  masque: {
    backgroundColor: "#000000",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.3,
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
  card: {
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "space-between",
    width:
      (SCREEN_WIDTH - recipeNumColums * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    margin: RECIPE_ITEM_MARGIN,
    position: "relative",
  },
  cardtop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    width:
      (SCREEN_WIDTH - recipeNumColums * RECIPE_ITEM_MARGIN) / recipeNumColums,
  },
  cardtitle: {
    width: 100,
    size: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardbottom: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    width: 160,
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width:
      (SCREEN_WIDTH - recipeNumColums * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  titrerecette: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  star: {
    flexDirection: "row",
    alignItems: "flex-end",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    width: 250,
    justifyContent: "space-around",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "grey",
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    width: 180,
    height: 50,

    marginLeft: "auto",
    marginRight: "auto",
  },
});
