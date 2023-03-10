//import de mes composants
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
} from "react-native";

import React, { useState, useEffect } from "react";

//Import librairie Icone
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//import Fonction
import { getCategoryName } from "../data/MockDataAPI";

//import reducers
import { useDispatch, useSelector } from "react-redux";
import { addfavorite, unfavorite } from "../reducers/favorites";

//Import du tableau recipes(cf: dataArrays)
import { recipes } from "../data/dataArrays";

export default function RecipesScreen(props) {
  //je definis useDispatch() dans une variable
  const dispatch = useDispatch();

  const { navigation } = props;

  /***********************************************/
  /*              Favoris                          */
  /***********************************************/

  //Je definis mes variables
  const favorites = useSelector((state) => state.favorites.value);

  // je crée ma fonction pour ajouter ou pas aux favoris
  const handleFavoritesClick = (data) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.recipeId === data.recipeId
    );

    //je fais appelle a ma fonction créée dans le reducers
    if (isFavorite) {
      //j'enlève des favoris
      dispatch(unfavorite(data));
    } else {
      //sinon j'ajoutes
      dispatch(addfavorite(data));
    }
  };

  //Fonction etoile (note)
  const Generatestar = (item) => {
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
      stars.push(
        <FontAwesome name="star" size={10} color={style} key={Math.random()} />
      );
    }
    return stars;
  };

  //Fonction pour naviguer sur la page Recipe (page : DetailRecetteScreen.js)
  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const App = () => {
    const [datadbd, setDatadbd] = useState([]);

    useEffect(() => {
      fetch("http://192.168.10.139:3000/createrecipes/displayrecette")
        .then((response) => response.json())
        .then((data) => {
          setDatadbd(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    return (
      <View>
        {datadbd.map((item, i) => (
          <TouchableHighlight
            key={i}
            underlayColor="rgba(73,182,77,0.9)"
            onPress={() => onPressRecipe(item)}
          >
            <Text>text {item}</Text>
          </TouchableHighlight>
        ))}
      </View>
    );
  };

  //je definis une variable recipeList qui vient faire un .map sur le tableau dataArrays
  const recipeList = recipes.map((data, i) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.recipeId === data.recipeId
    );

    return (
      <TouchableHighlight
        key={i}
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => onPressRecipe(data)}
      >
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: data.photo_url }} />

          <View style={styles.masque}></View>
          <View style={styles.cardtop}>
            <Text style={styles.cardtitle}>{data.title}</Text>
            {/*<FontAwesome name="heart-o" size={25} color="#EE0056" />*/}
            <TouchableOpacity style={styles.addButton}>
              <Ionicons
                onPress={() => handleFavoritesClick(data)}
                name={!isFavorite ? "heart-outline" : "heart"}
                size={30}
                color="#EE0056"
                key={Math.random()}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardbottom}>
            <Text>{getCategoryName(data.categoryId)}</Text>
            <View style={styles.star}>{Generatestar(data.voteAverage)}</View>
          </View>
        </View>
      </TouchableHighlight>
    );
  });
  // const recipeList = recipes.map((data, i) => {

  //   return <RecipeCard key={i} recipe={data} />;
  // });

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgimage}
        source={require("../assets/images/vue-dessus-cuvette-lentilles-variete-condiments-min4.jpg")}
      />
      <View style={styles.masqueCover}></View>
      <ScrollView>
        <View style={styles.cards}>{recipeList}</View>
      </ScrollView>
    </View>
  );
}

/***/
/*            Styles                           /
/**/

//C'est variable sont utilisé dans le styleSheet

// screen sizing
const { width, height } = Dimensions.get("window");

// orientation must fixed
const SCREEN_WIDTH = width - 20;

const recipeNumColums = 1;
// item size
const RECIPE_ITEM_HEIGHT = 200;
const RECIPE_ITEM_MARGIN = 5;
// 2 photos per width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 50,
  },

  containerCard: {
    width: 400,
    height: 400,
  },
  cards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
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
    width: "90%",
    height: 40,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  star: {
    flexDirection: "row",
    alignItems: "flex-end",
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

  masque: {
    backgroundColor: "#000000",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
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
});
