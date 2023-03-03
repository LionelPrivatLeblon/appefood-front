import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";

/*Installation Navigation*/
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";

//Import des Screens
import Login from "./screens/LoginScreen";
import Favoris from "./screens/FavorisScreen";
import Recipes from "./screens/RecetteScreen";
import Recipe from "./screens/DetailRecetteScreen";
import Profile from "./screens/ProfileScreen";
import Home from "./screens/HomeScreen";
import IngredientsDetailsScreen from "./screens/IngredientsScreen";

//je crée mes variables
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//const Drawer = createDrawerNavigator();

/*Installation Redux*/
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";
import favorites from "./reducers/favorites";
import { dataRecette } from "./reducers/recettes";

//configuration du Store
const store = configureStore({
  reducer: { users, favorites, dataRecette },
});

//Fonction de la Tab-Bar
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          let iconFood = "";
          //<FontAwesomeIcon icon="fa-solid fa-refrigerator" />
          if (route.name === "Home") {
            iconName = "cutlery";
            //iconFood = "./assets/splash.png";
          } else if (route.name === "Favoris") {
            iconName = "heart";
            //iconFood = "./assets/icon.png";
          } else if (route.name === "Recipes") {
            iconName = "book";
            //iconFood = "./assets/icon.png";
          } else if (route.name === "Profile") {
            iconName = "user";
            //iconFood = "./assets/icon.png";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7D4FB8",
        tabBarInactiveTintColor: "#b2b2b2",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favoris" component={Favoris} />
      <Tab.Screen name="Recipes" component={Recipes} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

//Fonction Principale
// j'englobe mon application avec mon Store ce qui me permet de pouvoir
// appeler mes fonctions du reducers depuis n'importe quel fichier

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Recipe" component={Recipe} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="IngredientsDetails"
            component={IngredientsDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
  image: {
    width: 100,
    height: 100,
  },
});
