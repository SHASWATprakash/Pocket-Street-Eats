'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  bestDishes: string[];
  category: string;
  rating: number;
  image: string;
}

const RestaurantsListPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      try {
        // Mock data - replace with actual Firestore or API call
        const mockRestaurants: Restaurant[] = [
          {
            id: '1',
            name: 'Delicious Delights',
            description:
              'A cozy restaurant serving a variety of delicious dishes. Enjoy our specialty burgers and fresh salads!',
            location: {
              lat: 37.7749,
              lng: -122.4194,
            },
            bestDishes: ['Special Burger', 'Fresh Salad', 'Chocolate Cake'],
            category: 'Casual Dining',
            rating: 4.5,
            image: 'https://picsum.photos/400/300',
          },
          {
            id: '2',
            name: 'Sushi Heaven',
            description:
              'The best sushi in town! Fresh ingredients and expertly crafted rolls await you.',
            location: {
              lat: 34.0522,
              lng: -118.2437,
            },
            bestDishes: ['Dragon Roll', 'Spicy Tuna Roll', 'Sashimi Platter'],
            category: 'Sushi',
            rating: 4.8,
            image: 'https://picsum.photos/400/301',
          },
          {
            id: '3',
            name: 'Pasta Paradise',
            description:
              'Authentic Italian cuisine with a wide selection of pasta dishes. Try our signature lasagna!',
            location: {
              lat: 40.7128,
              lng: -74.006,
            },
            bestDishes: ['Lasagna', 'Carbonara', 'Pesto Pasta'],
            category: 'Italian',
            rating: 4.2,
            image: 'https://picsum.photos/400/302',
          },
        ];

        setRestaurants(mockRestaurants);
      } catch (e: any) {
        setError(e.message || 'Failed to load restaurants.');
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
        {restaurants.map(restaurant => (
          <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
            <div className="rounded-lg shadow-md overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
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

export default RestaurantsListPage;
