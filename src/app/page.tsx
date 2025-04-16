"use client";

import React, { ReactNode } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CartContext, CartItem } from "@/lib/cart/cart-context";
import { menu } from "@/lib/menu";
import { Card, CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CardProps {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
}
// NavCard component to show the cards
const NavCard: React.FC<CardProps> = ({ id, title, description, onClick }) => (
  <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>    
    </CardHeader>
    <CardContent>
      <Button onClick={onClick}>View</Button>
    </CardContent>
  </Card>
);
/**
 * Home component
 */
export default function Home() {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);


  
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const cardData = [
    {
      id: "restaurants",
      title: "Explore Restaurants",
      description: "Browse local restaurants and their menus.",
      onClick: () => navigateTo("/restaurants"),
    },
    {
      id: "track",
      title: "Track Your Order",
      description: "See the status of your order in real-time.",
      onClick: () => navigateTo("/track"),
    },
    {
      id: "recommendations",
      title: "AI Recommendations",
      description: "Get personalized restaurant recommendations.",
      onClick: () => navigateTo("/recommendations"),
    },
  ];

  // Main return of the page
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Pocket <span className="text-primary">Street Eats</span>
        </h1>

        <p className="mt-3 text-2xl text-gray-700">Discover local eats and enjoy fast delivery!</p>

       
        <div className="mt-6 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Menu</h2>
          <div className="flex flex-wrap gap-4 justify-center">    
            {/* Map all the items from the menu and display it */}
            {menu.map((item): ReactNode => (
              <Card key={item.id} className="w-80 shadow-md">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                  <p className="mb-2">Price: ${item.price}</p>
                  {/* Add the button to add to cart that will add an item to the cart using the add to cart method */}
                  <Button
                    onClick={() =>
                      addToCart({ ...item, quantity: 1 } as CartItem)
                    }
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Separator className="my-8" />        
        {/* Navigation cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {cardData.map((card) => {
            try {
              return (
                <NavCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  onClick={card.onClick}
                />
              );
            } catch (error: any) {
              console.error("Error rendering NavCard:", error);
              return (
                <Card key={`error-${card.id}`}>
                  <p>Error loading card</p>
                </Card>
              );
            }
          })}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t border-gray-300">
        <p className="text-gray-600">Powered by Pocket Street Eats</p>
      </footer>
    </div>
  );
}
