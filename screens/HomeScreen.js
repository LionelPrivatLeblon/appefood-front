import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState, useEffect, FC } from "react";
export default function Home({ navigation }) {
  //je crée mes etats
  const [recette, setRecette] = useState("");
  const [image, setImage] = useState(null);

  const [dropdownTop, setDropdownTop] = useState(0);

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
    navigation.navigate("Recipe")
    // fetch("http://192.168.10.147:3000/recipes")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.recipes[0].title);

    //     setRecette(
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
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        placeholder="ingredients"
        style={styles.input}
        title="test"
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => handlerecipe()}
        //onPress={() => connexionUser()}
      >
        <Text style={styles.textButton}>Génerer une recette</Text>
      </TouchableOpacity>
      <Text>{recette}</Text>
    </KeyboardAvoidingView>
  );
}

/***********************************************/
/*            Styles                           */
/***********************************************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
    textAlign: "center",
  },
  textButton2: {
    color: "#7D4FB8",
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
  button2: {
    backgroundColor: "#FFFFFF",

    borderWidth: 5,
    borderColor: "#7D4FB8",
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
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
