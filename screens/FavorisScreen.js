import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

//Reducers
import { useSelector, useDispatch } from "react-redux";
import { unfavorite, addfavorite } from "../reducers/favorites";

//On importe le tableau (cf: dataArrays ligne 35)
import { recipes } from "../data/dataArrays";

//Import librairie Icone
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//import des fonctions

import { getCategoryName } from "../data/MockDataAPI";

export default function Favoris({ navigation }) {
  const dispatch = useDispatch();

  //Fonction pour naviguer sur la page Recipe (page : DetailRecetteScreen.js)
  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  /***********************************************/
  /*              Favoris                          */
  /***********************************************/

  //On utilise useSelector pour afficher la valeur qui dans notre reducer
  const favorites = useSelector((state) => state.favorites.value);

  //La méthode some() teste si au moins un élément du tableau passe le test implémenté par la fonction fournie.
  // Elle renvoie un booléen indiquant le résultat du test.
  const isFavorite = favorites.some(
    (favorite) => favorite.id === recipes.recipeId
  );

  const handleFavoritesClick = (data) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.recipeId === data.recipeId
    );
    // console.log("press is fav", data.recipeId);

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

  const addFavoris = useSelector((state) => state.favorites.value);
  //console.log(addFavoris);

  let fav = (
    <Text
      style={{ flex: 1, textAlign: "center", fontSize: 30, color: "#FFFFFF" }}
    >
      Pas de Recette enregistrée en Favoris
    </Text>
  );
  if (addFavoris.length > 0) {
    fav = addFavoris.map((data, i) => {
      return (
        <TouchableHighlight
          underlayColor="rgba(73,182,77,0.9)"
          onPress={() => onPressRecipe(data)}
        >
          <View key={i} style={styles.card}>
            <Image style={styles.image} source={{ uri: data.photo_url }} />

            <View style={styles.masque}></View>
            <View style={styles.cardtop}>
              <Text style={styles.cardtitle}>{data.title}</Text>
              {/*<FontAwesome name="heart-o" size={25} color="#EE0056" />*/}
              <TouchableOpacity style={styles.addButton}>
                <Ionicons
                  onPress={() => handleFavoritesClick(data)}
                  name={!isFavorite ? "bookmark-outline" : "bookmark"}
                  size={30}
                  color="#ffffff"
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
  }

  //Ici je créer une variable favRecipes et je fais un .map sur mon tableau de recipes(cf: dataArrays ligne 35)
  // const favRecipes = recipes.map((data, i) => {
  //   // console.log(data.title);

  //   //Ici c'est le return pour une card
  //   return (
  //     <View key={i} style={styles.containerCard}>
  //       <View style={styles.star}>
  //         <Text style={styles.title}>{data.title}</Text>
  //         <FontAwesome style={{ color: "#ffb703" }} name="star" size={25} />
  //       </View>
  //       <ImageBackground
  //         style={{ height: "80%", width: "100%" }}
  //         source={{ uri: data.photo_url }}
  //       />
  //     </View>
  //   );
  // });

  // Ici c'est le return de la fonction Principale
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/images/vue-dessus-cuvette-lentilles-variete-condiments-min.jpg")}
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Mes Recettes favorites</Text>
          </View>
          <ScrollView style={styles.scrollview}>{fav}</ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
const RECIPE_ITEM_MARGIN = 20;
// 2 photos per width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(	0, 0, 0, 0.6)",
  },

  background: {
    width: "100%",
    height: "100%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  textHeader: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },

  message: {
    fontSize: 30,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 10,
    width: "80%",
    marginTop: 200,
    margin: 35,
    textAlign: "center",
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "10%",
    marginLeft: 10,
    marginRight: 10,
  },

  scrollview: {
    flex: 1,
    maxHeight: "85%",
    marginBottom: "-15%",
    textAlign: "center",
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
    opacity: 0.3,
  },

  containerCard: {
    height: 400,
  },
  star: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
});
