'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getRiderLocation } from "@/services/google-maps";
import { useEffect, useState } from "react";

export default function Home() {
  const [riderLocation, setRiderLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    async function fetchRiderLocation() {
      const location = await getRiderLocation("rider123");
      setRiderLocation(location);
    }

    fetchRiderLocation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Pocket <span className="text-primary">Street Eats</span>
        </h1>

        <p className="mt-3 text-2xl">
          Discover local eats and enjoy fast delivery!
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>User Authentication</CardTitle>
              <CardDescription>Create and manage your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Sign Up / Log In</Button>
            </CardContent>
          </Card>

          <Card className="w-96">
            <CardHeader>
              <CardTitle>Explore Restaurants</CardTitle>
              <CardDescription>Browse local restaurants and their menus.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>View Restaurants</Button>
            </CardContent>
          </Card>

          <Card className="w-96">
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
              <CardDescription>See the status of your order in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Track Order</Button>
            </CardContent>
          </Card>

          <Card className="w-96">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Get personalized restaurant recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Get Recommendations</Button>
            </CardContent>
          </Card>
        </div>

        {/* Rider Location Display */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">Rider Location</h2>
          <p>Latitude: {riderLocation.lat}</p>
          <p>Longitude: {riderLocation.lng}</p>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p>
          Powered by Pocket Street Eats
        </p>
      </footer>
    </div>
  );
}
