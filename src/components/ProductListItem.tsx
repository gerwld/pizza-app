import { Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { Product } from "../types";

type ProductListItemProps = {
  product: Product;
};

const fallbackImg =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png";

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || fallbackImg }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0f0f0f",
    padding: 10,
    borderRadius: 20,
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
