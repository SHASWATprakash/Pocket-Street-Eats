import api from "@/lib/api";

// Define the interface for the order creation response
interface OrderResponse {
  id: string;
  // Add other properties if necessary
}

export const createOrder = async (
  amount: number,
  currency: string,
): Promise<string> => {
  try {
    // Use the Axios instance to make a POST request to create the order
    const response = await api.post<OrderResponse>("/razorpay/orders", {
      amount: amount * 100, // Amount in paise
      currency: currency,
    });
    return response.data.id;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create order");
  }
};
