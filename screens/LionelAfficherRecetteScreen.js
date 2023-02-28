import { useSelector } from "react-redux";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DisplayRecipeScreen() {
  const newuser = useSelector((state) => state.users.value);
  const recipesData = [
    {
      id: 1,
      name: "Pork Ramen",
      desc: "A Japanese classic",
      image: require("../assets/images/ramen.png"),
      color: "#FFEB85",
      serving: "1 bowl (500 - 600G)",
      servingNb: 1,
      longDesc:
        "Made with love and fresh ingredients to bring a touch of Japan to your table.",
      level: "difficult",
      time: "2 hours",
      rating: 4.8,
      ingredients: [
        { name: "Ramen noodles", amount: 400, unit: "g" },
        { name: "Egg", amount: 1, unit: "" },
        { name: "Miso", amount: 1, unit: "spoonful" },
        { name: "Marinated pork slices", amount: 2, unit: "slices" },
        { name: "Garlic", amount: 2, unit: "cloves" },
        { name: "Carrots", amount: 3, unit: "" },
        { name: "Celery", amount: 1, unit: "stalk" },
        { name: "Spring onions", amount: 4, unit: "" },
        { name: "Coriander", amount: 0.5, unit: "tablespoons" },
        { name: "Cumin", amount: 1, unit: "pinch" },
        { name: "Pink peppercorn", amount: 0.5, unit: "tablespoons" },
        { name: "Bay leaf", amount: 1, unit: "" },
        { name: "Boiling water", amount: 2, unit: "litres" },
      ],
    },
  ];

  const dataList = recipesData.map((data) => {
    console.log(data);

    const ingredients = data.ingredients.map((ingredient, i) => {
      return (
        <View key={i} style={styles.menuIngredient}>
          <Text>{ingredient.name}</Text>
          <Text>{ingredient.amount}</Text>
          <Text>{ingredient.unit}</Text>
        </View>
      );
    });

    return (
      <View>
        <Text>{data.name}</Text>
        <Image source={data.image} style={styles.photos}></Image>
        <View style={styles.menuRating}>
          <Text>{data.rating}</Text>
          <FontAwesome name="star" size={10} color="#e8be4b" />
          <Text>{data.level}</Text>
          <Text>{data.time}</Text>
        </View>
        <Ionicons name="ios-arrow-back" size={25} color="#655074" />

        <Text>{data.longDesc}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {ingredients}
        </ScrollView>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text>{newuser.username}</Text>
      <Button
        style={styles.red}
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
      <View>{dataList}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  photos: {
    width: "100%",
    height: 300,
  },
  menuIngredient: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  menuRating: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
