import React, { useState } from "react";
import { Text, View } from "@components/Themed";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { Image, StyleSheet, Pressable } from "react-native";
import { fallbackPizzaImage } from "@/constants/Images";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const ProductDetailsScreen = () => {
  const [size, setSize] = useState<PizzaSize>("M");
  const { id } = useLocalSearchParams();
  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
  const product = products.find((e) => e.id.toString() === id);
  const { addItem } = useCart();
  const router = useRouter();

  const addToCart = () => {
    if (!product) return;
    addItem(product, size);
    router.push("/cart");
  };

  if (!product) return <Text>Prdouct not found</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Details: " + product.name,
        }}
      />

      <Image
        source={{ uri: product.image || fallbackPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.sizeTitle}>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((i) => (
          <Pressable
            key={i}
            onPress={() => setSize(i)}
            style={[styles.size, i === size ? styles.sizeActive : {}]}
          >
            <Text style={styles.sizeText} key={i + "_sizekey"}>
              {i}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    backgroundColor: "#0f0f0f",
    flex: 1,
  },
  image: {
    width: "100%",
    maxWidth: 300,
    marginLeft: "10%",
    aspectRatio: 1,
    objectFit: "contain",
    marginHorizontal: "auto",
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 10,
  },
  sizeTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 10,
  },
  price: {
    fontWeight: "400",
    fontSize: 18,
    color: Colors.dark.tint,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    paddingTop: 10,
    paddingBottom: 50,
  },
  size: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    marginRight: 10,
    borderRadius: 50,
    backgroundColor: Colors.dark.background,
  },
  sizeActive: {
    backgroundColor: Colors.dark.tint,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ProductDetailsScreen;
