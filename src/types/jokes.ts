export type Joke = {
  title: string;
  punchline: string;
};

export type RedditPost = {
  data: {
    title: string;
    selftext: string;
  };
};

export type ZenrowsApiResponse = {
  data: {
    children: RedditPost[];
    after: string | null;
  };
};
