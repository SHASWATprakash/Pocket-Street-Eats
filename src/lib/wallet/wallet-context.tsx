// src/lib/wallet/wallet-context.tsx

"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Interface for the wallet state
interface WalletState {
  balance: number;
}

// Interface for the wallet actions
interface WalletActions {
  addFunds: (amount: number) => void;
  removeFunds: (amount: number) => void;
}

// Initial wallet state
const initialWalletState: WalletState = {
  balance: 0,
};

// Create the WalletContext
interface WalletContextProps extends WalletState, WalletActions {}
export const WalletContext = createContext<WalletContextProps>({
  ...initialWalletState,
  addFunds: () => {},
  removeFunds: () => {},
});

// WalletProvider component
interface WalletProviderProps {
  children: ReactNode;
}
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  // Load wallet balance from localStorage on initial render
  const [balance, setBalance] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const storedBalance = localStorage.getItem("walletBalance");
      return storedBalance ? parseFloat(storedBalance) : 0;
    }
    return 0;
  });

  // Update localStorage whenever the balance changes
  useEffect(() => {
    localStorage.setItem("walletBalance", balance.toString());
  }, [balance]);

  // Function to add funds to the wallet
  const addFunds = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  // Function to remove funds from the wallet
  const removeFunds = (amount: number) => {
    setBalance((prevBalance) => prevBalance - amount);
  };

  // Provide the wallet state and actions through the context
  const value = {
    balance,
    addFunds,
    removeFunds,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

// Custom hook to easily access the wallet context
export const useWallet = () => {
  return useContext(WalletContext);
};
