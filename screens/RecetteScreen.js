//import de mes composants
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";

//Import du tableau recipes(cf: dataArrays)
import { recipes } from "../data/dataArrays";

export default function RecipesScreen() {
  //je definis une variable recipeList qui vient faire un .map sur le tableau dataArrays
  const recipeList = recipes.map((data, i) => {
    return <RecipeCard key={i} recipe={data} />;
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
