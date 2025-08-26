'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { generateDreamStory } from '@/ai/flows/generate-dream-story';
import { generateDreamArt } from '@/ai/flows/generate-dream-art';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Users, Edit, RefreshCw, Share2, Sparkles } from 'lucide-react';
import DreamWeaverLogo from '@/components/dream-weaver-logo';

export default function Home() {
  const [step, setStep] = useState('start'); // 'start', 'loading', 'result', 'editing'
  const [dreamStory, setDreamStory] = useState('');
  const [editedStory, setEditedStory] = useState('');
  const [dreamArt, setDreamArt] = useState('');
  const { toast } = useToast();

  const handleGenerateDream = async () => {
    setStep('loading');
    try {
      // Mock Farcaster data for demonstration purposes
      const farcasterData = {
        farcasterCasts: 'Contemplating the intersection of art and technology, sharing generative art, and discussing the future of digital identity.',
        farcasterLikes: 'Abstract art, surreal photography, and posts about decentralization.',
        farcasterFollows: 'AI artists, blockchain developers, and futurists.',
      };

      const storyResult = await generateDreamStory(farcasterData);
      setDreamStory(storyResult.dreamStory);
      setEditedStory(storyResult.dreamStory);

      const artResult = await generateDreamArt({ storyOrPoem: storyResult.dreamStory });
      setDreamArt(artResult.artDataUri);

      setStep('result');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Weaving Dream',
        description: 'Could not generate your dream. Please try again.',
        variant: 'destructive',
      });
      setStep('start');
    }
  };
  
  const handleRegenerateArt = async () => {
    // Keep showing the old art while the new one is loading, but indicate loading on the button
    toast({ title: 'Weaving new visuals...', description: 'A new artwork is being generated based on the story.' });
    try {
      const artResult = await generateDreamArt({ storyOrPoem: editedStory });
      setDreamArt(artResult.artDataUri);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Regenerating Art',
        description: 'Could not create new art. Please try again.',
        variant: 'destructive',
      });
    }
  }

  const handleSaveEdit = () => {
    setDreamStory(editedStory);
    setStep('result');
    toast({ title: "Story Updated", description: "You can now regenerate art with the new story."});
  }
  
  const showToast = (title: string, description: string) => {
    toast({ title, description });
  };

  return (
    <div className="dark">
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-3 text-foreground">
          <DreamWeaverLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline tracking-wider">Dream Weaver</h1>
        </div>
        
        <Card className="w-full max-w-2xl shadow-2xl bg-card text-card-foreground transition-all duration-500 rounded-xl">
          {step === 'start' && (
            <>
              <CardHeader className="text-center p-8">
                <CardTitle className="text-3xl font-headline mb-2">Weave a Dream from Your Digital Soul</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Generate a unique AI-powered story and artwork from your Farcaster activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="flex justify-center">
                  <Button size="lg" onClick={handleGenerateDream} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Wand2 className="mr-2" />
                    Weave My Dream
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {step === 'loading' && (
            <CardContent className="flex flex-col items-center justify-center p-16 gap-6">
              <Sparkles className="h-16 w-16 animate-pulse text-primary" />
              <p className="text-muted-foreground text-lg">Weaving your dream from the digital ether...</p>
            </CardContent>
          )}

          {step === 'result' && (
             <>
              <CardContent className="p-4 sm:p-6">
                <div className="aspect-square w-full overflow-hidden rounded-lg mb-6 border-2 border-border shadow-inner">
                  {dreamArt ? (
                    <Image src={dreamArt} alt="AI generated dream art" width={800} height={800} className="object-cover w-full h-full" data-ai-hint="surreal abstract" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">Art is being woven...</p>
                    </div>
                  )}
                </div>
                <p className="text-lg leading-relaxed whitespace-pre-wrap p-2">{dreamStory}</p>
              </CardContent>
              <CardFooter className="flex-wrap flex-col sm:flex-row gap-2 p-4 sm:p-6 border-t">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Button variant="outline" onClick={() => setStep('editing')}><Edit className="mr-2"/> Tweak Story</Button>
                  <Button variant="outline" onClick={handleRegenerateArt}><RefreshCw className="mr-2"/> New Art</Button>
                  <Button variant="outline" onClick={() => showToast('Coming Soon!', 'Collaboration features are under development.')}><Users className="mr-2"/> Collaborate</Button>
                </div>
                <div className="flex-grow hidden sm:block" />
                <div className="flex flex-wrap justify-center sm:justify-end gap-2 pt-4 sm:pt-0">
                  <Button onClick={() => showToast('Coming Soon!', 'NFT minting will be available shortly.')} className="bg-primary text-primary-foreground hover:bg-primary/90">Mint NFT</Button>
                  <Button onClick={() => showToast('Coming Soon!', 'Share your creation with the world on Warpcast.')}><Share2 className="mr-2"/> Share</Button>
                </div>
              </CardFooter>
            </>
          )}
          
          {step === 'editing' && (
             <>
              <CardHeader className="p-6">
                  <CardTitle>Edit Your Dream</CardTitle>
                  <CardDescription>Refine the narrative. Your changes will inspire new art.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                  <Textarea
                      value={editedStory}
                      onChange={(e) => setEditedStory(e.target.value)}
                      rows={10}
                      className="w-full text-base bg-input/50 focus:bg-background"
                  />
              </CardContent>
              <CardFooter className="justify-end gap-2 p-6 border-t">
                  <Button variant="ghost" onClick={() => setStep('result')}>Cancel</Button>
                  <Button onClick={handleSaveEdit} className="bg-primary text-primary-foreground hover:bg-primary/90">Save Story</Button>
              </CardFooter>
             </>
          )}

        </Card>
        <footer className="text-center mt-8 text-muted-foreground text-sm">
          <p>Powered by Genkit and Farcaster</p>
        </footer>
      </main>
    </div>
  );
}
