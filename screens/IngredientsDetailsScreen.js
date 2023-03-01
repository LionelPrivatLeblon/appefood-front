import React, { useLayoutEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getIngredientName, getAllIngredients } from "../data/MockDataAPI";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.ingredients;
  const ingredientsArray = getAllIngredients(item);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const onPressIngredient = (item) => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const renderIngredient = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressIngredient(item[0])}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: "grey" }}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={ingredientsArray}
        renderItem={renderIngredient}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}

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
