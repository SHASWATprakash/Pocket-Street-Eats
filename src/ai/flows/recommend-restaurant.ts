// 'use server';
/**
 * @fileOverview A restaurant recommendation AI agent based on past order history.
 *
 * - recommendRestaurant - A function that handles the restaurant recommendation process.
 * - RecommendRestaurantInput - The input type for the recommendRestaurant function.
 * - RecommendRestaurantOutput - The return type for the recommendRestaurant function.
 */

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RecommendRestaurantInputSchema = z.object({
  orderHistory: z
    .string()
    .describe('The past order history of the user as a JSON string. Include restaurant names and food items.'),
});
export type RecommendRestaurantInput = z.infer<typeof RecommendRestaurantInputSchema>;

const RecommendRestaurantOutputSchema = z.object({
  restaurantName: z.string().describe('The name of the recommended restaurant.'),
  cuisine: z.string().describe('The cuisine of the recommended restaurant.'),
  reason: z.string().describe('The reason for recommending this restaurant based on order history.'),
});
export type RecommendRestaurantOutput = z.infer<typeof RecommendRestaurantOutputSchema>;

export async function recommendRestaurant(input: RecommendRestaurantInput): Promise<RecommendRestaurantOutput> {
  return recommendRestaurantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendRestaurantPrompt',
  input: {
    schema: z.object({
      orderHistory: z
        .string()
        .describe('The past order history of the user as a JSON string. Include restaurant names and food items.'),
    }),
  },
  output: {
    schema: z.object({
      restaurantName: z.string().describe('The name of the recommended restaurant.'),
      cuisine: z.string().describe('The cuisine of the recommended restaurant.'),
      reason: z.string().describe('The reason for recommending this restaurant based on order history.'),
    }),
  },
  prompt: `You are a restaurant recommendation expert. Based on the user's past order history, recommend a restaurant.

Past Order History: {{{orderHistory}}}

Consider the user's preferences and suggest a restaurant they are likely to enjoy. Explain the reason for your recommendation.
Make sure the outputted JSON is valid.`,
});

const recommendRestaurantFlow = ai.defineFlow<
  typeof RecommendRestaurantInputSchema,
  typeof RecommendRestaurantOutputSchema
>(
  {
    name: 'recommendRestaurantFlow',
    inputSchema: RecommendRestaurantInputSchema,
    outputSchema: RecommendRestaurantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
