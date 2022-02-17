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
    title: 'Wordle Clone',
    description: 'A clone of the popular wordle game.',
    slug: 'wordle',
    keywords: ['wordle', 'wordle.com', 'clone', 'game'],
  },
];

export default projects;
