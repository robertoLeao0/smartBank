import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Login" }} />
      
      <Stack.Screen name="dashboard" options={{ headerTitle: "Dashboard" }} />
    </Stack>
  );
}
