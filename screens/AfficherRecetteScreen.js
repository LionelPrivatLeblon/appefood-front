import { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

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

  const [servingNb, setServingNb] = useState(recipe.servingNb);

  const incrementServings = () => {
    setServingNb(servingNb + 1);

    if (isFavorite) {
      dispatch(updateServings({ id: recipe.id, servingNb: servingNb + 1 }));
    }
  };

  const decrementServings = () => {
    if (servingNb > 1) {
      setServingNb(servingNb - 1);

      if (isFavorite) {
        dispatch(updateServings({ id: recipe.id, servingNb: servingNb - 1 }));
      }
    }
  };

  const handlePress = () => {
    if (isFavorite) {
      dispatch(unfavorite(recipe.id));
    } else {
      dispatch(favorite({ ...recipe, servingNb }));
    }
  };

  const ingredients = recipe.ingredients.map((ingredient, i) => {
    return (
      <View key={i} style={styles.menuContainer}>
        <View style={styles.ingredientWrapper}>
          <Text style={styles.menuSubtitle}>{ingredient.name}</Text>
          <Text style={styles.menuSubtitle}>
            {ingredient.amount * servingNb}
            {ingredient.unit && ` ${ingredient.unit}`}
          </Text>
        </View>
      </View>
    );
  });

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