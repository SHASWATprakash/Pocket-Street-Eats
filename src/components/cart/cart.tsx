// src/components/cart/cart.tsx
import React, { useContext } from "react";
import { CartContext } from "@/lib/cart/cart-context";
import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";

const Cart: React.FC = () => {
  // Get the cart items and the clearCart function from the CartContext
  const { items, clearCart } = useContext(CartContext);

  return (
    <div>
      {/* Title */}
      <h2>Cart</h2>
      {/* Check if the cart is empty */}
      {items.length === 0 ? (
        // Display a message if the cart is empty
        <p>Your cart is empty</p>
      ) : (
        // Display the cart items
        <ul>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
      )}

      {/* Add a Clear cart button */}
      <Button onClick={clearCart} disabled={items.length === 0}>
        Clear cart
      </Button>
    </div>
  );
};

export default Cart;
