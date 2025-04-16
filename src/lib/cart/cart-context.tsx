"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  Dispatch,
} from "react";

// Interface to represent an item in the cart
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Interface for the state of the cart
interface CartState {
  items: CartItem[];
}

// Interface for the actions that can be performed on the cart
interface CartActions {
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Type for the combined cart context value
type CartContextValue = CartState & CartActions;

// Create the CartContext with a default value
export const CartContext = createContext<CartContextValue>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

// Define the actions that can be performed on the cart
type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { itemId: string; quantity: number } }
  | { type: "CLEAR_CART" };

// Reducer function to manage the cart state
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { items: updatedItems };
      } else {
        // If item doesn't exist, add it
        return { items: [...state.items, action.payload] };
      }
    }
    case "REMOVE_FROM_CART": {
      // Remove item from cart
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case "UPDATE_QUANTITY": {
      // Update the quantity of an item in the cart
      return {
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    }
    case "CLEAR_CART": {
      // Clear all items from the cart
      return { items: [] };
    }
    default:
      return state;
  }
};

// CartProvider component to manage the cart state and provide it to the children
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Get the cart from localStorage or use an empty array if it doesn't exist
  const [cart, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { items: [] };
  });

  // Update localStorage when the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Actions to interact with the cart
  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Provide the cart state and actions to the children
  return (
    <CartContext.Provider
      value={{
        ...cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
