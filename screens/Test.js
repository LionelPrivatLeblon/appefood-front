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
export default function Test() {
  //je crée mes etats
  const [recette, setRecette] = useState("");
  const [image, setImage] = useState(null);

  //je crée un etat pour map dessus pour afficher chaque composant de mon tableau (cf:mymoviz)

  //je crée ma fonction que je vais utiliser dans mon onPress
  //   const handlerecipe = () => {
  //     useEffect(() => {
  //       fetch("http://192.168.10.153:3000/recipes")
  //         .then((response) => response.json())
  //         .then((data) => {
  //           setMesRecettes(data.recette);
  //           console.log(data.recette);
  //         });
  //     }, []);
  //   };

  //   const myrecette = mesRecettes.map((data, i) => {
  //     return <Recette key={i} {...data}/>
  //   })
  let myRecipe = [];
  //je créé ma fonction qui va appeler ma route GET dans le backent pour afficher les recettes par ingrédients
  const handlerecipe = () => {
    fetch("http://192.168.10.147:3000/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.recipes[0].title);

        setRecette(
          data.recipes.map((APIdata, i) => {
            return (
              <View key={i}>
                <Text className="recette">{APIdata.title}</Text>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: APIdata.image }}
                />
              </View>
            );
          })
        );
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
