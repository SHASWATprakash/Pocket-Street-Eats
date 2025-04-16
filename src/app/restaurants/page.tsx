"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRestaurants, Restaurant } from "@/lib/firebase";

interface RestaurantWithDetails extends Restaurant {
  description: string;
  rating: number;
  image: string;
}

export const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const restaurantsData = await getRestaurants();
        setRestaurants(
          restaurantsData.map((restaurant) => ({
            id: restaurant.id,
            name: restaurant.name,
            description: "some description",
            rating: 4.5,
            image: "https://picsum.photos/400/302",
          })),
        );
      } catch (e: any) {
        setError(e.message || "Failed to load restaurants.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (isLoading) {
    return <div>Loading restaurants...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Our Restaurants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((restaurant: RestaurantWithDetails) => (
          <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
            <div className="rounded-lg shadow-md overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {restaurant.name}
                </h2>
                <p className="text-gray-700">{restaurant.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 mr-2">Rating:</span>
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantListPage;
