import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react";
import type { Joke } from "@/types/jokes";

interface JokeCardProps {
  joke: Joke;
  onNext: () => void;
  onPrevious: () => void;
  onRandom: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function JokeCard({
  joke,
  onNext,
  onPrevious,
  onRandom,
  hasNext,
  hasPrevious,
}: JokeCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-bold leading-tight text-primary">
          {joke.title}
        </h2>
        <p className="text-lg text-muted-foreground">{joke.punchline}</p>
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevious}
            disabled={!hasPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous joke</span>
          </Button>
          <Button variant="outline" size="icon" onClick={onRandom}>
            <RefreshCcw className="h-4 w-4" />
            <span className="sr-only">Random joke</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            disabled={!hasNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next joke</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
