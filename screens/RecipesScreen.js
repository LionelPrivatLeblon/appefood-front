import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";

export default function RecipesScreen() {
  const recipeList = recipes.map((data, i) => {
    return <RecipeCard key={i} recipe={data} />;
  });

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Recettes</Text>
      <ScrollView>
        <View style={styles.cards}>{recipeList}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 50,
  },
  title: {
    textAlign: "center",
    color: "red",
  },
  cards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
