"use client";

import { getRestaurantById } from "@/lib/firebase";

export default async function RestaurantPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const restaurant = await getRestaurantById(id);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Restaurant: {restaurant.name}</h1>
      {/* Rest of the restaurant details */}
      <p>Restaurant id: {id}</p>
    </div>
  );
}
