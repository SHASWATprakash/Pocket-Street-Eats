'use client';

import {useRouter} from 'next/navigation';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export default function Home() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Pocket <span className="text-primary">Street Eats</span>
        </h1>

        <p className="mt-3 text-2xl">Discover local eats and enjoy fast delivery!</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
          {[
            (
              <Card key="auth">
                <CardHeader>
                  <CardTitle>User Authentication</CardTitle>
                  <CardDescription>Create and manage your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigateTo('/auth')}>Sign Up / Log In</Button>
                </CardContent>
              </Card>
            ),
            (
              <Card key="restaurants">
                <CardHeader>
                  <CardTitle>Explore Restaurants</CardTitle>
                  <CardDescription>Browse local restaurants and their menus.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigateTo('/restaurants')}>View Restaurants</Button>
                </CardContent>
              </Card>
            ),
            (
              <Card key="track">
                <CardHeader>
                  <CardTitle>Track Your Order</CardTitle>
                  <CardDescription>See the status of your order in real-time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigateTo('/track')}>Track Order</Button>
                </CardContent>
              </Card>
            ),
            (
              <Card key="recommendations">
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>Get personalized restaurant recommendations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigateTo('/recommendations')}>Get Recommendations</Button>
                </CardContent>
              </Card>
            ),
          ]}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p>Powered by Pocket Street Eats</p>
      </footer>
    </div>
  );
}
