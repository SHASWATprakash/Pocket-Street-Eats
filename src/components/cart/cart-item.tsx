import React, { useState } from "react";
import { CartContext, CartItem } from "@/lib/cart/cart-context";
import { useContext } from "react";
import { Button } from "@/components/ui/button";

// Define the interface for the props that the CartItem component will receive
interface CartItemProps {
  item: CartItem; // An item of type CartItem
}

// Create a functional component called CartItem that takes props of type CartItemProps
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { addToCart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculate the total price for the current item
  const total = item.price * item.quantity;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-grow">
        {/* Display the name of the item */}
        <p className="font-semibold">{item.name}</p>
        {/* Display the quantity and price of the item */}
        <p className="text-sm text-gray-500">
          Quantity: {item.quantity} x ${item.price.toFixed(2)}
        </p>
      </div>
      <div className="text-right">
        {/* Display the total price for this item */}
        <p className="font-medium">${total.toFixed(2)}</p>
        <div className="flex mt-2">
          <Button size="sm" onClick={() => removeFromCart(item.id)}>
            -
          </Button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.id, parseInt(e.target.value, 10))
            }
            className="w-16 mx-2 border border-gray-300 rounded-md text-center"
          />
          <Button size="sm" onClick={() => addToCart(item)}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
