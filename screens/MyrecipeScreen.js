import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

export default function MyRecipeScreen({ navigation }) {
  const newuser = useSelector((state) => state.users.value);
  const favorites = useSelector((state) => state.favorites.value);

  const recipeList = favorites.map((data, i) => {
    return <RecipeCard key={i} recipe={data} isFavorite />;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recettes de {newuser.username}</Text>
      <ScrollView style={styles.scrollview}>
        <View style={styles.cards}>{recipeList}</View>
      </ScrollView>
    </View>
  );
}
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: windowWidth / 1,
  },
  scrollview: {
    flexDirection: "row",
    display: "flex",
    with: "100%",
  },
  title: {
    textAlign: "center",
    paddingTop: 50,
  },
  input: {
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "00ffff",
  },
});
