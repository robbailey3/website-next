import Card from '@/components/common/Card/Card';
import { Project } from '../models/Project';

const projects: Project[] = [
  {
    id: '1',
    title: 'Sentiment Analysis',
    description:
      'Using the Google Natural Language API to analyze the sentiment of a user-inputted sentence.',
    slug: 'sentiment-analysis',
    keywords: ['sentiment analysis', 'natural language api', 'google'],
  },
  {
    id: '2',
    title: 'Word Game',
    description:
      'A clone of a particular word game which seem to be popular at the moment.',
    slug: 'word-game',
    keywords: ['word-game', 'clone', 'guessing', 'game'],
  },
  {
    id: '3',
    title: 'Image Analysis',
    description:
      'Using the Cloud Vision API to generate captions for a user-inputted image.',
    slug: 'vision-detection',
    keywords: ['image analysis', 'Vision AI', 'image recognition', 'google'],
  },
];

export default projects;
