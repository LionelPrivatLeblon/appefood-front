import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
//import Carousel, { Pagination } from "react-native-snap-carousel";
//import Carousel, { Pagination } from "react-native-reanimated-carousel";
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from "../data/MockDataAPI";
import ViewIngredientsButton from "../components/ViewIngredientsButton/ViewIngredientsButton";
import { favorite, unfavorite, updateServings } from "../reducers/favorites";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);
  const isFavorite = favorites.some(
    (favorite) => favorite.id === item.recipeId
  );

  const addbookmark = () => {
    console.log("test " + item.recipeId);
    console.log("test " + { ...item });
    if (isFavorite) {
      dispatch(unfavorite(item.recipeId));
    } else {
      //dispatch(favorite({ ...item }));
    }
  };

  const ingredients = item.ingredients.map((ingredient, i) => {
    return (
      <View key={i} style={styles.menuContainer}>
        <View style={styles.ingredientWrapper}>
          <Text style={styles.menuSubtitle}>{ingredient[0]}</Text>
        </View>
      </View>
    );
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={25} color="#655074" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={addbookmark}>
          <Ionicons
            name={isFavorite ? "bookmark" : "bookmark-outline"}
            size={30}
            color="red"
          />
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("RecipesList", { category, title })
            }
          >
            <Text style={styles.category}>
              {getCategoryName(item.categoryId).toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.infoContainer}>
          <Image
            style={styles.infoPhoto}
            source={require("../assets/icons/time.png")}
          />
          <Text style={styles.infoRecipe}>{item.time} minutes </Text>
        </View>

        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            onPress={() => {
              let ingredients = item.ingredients;
              let title = "Ingredients for " + item.title;
              navigation.navigate("IngredientsDetails", {
                ingredients,
                title,
              });
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {ingredients}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: 250,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    width: viewportWidth,
    height: 250,
  },
  paginationContainer: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    paddingVertical: 8,
    marginTop: 200,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0,
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 10,
    color: "#2cd18a",
  },
  infoDescriptionRecipe: {
    textAlign: "left",
    fontSize: 16,
    marginTop: 30,
    margin: 15,
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});
