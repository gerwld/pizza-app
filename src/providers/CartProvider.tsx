import { CartItem, Product } from "@/types";
import React, {
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: CartItem["id"], amount: -1 | 1) => void;
  total: number;
};

const CartContext = React.createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const onAddItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (e) => e.product.id === product.id && e.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      product,
      size,
      quantity: 1,
      product_id: product.id,
      id: randomUUID(),
    };

    setItems([...items, newCartItem]);
  };

  const updateQuantity = (itemId: CartItem["id"], amount: -1 | 1) => {
    console.log(itemId, amount);
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: (item.quantity += amount) }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce(
    (prev, e) => (prev += e.quantity * e.product.price),
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem: onAddItem, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
