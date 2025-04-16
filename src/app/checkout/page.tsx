"use client";

import React, { useContext, useState } from "react";
import { CartContext } from "@/lib/cart/cart-context";
import { WalletContext } from "@/lib/wallet/wallet-context";
import Cart from "@/components/cart/cart";
import Wallet from "@/components/wallet/wallet";
import { createOrder } from "@/lib/razorpay";

// CheckoutPage component - This component is responsible for displaying the checkout page
const CheckoutPage: React.FC = () => {
  // Access cart items and wallet balance from their respective contexts using useContext hook
  const { items } = useContext(CartContext);
  const { balance, removeFunds } = useContext(WalletContext);
  // State to manage payment status
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  // State to manage error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Calculate total cost of items in the cart using reduce method
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Handle payment process using Razorpay
  const handlePay = async () => {
    // Reset payment status and error message
    setPaymentStatus("processing");
    setErrorMessage(null);
    try {
      // Check if wallet balance is sufficient to cover the total cost
      if (balance < total) {
        // Display a message if there are insufficient funds
        throw new Error("Not enough funds");
      }
      // Create an order with Razorpay
      const order = await createOrder(total, "INR");
      // Remove the total amount from the wallet
      removeFunds(total);
      // Handle the payment, here we should redirect to the payment page, but since we are using a dummy api, we will just show a success message.
      setPaymentStatus("success");
    } catch (error: any) {
      // Set payment status to error and display the error message
      setPaymentStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      {/* Display the Cart component */}
      <Cart />
      {/* Display the Wallet component */}
      <Wallet />
      {/* Display the total cost */}
      <div>Total: {total}</div>
      {/* If payment is processing, show a message */}
      {paymentStatus === "processing" && <div>Processing...</div>}
      {/* If payment was successful, show a message */}
      {paymentStatus === "success" && <div>Payment successful!</div>}
      {/* If there was an error, show the error message */}
      {paymentStatus === "error" && <div>Error: {errorMessage}</div>}
      {/* If payment is not processing, show the pay button */}
      {paymentStatus !== "processing" && (
        <button onClick={handlePay}>Pay</button>
      )}
    </div>
  );
};

// Export the CheckoutPage component to use it in other parts of the application
export default CheckoutPage;
