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

//Reducers
import { useSelector,useDispatch } from "react-redux";  
import { unfavorite, addfavorite } from "../reducers/favorites";

//On importe le tableau (cf: dataArrays ligne 35)
import { recipes } from "../data/dataArrays";


//Import librairie Icone
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Favoris({ navigation }) {

  const dispatch = useDispatch();
  

  const favorites = useSelector((state) => state.favorites.value);
  const isFavorite = favorites.some((favorite) => favorite.id === recipes.recipeId);



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

  const addFavoris = useSelector((state) => state.favorites.value);
  console.log(addFavoris);

  let fav = <Text style={{flex:1, textAlign:'center', fontSize:30,}}>Damien arrête les pâtes au beurre, et ajoute une recette ! (Autrement dis, pas de recette dans les favoris.)</Text>;
  if (addFavoris.length > 0) {
    fav = addFavoris.map((data, i) => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome style={{ color: "#ffb703" }} name="star" size={25} />
        <Text style={styles.title}>Mes favoris</Text>
        <FontAwesome style={{ color: "#ffb703" }} name="star" size={25} />
      </View>
      <ScrollView style={styles.scrollview}>{fav}</ScrollView>
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
    height: 400,
  },
  star: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
  },
});
