'use client';

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {Icons} from '@/components/icons';

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

const RestaurantsPage = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const restaurantId = params.id as string;

  useEffect(() => {
    const fetchRestaurant = async () => {
      setIsLoading(true);
      try {
        // Mock data - replace with actual Firestore or API call
        const mockRestaurant: Restaurant = {
          id: restaurantId,
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
        };

        setRestaurant(mockRestaurant);
      } catch (e: any) {
        setError(e.message || 'Failed to load restaurant details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  if (isLoading) {
    return <div>Loading restaurant details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Restaurant Details */}
        <div>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="rounded-lg shadow-md mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center mb-2">
            <Icons.mapPin className="mr-2 h-5 w-5 text-gray-500" />
            {restaurant.category}
          </div>
          <p className="text-gray-700 mb-4">{restaurant.description}</p>
          <h2 className="text-xl font-semibold mb-2">Best Dishes</h2>
          <ul className="list-disc list-inside mb-4">
            {restaurant.bestDishes.map((dish, index) => (
              <li key={index}>{dish}</li>
            ))}
          </ul>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-2">Rating:</span>
            <span className="font-semibold">{restaurant.rating}</span>
          </div>
        </div>

        {/* Google Maps Integration */}
        <div className="h-96 rounded-lg shadow-md">
          <GoogleMaps location={restaurant.location} restaurantName={restaurant.name} />
        </div>
      </div>
    </div>
  );
};

interface GoogleMapsProps {
  location: {
    lat: number;
    lng: number;
  };
  restaurantName: string;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({location, restaurantName}) => {
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: location,
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: location,
        map: map,
        title: restaurantName,
      });
    };

    if (typeof window !== 'undefined' && window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.error('Google Maps API key is not defined. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.');
        return;
      }
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      (window as any).initMap = initMap;
      document.head.appendChild(script);

      script.onerror = () => {
        console.error('Google Maps API script load error');
      };
    }
  }, [location, restaurantName]);

  return <div id="map" className="h-full w-full" />;
};

export default RestaurantsPage;
