'use server';

/**
 * @fileOverview Flow for generating AI art inspired by a dream story or poem.
 *
 * - generateDreamArt - Generates AI art based on a dream story/poem.
 * - GenerateDreamArtInput - Input type for generateDreamArt function.
 * - GenerateDreamArtOutput - Return type for generateDreamArt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDreamArtInputSchema = z.object({
  storyOrPoem: z
    .string()
    .describe('The dream story or poem to inspire the art.'),
});
export type GenerateDreamArtInput = z.infer<typeof GenerateDreamArtInputSchema>;

const GenerateDreamArtOutputSchema = z.object({
  artDataUri: z
    .string()
    .describe(
      'The AI-generated art as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type GenerateDreamArtOutput = z.infer<typeof GenerateDreamArtOutputSchema>;

export async function generateDreamArt(input: GenerateDreamArtInput): Promise<GenerateDreamArtOutput> {
  return generateDreamArtFlow(input);
}

const generateDreamArtFlow = ai.defineFlow(
  {
    name: 'generateDreamArtFlow',
    inputSchema: GenerateDreamArtInputSchema,
    outputSchema: GenerateDreamArtOutputSchema,
  },
  async input => {
    // Placeholder image generation
    return {artDataUri: 'https://picsum.photos/800/800'};
  }
);
