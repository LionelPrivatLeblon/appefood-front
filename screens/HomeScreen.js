import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  getCategoryName,
  getRecipesByRecipeName,
  getRecipesByCategoryName,
  getRecipesByIngredientName,
} from "../data/MockDataAPI";

import { useDispatch, useSelector } from "react-redux";

import { favorite, unfavorite, updateServings } from "../reducers/favorites";

export default function SearchScreen(props) {
  const { navigation } = props;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);
  const isFavorite = favorites.some((favorite) => favorite.id === item.id);

  useEffect(() => {}, [value]);

  const handleSearch = (text) => {
    setValue(text);
    var recipeArray1 = getRecipesByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var recipeArray3 = getRecipesByIngredientName(text);
    var aux = recipeArray1.concat(recipeArray3);
    var recipeArray = [...new Set(aux)];

    if (text == "") {
      setData([]);
    } else {
      setData(recipeArray);
    }
  };

  const handlePress = () => {
    if (isFavorite) {
      dispatch(unfavorite(item.id));
    } else {
      dispatch(favorite({ ...item, servingNb }));
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item, i }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View key={i} style={styles.card}>
        <Image style={styles.image} source={{ uri: item.photo_url }} />
        <View style={styles.masque}></View>
        <View style={styles.cardtop}>
          <Text style={styles.cardtitle}>{item.title}</Text>
          <FontAwesome name="heart" size={25} color="#EE0056" />
        </View>
        <View style={styles.cardbottom}>
          <Text>{getCategoryName(item.categoryId)}</Text>
          <View style={styles.star}>
            <FontAwesome name="star" size={10} color="#e8be4b" />
            <FontAwesome name="star" size={10} color="#e8be4b" />
            <FontAwesome name="star" size={10} color="#e8be4b" />
            <FontAwesome name="star" size={10} color="#e8be4b" />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <Image
          style={styles.searchIcon}
          source={require("../assets/icons/search.png")}
        />
        <TextInput
          placeholder="Saisissez un ingredient"
          onChangeText={(value) => setValue(value)}
          value={value}
          style={styles.inputtext}
        />
        <Pressable onPress={() => handleSearch("")}>
          <Image
            style={styles.searchIcon}
            source={require("../assets/icons/close.png")}
          />
        </Pressable>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => handleSearch(value)}
          //onPress={() => connexionUser()}
        >
          <Text style={styles.textButton}>Génerer une recette</Text>
        </TouchableOpacity>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 200;
const RECIPE_ITEM_MARGIN = 3;

// 2 photos per width
const styles = StyleSheet.create({
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#7D4FB8",
    width: 225,
    height: 59,
    borderRadius: 31,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputtext: {
    backgroundColor: "#F3F2F5",
    padding: 10,
    margin: 5,
    color: "D4BFBF",
    width: 200,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  masque: {
    backgroundColor: "#000000",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.3,
  },
  card: {
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "space-between",
    width:
      (SCREEN_WIDTH - recipeNumColums * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    margin: RECIPE_ITEM_MARGIN,
    position: "relative",
  },
  cardtop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    width:
      (SCREEN_WIDTH - recipeNumColums * RECIPE_ITEM_MARGIN) / recipeNumColums,
  },
  cardtitle: {
    width: 100,
    size: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardbottom: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    width: 180,
    height: 80,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width:
      (SCREEN_WIDTH - recipeNumColums * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  titrerecette: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  star: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
