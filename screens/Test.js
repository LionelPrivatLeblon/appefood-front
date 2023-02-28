import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
//j'importe useDispatch pour récupérer les valeurs de mon API lors du click et les envoyé dans mon reducers

import { dataRecette } from "../reducers/recettes";
//j'importe ma fonction créée dans le reducer

export default function Test({ navigation }) {
  //je crée mes etats
  //je crée un etat pour map dessus pour afficher chaque composant de mon tableau (cf:mymoviz)
  const [recette, setRecette] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  let myRecipe = [];

  // je crée ma fonction que je vais utiliser dans mon onPress
  const handlerecipe = () => {
    navigation.navigate("Recipe");

    // fetch("http://192.168.10.153:3000/recipes")
    //   //je fetch ma fonction qui va appeler ma route GET dans le backent pour afficher les recettes par ingrédients
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data.recipes[0].title);

    //     setRecette(
    //       //je fais un map pour afficher le nb de recette que j'ai déterminée dans mon URL
    //       data.recipes.map((APIdata, i) => {
    //         return (
    //           <View key={i}>
    //             <Text className="recette">{APIdata.title}</Text>
    //             <Image
    //               style={{ width: 100, height: 100 }}
    //               source={{ uri: APIdata.image }}
    //             />
    //           </View>
    //         );
    //       })
    //     );
    //   });
    // dispatch(dataRecette(recette));
    // navigation.navigate("Recipe");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        placeholder="ingredients"
        style={styles.input}
        title="test"
      ></TextInput>
      <Button title="button" onPress={() => handlerecipe()} />
      <Text></Text>
    </KeyboardAvoidingView>
  );
}

//feuille de style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
