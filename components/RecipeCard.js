import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import de la librairie FontAwesome

//import { recipe } from "../data/dataArrays";

export default function RecipeCard({ recipe, isFavorite }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("TabNavigator", { screen: "Recipe" })}
    >
      <View style={{ ...styles.wrapper }}>
        <View style={styles.head}>
          <Text style={styles.title}>{recipe.name}</Text>
          <FontAwesome style={{ color: "#ffb703" }} name="star-o" size={25} />
        </View>
        <Image
          source={recipe.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>{recipe.desc}</Text>
      </View>
    </TouchableOpacity>
  );
}
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    maxHeight: 250,
  },
  wrapper: {
    padding: 10,
    height: "100%",
    backgroundColor: "#f1f1f1",
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  image: {
    width: "95%",
    maxHeight: 150,
    alignSelf: "center",
    padding: 15,
  },

  subtitle: {
    fontStyle: "italic",
    fontSize: 15,
  },
});
