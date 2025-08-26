'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a surreal micro-story or poem based on a user's Farcaster activity.
 *
 * - generateDreamStory - A function that triggers the dream story generation flow.
 * - GenerateDreamStoryInput - The input type for the generateDreamStory function.
 * - GenerateDreamStoryOutput - The return type for the generateDreamStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDreamStoryInputSchema = z.object({
  farcasterCasts: z.string().describe('A summary of the users recent farcaster casts.'),
  farcasterLikes: z.string().describe('A summary of the users recent farcaster likes.'),
  farcasterFollows: z.string().describe('A summary of the users recent farcaster follows.'),
});
export type GenerateDreamStoryInput = z.infer<typeof GenerateDreamStoryInputSchema>;

const GenerateDreamStoryOutputSchema = z.object({
  dreamStory: z.string().describe('A surreal micro-story or poem inspired by the user\'s Farcaster activity.'),
});
export type GenerateDreamStoryOutput = z.infer<typeof GenerateDreamStoryOutputSchema>;

export async function generateDreamStory(input: GenerateDreamStoryInput): Promise<GenerateDreamStoryOutput> {
  return generateDreamStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDreamStoryPrompt',
  input: {schema: GenerateDreamStoryInputSchema},
  output: {schema: GenerateDreamStoryOutputSchema},
  prompt: `You are a dream weaver, capable of creating surreal and evocative micro-stories and poems based on a user's digital activity.

  Analyze the user's Farcaster activity, including their casts, likes, and follows, to generate a unique and personalized dream narrative.

  Here's a summary of the user's Farcaster activity:

  Casts: {{{farcasterCasts}}}
  Likes: {{{farcasterLikes}}}
  Follows: {{{farcasterFollows}}}

  Create a surreal micro-story or poem that reflects the user's Farcaster activity. The story should be no more than 200 words.
  `,
});

const generateDreamStoryFlow = ai.defineFlow(
  {
    name: 'generateDreamStoryFlow',
    inputSchema: GenerateDreamStoryInputSchema,
    outputSchema: GenerateDreamStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
