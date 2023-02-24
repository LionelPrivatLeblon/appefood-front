import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RecipeCard({ recipe, isFavorite }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Recipe", { recipe, isFavorite })}
    >
      <View style={{ ...styles.wrapper }}>
        <Image
          source={recipe.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.subtitle}>{recipe.desc}</Text>
      </View>
    </TouchableOpacity>
  );
}
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: windowWidth / 3 - 10,
    maxHeight: 250,
  },
  wrapper: {
    display: "flex",
    alignItems: "flex-end",
    padding: 10,
    height: "100%",
    backgroundColor: "#f1f1f1",
  },
  image: {
    width: "95%",
    maxHeight: 150,
    alignSelf: "center",
  },
});
