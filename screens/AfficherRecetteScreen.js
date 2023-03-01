import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function AfficherRecetteScreen({ route }) {

  const exempleRecettte = [
    {
      title: "Pâte au beurre",
      image: " il y aura une image ici",
  },
  {
    title: "Pâte au sel",
    image: " il y aura une image ici",
},
{
  title: "Pâte au poivre",
  image: " il y aura une image ici",
},
{
  title: "Pâte à la mayonnaise",
  image: " il y aura une image ici",
},
{
  title: "Pâte au ketchup",
  image: " il y aura une image ici",
},

  ]

  const film = moviesData.map((data, i) => {
    return <View key={i} poster ={data.poster} title={data.title} overview={data.overview} voteAverage={data.voteAverage} voteCount={data.voteCount}/>
   })

  return (
    <View style={styles.container}>
      {film}
    </View>
  );
}


/***********************************************/
/*            Styles                           */
/***********************************************/

const styles = StyleSheet.create({
  container :{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  }
})