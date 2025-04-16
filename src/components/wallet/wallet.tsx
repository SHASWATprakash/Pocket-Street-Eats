// src/components/wallet/wallet.tsx
import React, { useContext } from "react";
import { WalletContext } from "@/lib/wallet/wallet-context";
import { Button } from "../ui/button";

// Wallet component to display and manage the user's wallet balance
export const Wallet = () => {
  // Use the WalletContext to get the current balance and the addFunds function
  const { balance, addFunds } = useContext(WalletContext);

  return (
    <div>
      {/* Display the current balance */}
      <h2>Current Balance: {balance}</h2>

      {/* Button to add funds to the wallet */}
      <Button onClick={() => addFunds(100)}>Add Funds</Button>
    </div>
  );
};

export default Wallet;
