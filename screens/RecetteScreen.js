//import de mes composants
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";

//Import librairie Icone
import FontAwesome from "react-native-vector-icons/FontAwesome";

//import reducers
import { useDispatch, useSelector } from "react-redux";
import { addfavorite, unfavorite } from "../reducers/favorites";

//Import du tableau recipes(cf: dataArrays)
import { recipes } from "../data/dataArrays";

export default function RecipesScreen(props) {
  //Je definis mes variables
  const favorites = useSelector((state) => state.favorites.value);

  //je definis useDispatch() dans une variable
  const dispatch = useDispatch();

  // je crée ma fonction pour ajouter ou pas aux favoris
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

  //je definis une variable recipeList qui vient faire un .map sur le tableau dataArrays
  const recipeList = recipes.map((data, i) => {
    const isFavorite = favorites.some(
      (favorite) => favorite.recipeId === data.recipeId
    );

    return (
      <View key={i} style={styles.containerCard}>
        <View style={styles.star}>
          <Text style={styles.title}>{data.title}</Text>
          <FontAwesome
            onPress={() => handleFavoritesClick(data)}
            style={{ color: "#ffb703" }}
            name={!isFavorite ? "star-o" : "star"}
            size={25}
          />
        </View>
        <ImageBackground
          style={{ height: "80%", width: "100%" }}
          source={{ uri: data.photo_url }}
        />
      </View>
    );
  });
  // const recipeList = recipes.map((data, i) => {

  //   return <RecipeCard key={i} recipe={data} />;
  // });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recettes</Text>
      <ScrollView>
        <View style={styles.cards}>{recipeList}</View>
      </ScrollView>
    </View>
  );
}

/***********************************************/
/*            Styles                           */
/***********************************************/

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

  title: {
    textAlign: "center",
    color: "red",
  },
  cards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});
