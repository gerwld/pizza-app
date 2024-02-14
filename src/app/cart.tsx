import { View, Platform, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import { Text } from "@/components/Themed";
import { randomUUID } from "expo-crypto";

const CartScreen = () => {
  const { items, total } = useCart();
  return (
    <View style={{ paddingVertical: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartListItem
            cartItem={item}
            key={item.id + item.product_id + randomUUID}
          />
        )}
      />

      <Text style={{ fontSize: 20, fontWeight: "500", margin: 10 }}>
        Total ${total}
      </Text>
      <Button text="Checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
