export interface SentimentResponse {
  sentences: Sentence[];
  documentSentiment: Sentiment;
  language: string;
}

export interface Sentiment {
  magnitude: number;
  score: number;
}

export interface Sentence {
  text: Text;
  sentiment: Sentiment;
}

export interface Text {
  content: string;
  beginOffset: number;
}
