// src/lib/cart/cart-utils.ts

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const addItemToCart = (
  cartItems: CartItem[],
  itemToAdd: CartItem,
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  itemToRemove: CartItem,
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id,
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  itemToClear: CartItem,
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
};

export const clearCart = (): CartItem[] => {
  return [];
};

export const getCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};
