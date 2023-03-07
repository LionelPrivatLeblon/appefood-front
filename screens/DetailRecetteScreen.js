import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import {
  getIngredientName,
  getCategoryName, //Recupère par nom d'ingrédient
  getCategoryById, //recupère par ID d'ingredient
} from "../data/MockDataAPI";
//Fonction qui sont importer de MockdataAPI

import ViewIngredientsButton from "../components/ViewIngredientsButton/ViewIngredientsButton";

//reducer
import { favorite, unfavorite, updateServings } from "../reducers/favorites";

//librairie Icon
import Ionicons from "react-native-vector-icons/Ionicons";

//Outil du reducer
import { useDispatch, useSelector } from "react-redux";

//Pour récupérer la largeur de l'ecran de l'utilisateur
const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  //recupère des informations via le route params
  const item = route.params?.item;

  //On définit nos fonctions dans des variables
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);
  const [activeSlide, setActiveSlide] = useState(0);
  const slider1Ref = useRef();
  const dispatch = useDispatch();

  //Pour le favoris
  const favorites = useSelector((state) => state.favorites.value);
  const isFavorite = favorites.some(
    (favorite) => favorite.id === item.recipeId
  );


  //Ici on appelle tous nos ingrédients en faisant un .map, (cf: dataArrays ligne 367)
  const ingredients = item.ingredients.map((ingredient, i) => {
    return (
      <View key={i} style={styles.menuContainer}>
        <View style={styles.ingredientWrapper}>
          <Text style={styles.menuSubtitle}>{ingredient[0]}</Text>
        </View>
      </View>
    );
  });

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  // Ici c'est le return de la fonction principale
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={500}
          autoplayLoop
          index={0}
          showPagination
          data={item.photosArray}
          renderItem={renderImage}
          ref={slider1Ref}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          firstItem={0}
          loop={false}
          autoplayInterval={3000}
          onSnapToItem={(index) => setActiveSlide(0)}
        />
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>

        {/* //goBack c'est une fonction natif qui permet de retourner à la page précédente */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={25} color="#655074" />
        </TouchableOpacity>

        {/* //Boutton Favoris */}
        <TouchableOpacity style={styles.addButton} onPress={addbookmark}>
          <Ionicons
            name={isFavorite ? "bookmark" : "bookmark-outline"}
            size={30}
            color="red"
          />
        </TouchableOpacity>

        {/* <View style={styles.infoContainer}>



        {/* <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("RecipesList", { category, title })
            }
          >
            <Text style={styles.category}>
              {getCategoryName(item.categoryId).toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View> */}
        <Text style={styles.category}>
          {getCategoryName(item.categoryId).toUpperCase()}
        </Text>

        {/* // Icone de temps */}
        <View style={styles.infoContainer}>
          <Image
            style={styles.infoPhoto}
            source={require("../assets/icons/time.png")}
          />
          <Text style={styles.infoRecipe}>{item.time} minutes </Text>
        </View>

        {/* // Bouton voir ingredients */}
        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            onPress={() => {
              let ingredients = item.ingredients;
              let title = "Ingredients for " + item.title;
              navigation.navigate("IngredientsDetails", {
                ingredients,
                title,
              });
            }}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {ingredients}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");
/***********************************************/
/*             Styles                           */
/***********************************************/

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: 250,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    width: viewportWidth,
    height: 250,
  },
  paginationContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 8,
    marginTop: 200,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0,
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    color: "#2cd18a",
  },
  infoDescriptionRecipe: {
    textAlign: "left",
    fontSize: 16,
    marginTop: 30,
    margin: 15,
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  container: { flex: 1, backgroundColor: "white" },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },
});
