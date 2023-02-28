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
import { useState } from "react";
export default function Test() {

    //je crée mes etats
  const [recette, setRecette] = useState("");
  const [image, setImage] = useState("");

  //je crée un etat pour map dessus pour afficher chaque composant de mon tableau (cf:mymoviz)

  //je créé ma fonction qui va appeler ma route GET dans le backent pour afficher les recettes par ingrédients
  const handlerecipe = () => {
    fetch("http://192.168.10.131:3000/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecette(data.recipes[0].title);
        setImage(data.recipes[0].image);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        placeholder="ingredients"
        style={styles.input}
        title="test"
      ></TextInput>
      <Button title="button" onPress={() => handlerecipe()} />
      <Text>{recette}</Text>
      <Image style={{ width: 100, height: 100 }} source={{ uri: image }} />
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
