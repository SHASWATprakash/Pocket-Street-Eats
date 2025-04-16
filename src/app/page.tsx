'use client';

import {useRouter} from 'next/navigation';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface CardProps {
  key: string;
  title: string;
  description: string;
  onClick: () => void;
}

const NavCard: React.FC<CardProps> = ({key, title, description, onClick}) => (
  <Card key={key}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button onClick={onClick}>View</Button>
    </CardContent>
  </Card>
);

export default function Home() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const cardData = [
    {
      key: 'auth',
      title: 'User Authentication',
      description: 'Create and manage your account.',
      onClick: () => navigateTo('/auth'),
    },
    {
      key: 'restaurants',
      title: 'Explore Restaurants',
      description: 'Browse local restaurants and their menus.',
      onClick: () => navigateTo('/restaurants'),
    },
    {
      key: 'track',
      title: 'Track Your Order',
      description: 'See the status of your order in real-time.',
      onClick: () => navigateTo('/track'),
    },
    {
      key: 'recommendations',
      title: 'AI Recommendations',
      description: 'Get personalized restaurant recommendations.',
      onClick: () => navigateTo('/recommendations'),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Pocket <span className="text-primary">Street Eats</span>
        </h1>

        <p className="mt-3 text-2xl">Discover local eats and enjoy fast delivery!</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
          {cardData.map(card => {
            try {
              return (
                
                  <NavCard
                    key={card.key}
                    title={card.title}
                    description={card.description}
                    onClick={card.onClick}
                  />
                
              );
            } catch (error: any) {
              console.error("Error rendering NavCard:", error);
              return (
                
                  
                    Error loading card
                  
                
              );
            }
          })}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p>Powered by Pocket Street Eats</p>
      </footer>
    </div>
  );
}

