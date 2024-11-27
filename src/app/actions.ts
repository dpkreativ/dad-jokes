"use server";

import { Joke, ZenrowsApiResponse, RedditPost } from "@/types/jokes";

const apikey = process.env.ZENROWS_API_KEY!;
const subredditBaseUrl = "https://www.reddit.com/r/dadjokes/";
const maxJokes = 50;

export const fetchJokes = async (): Promise<Joke[]> => {
  let after: string | null = null;
  let jokes: Joke[] = [];

  while (jokes.length < maxJokes) {
    const url = `${subredditBaseUrl}.json${after ? `?after=${after}` : ""}`;

    try {
      const response = await fetch(
        `https://api.zenrows.com/v1/?url=${url}&apikey=${apikey}&premium_proxy=true`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch jokes: ${response.statusText}`);
      }

      const data: ZenrowsApiResponse = await response.json();

      const posts = data.data.children;
      if (!posts || posts.length === 0) break;

      posts.forEach((post: RedditPost) => {
        const title = post.data.title;
        const punchline = post.data.selftext;
        if (title && punchline) {
          jokes.push({ title, punchline });
        }
      });

      after = data.data.after;
      if (!after) break;
    } catch (error) {
      console.error("Error fetching jokes:", (error as Error).message);
      break;
    }
  }

  return jokes.slice(0, maxJokes);
};
