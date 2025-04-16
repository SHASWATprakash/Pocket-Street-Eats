import { api } from "@/lib/api";
import { logError } from "./logger";

export interface Restaurant {
  id: string;
  name: string;
}

// Function to get all restaurants
export const getRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await api.get("/restaurants");
    return response.data as Restaurant[];
  } catch (error: any) {
    logError(error, "getRestaurants");
    throw error;
  }
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data as Restaurant;
  } catch (error: any) {
    logError(error, "getRestaurantById");
    throw error;
  }
};
