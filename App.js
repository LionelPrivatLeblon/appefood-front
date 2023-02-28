import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";

/*Installation Navigation*/
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";

import Home from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import Favoris from "./screens/FavorisScreen";
import Recipes from "./screens/RecetteScreen";
import Recipe from "./screens/AfficherRecetteScreen";
import Profile from "./screens/ProfileScreen";
import test from "./screens/Test";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//const Drawer = createDrawerNavigator();

/*Installation Redux*/
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";
import favorites from "./reducers/favorites";

const store = configureStore({
  reducer: { users, favorites },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          let iconFood = "";
          //<FontAwesomeIcon icon="fa-solid fa-refrigerator" />
          if (route.name === "Home") {
            iconName = "home";
            //iconFood = "./assets/splash.png";
          } else if (route.name === "Favoris") {
            iconName = "user";
            //iconFood = "./assets/icon.png";
          } else if (route.name === "Recipes") {
            iconName = "home";
            //iconFood = "./assets/icon.png";
          } else if (route.name === "Profile") {
            iconName = "home";
            //iconFood = "./assets/icon.png";
          } else if (route.name === "test") {
            iconName = "home";
            //iconFood = "./assets/icon.png";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
          //return <FontAwesomeIcon icon={faHeart} />;
          //return <Image style={styles.image} source={iconFood} color={color} />;
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
      <Tab.Screen name="test" component={test} />
    </Tab.Navigator>
  );
};

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Recipe" component={Recipe} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

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
