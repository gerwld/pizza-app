import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, Tabs } from "expo-router";
import { Text, View } from "@components/Themed";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function MenuStack() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View style={styles.container}>
                  <Text style={styles.label}>Cart</Text>
                  <Entypo
                    name="shopping-basket"
                    size={25}
                    style={{
                      ...styles.icon,
                      opacity: pressed ? 0.5 : 1,
                      color: Colors[colorScheme ?? "light"].text,
                    }}
                  />
                </View>
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  label: {
    fontWeight: "500",
    fontSize: 17,
  },
  icon: {
    marginLeft: 8,
  },
});
