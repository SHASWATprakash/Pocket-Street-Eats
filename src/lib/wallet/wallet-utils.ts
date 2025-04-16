// src/lib/wallet/wallet-utils.ts

export interface Wallet {
  balance: number;
}

/**
 * Adds funds to the wallet.
 * @param wallet - The current wallet.
 * @param amount - The amount to add.
 * @returns The updated wallet.
 */
export const addFunds = (wallet: Wallet, amount: number): Wallet => {
  return { ...wallet, balance: wallet.balance + amount };
};

/**
 * Subtracts funds from the wallet.
 * @param wallet - The current wallet.
 * @param amount - The amount to subtract.
 * @returns The updated wallet.
 * @throws Error if there are not enough funds.
 */
export const subtractFunds = (wallet: Wallet, amount: number): Wallet => {
  if (wallet.balance < amount) {
    throw new Error("Insufficient funds");
  }
  return { ...wallet, balance: wallet.balance - amount };
};

/**
 * Gets the current balance of the wallet.
 * @param wallet - The wallet.
 * @returns The current balance.
 */
export const getBalance = (wallet: Wallet): number => {
  return wallet.balance;
};

/**
 * Sets the current balance of the wallet.
 * @param wallet - The wallet.
 * @param balance - The new balance.
 * @returns The updated wallet.
 */
export const setBalance = (wallet: Wallet, balance: number): Wallet => {
  return { ...wallet, balance };
};
