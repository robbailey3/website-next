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
      'Using Google Cloud Vision API to analyse images and do cool stuff like detect faces, labels, and more.',
    slug: 'vision-detection',
    keywords: ['image analysis', 'Vision AI', 'image recognition', 'google'],
  },
  {
    id: '4',
    title: 'Running Tracker',
    description: 'A running tracker which tracks my running activities.',
    slug: 'running-tracker',
    keywords: [
      'running',
      'tracker',
      'running tracker',
      'strava',
      'webhook',
      'api',
    ],
  },
];

export default projects;
