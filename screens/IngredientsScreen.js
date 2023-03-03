import React, { useLayoutEffect } from "react";

import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";

//Import fonction
import { getIngredientName, getAllIngredients } from "../data/MockDataAPI";

//Librairie Icone
import Ionicons from "react-native-vector-icons/Ionicons";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.ingredients;

  //Tout les ingredients utitlisés dans la recette sont stockés dans la variable 'ingredientsArray'
  const ingredientsArray = getAllIngredients(item);

  const renderIngredient = ({ item }) => (
    <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
      <Text style={styles.title}>{item[0].name}</Text>
      <Text style={{ color: "grey" }}>{item[1]}</Text>
    </View>
  );

  //return de la fonction Principale
  // safeAreaView c'est la barre de l'heure et de batterie ce qui permet de garder cette zone intact
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={25} color="#655074" />
      </TouchableOpacity>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={ingredientsArray}
        renderItem={renderIngredient}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </SafeAreaView>
  );
}

/***********************************************/
/*            Styles                           */
/***********************************************/

// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT + 60,
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: "black",
    fontSize: 13,
    textAlign: "center",
  },
  photo: {
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60,
  },
});
