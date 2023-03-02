import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { recipes } from "../data/dataArrays";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Favoris({ navigation }) {
  const newuser = useSelector((state) => state.users.value);
  const favorites = useSelector((state) => state.favorites.value);

  const favRecipes = recipes.map((data, i) => {
    console.log(data.title);
    return (
      <View style={styles.containerCard}>
        <View style={styles.star}>
          <Text style={styles.title}>{data.title}</Text>
          <FontAwesome style={{ color: "#ffb703" }} name="star" size={25} />
        </View>
        <ImageBackground
          style={{ height: "80%", width: "100%" }}
          source={{ uri: data.photo_url }}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome style={{ color: "#ffb703" }} name="star" size={25} />
        <Text style={styles.title}>Mes favoris</Text>
        <FontAwesome style={{ color: "#ffb703" }} name="star" size={25} />
      </View>
      <ScrollView style={styles.scrollview}>{favRecipes}</ScrollView>
    </View>
  );
}
const windowWidth = Dimensions.get("window").width;

/***********************************************/
/*            Styles                           */
/***********************************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
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

  cards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },

  containerCard: {
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "red",
  },
  star: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
});
