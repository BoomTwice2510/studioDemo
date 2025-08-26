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

const generateDreamArtPrompt = ai.definePrompt({
  name: 'generateDreamArtPrompt',
  input: {schema: GenerateDreamArtInputSchema},
  output: {schema: GenerateDreamArtOutputSchema},
  prompt: `Create a unique and surreal piece of generative AI art inspired by the following dream story or poem:\n\n{{{storyOrPoem}}}\n\nEnsure the generated image reflects the tone, themes, and imagery present in the text. Return the image as a data URI.
`,
});

const generateDreamArtFlow = ai.defineFlow(
  {
    name: 'generateDreamArtFlow',
    inputSchema: GenerateDreamArtInputSchema,
    outputSchema: GenerateDreamArtOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.storyOrPoem,
    });

    if (!media) {
      throw new Error('No media was returned from the image generation.');
    }

    return {artDataUri: media.url};
  }
);
