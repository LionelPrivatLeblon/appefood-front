import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import { useState, useEffect, useRef } from "react";
export default function Home({ navigation }) {
  //je crée mes etats
  const [recette, setRecette] = useState("");
  const legumes = ["Tomate", "Salade", "Carotte", "Haricot"];

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
    fetch("http://192.168.10.161:3000/recipes")
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
      <SelectDropdown
        data={legumes}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
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
      <View style={styles.box}>
        <ScrollView style={styles.scroll}>{recette}</ScrollView>
      </View>
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
  masque: {
    backgroundColor: "#000000",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  card: {
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    height: 300,
    margin: 5,
    position: "relative",
  },
  cardtop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    width: 300,
  },
  cardtitle: {
    width: 150,
    size: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardbottom: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    width: 280,
    height: 80,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: 300,
    height: 300,
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
  scroll: {},
  box: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 290,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    marginBottom: 20,
  },
});
