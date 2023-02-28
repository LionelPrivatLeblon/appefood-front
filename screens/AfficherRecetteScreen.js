import { View, Text } from "react-native";
import React from "react";

export default function AfficherRecetteScreen({ route }) {
  console.log(route.params);
  return (
    <View>
      <Text>AfficherRecetteScreen</Text>
    </View>
  );
}
