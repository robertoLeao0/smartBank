import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function HomePage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue"
      }}
    >
      <Text>Hello, World!</Text>
      <Link href={"/screens/dashboard"}>Entrar</Link>
    </View>
  );
}
