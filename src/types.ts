export type Review = {
  rating: number,
  soundness: number,
  presentation: number,
  contribution: number,
  summary: string,
  strengths: string,
  weaknesses: string,
}

export type AC = {
  decision: string,
  comments: string,
}

export type Paper = {
  url: string,
  title: string;
  authors: string[];
  abstract: string;
  reviews: Review[];
  ac: AC;
};
