import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { Product } from "../types";
import { Link } from "expo-router";

type ProductListItemProps = {
  product: Product;
};
export const fallbackImg =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Link href={`/(tabs)/menu/${product.id}`} style={styles.container} asChild>
      <Pressable>
        <Image
          source={{ uri: product.image || fallbackImg }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f0f0f",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price: {
    color: Colors.light.tint,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
