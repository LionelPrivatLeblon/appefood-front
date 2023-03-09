import React, { useRef, useState } from "react";

import { ingredients } from "../data/dataArrays";

import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import {
  getIngredientName,
  getCategoryName, //Recupère par nom d'ingrédient
  getCategoryById, //recupère par ID d'ingredient
} from "../data/MockDataAPI";
//Fonction qui sont importer de MockdataAPI

//librairie Icon
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
  //fonction note étoilées
  const Generatestar = (note) => {
    // console.log(item);
    // Average evaluation
    const stars = [];
    for (let i = 0; i < 4; i++) {
      let style;
      if (i < note) {
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

  //Ici on appelle tous nos ingrédients en faisant un .map, (cf: dataArrays ligne 367)
  const Displayingredient = item.ingredients.map((ingredient, i) => {
    let name;
    let photo;
    ingredients.map((daterecipe) => {
      if (daterecipe.ingredientId === ingredient[0]) {
        name = daterecipe.name;
        photo = daterecipe.photo_url;
      }
    });
    return (
      <View style={styles.cardIngredient}>
        <Image style={styles.photo} source={{ uri: photo }} />
        <Text style={styles.title}>{name}</Text>
      </View>
    );
  });

  //Tout les ingredients utitlisés dans la recette sont stockés dans la variable 'ingredientsArray'

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  // Ici c'est le return de la fonction principale
  return (
    <ImageBackground
      source={require("../assets/images/vue-dessus-cuvette-lentilles-variete-condiments-min.jpg")}
      style={styles.background}
    >
      <ScrollView style={styles.infoRecipeContainer}>
        <View>
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
            onSnapToItem={() => setActiveSlide(0)}
          />
        </View>
        <View>
          <View style={styles.infoContainer}>
            <View style={styles.infoIcone}>
              {/* //goBack c'est une fonction natif qui permet de retourner à la page précédente */}
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={25} color="#7D4FB8" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoIcone}>
              <Text style={styles.category}>
                {getCategoryName(item.categoryId).toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.infoRecipeName}>{item.title}</Text>

          {/* // Icone de temps */}
          <View style={styles.infoContainer}>
            <View style={styles.infoIcone}>
              {/*notes étoilées*/}
              <View style={styles.stars}>{Generatestar(item.voteAverage)}</View>
              <Text style={styles.noteText}> {item.voteAverage}/4 </Text>
            </View>
            <View style={styles.infoIcone}>
              <Ionicons name="happy-outline" size={30} color={"#7D4FB8"} />
              <Text style={styles.infoRecipe}>
                {item.servingNb} Personne{item.servingNb > 1 ? "s" : ""}{" "}
              </Text>
            </View>
            <View style={styles.infoIcone}>
              <Ionicons name="alarm-outline" size={30} color={"#7D4FB8"} />
              <Text style={styles.infoRecipe}>{item.time} minutes </Text>
            </View>
          </View>

          <View style={styles.cardIngredientbox}>{Displayingredient}</View>

          <View>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");
/***********************************************/
/*             Styles                           */
/***********************************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    width: "100%",
    height: "100%",
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
    width: 4,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 0,
    backgroundColor: "#7D4FB8",
  },
  infoRecipeContainer: {
    backgroundColor: "rgba(	255, 255, 255, 0.8)",
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
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#7D4FB8",
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
    color: "#000000",
    textAlign: "center",
  },
  container: { flex: 1, backgroundColor: "white" },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },

  infoContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7D4FB8",
  },
  infoIcone: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    textAlign: "center",
    fontSize: 8,
  },
  stars: {
    flexDirection: "row",
    height: 15,
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: "black",
    fontSize: 13,
    textAlign: "center",
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  cardIngredientbox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  cardIngredient: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
});
