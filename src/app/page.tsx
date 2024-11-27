"use client";

import { useEffect, useState } from "react";
import { fetchJokes } from "./actions";
import { JokeCard } from "@/components/joke-card";
import type { Joke } from "@/types/jokes";

export default function Home() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJokes = async () => {
      try {
        const jokesData = await fetchJokes();
        setJokes(jokesData);
      } catch (error) {
        console.error("Failed to load jokes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJokes();
  }, []);

  const currentJoke = jokes[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, jokes.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setCurrentIndex(randomIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-xl font-medium text-muted-foreground">
          Loading dad jokes...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary">
          Dad Jokes
        </h1>
        {currentJoke ? (
          <JokeCard
            joke={currentJoke}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onRandom={handleRandom}
            hasNext={currentIndex < jokes.length - 1}
            hasPrevious={currentIndex > 0}
          />
        ) : (
          <div className="text-center text-muted-foreground">
            No jokes available. Please try refreshing the page.
          </div>
        )}
      </div>
    </main>
  );
}
