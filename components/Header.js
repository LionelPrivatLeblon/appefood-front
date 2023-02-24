import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useSelector } from "react-redux";

export default function Header({ navigation }) {
  const newuser = useSelector((state) => state.users.value);

  return (
    <View style={styles.container}>
      <Text>Welcome {newuser.username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
