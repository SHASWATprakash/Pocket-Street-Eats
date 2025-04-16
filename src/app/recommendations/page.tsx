'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {recommendRestaurant} from '@/ai/flows/recommend-restaurant';

const RecommendationsPage = () => {
  const [orderHistory, setOrderHistory] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRecommendation = async () => {
    setIsLoading(true);
    try {
      const aiRecommendation = await recommendRestaurant({orderHistory});
      setRecommendation(aiRecommendation);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      setRecommendation({
        restaurantName: 'Error',
        cuisine: 'Error',
        reason: 'Failed to get recommendation.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle>AI Restaurant Recommendations</CardTitle>
          <CardDescription>
            Enter your order history to get personalized restaurant recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              placeholder="Enter your past order history (e.g., 'Ordered sushi from Sushi Heaven, pasta from Pasta Paradise')"
              value={orderHistory}
              onChange={e => setOrderHistory(e.target.value)}
            />
          </div>
          <Button onClick={handleRecommendation} disabled={isLoading}>
            {isLoading ? 'Getting Recommendation...' : 'Get Recommendation'}
          </Button>

          {recommendation && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Recommendation:</h2>
              <p>
                <strong>Restaurant:</strong> {recommendation.restaurantName}
              </p>
              <p>
                <strong>Cuisine:</strong> {recommendation.cuisine}
              </p>
              <p>
                <strong>Reason:</strong> {recommendation.reason}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationsPage;
