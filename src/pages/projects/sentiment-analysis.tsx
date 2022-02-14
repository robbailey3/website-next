import Container from '@/components/common/Container/Container';
import SentimentAnalysisResult from '@/features/sentiment-analysis/components/SentimentAnalysisResult/SentimentAnalysisResult';
import { AnalyseResponse } from '@/features/sentiment-analysis/models/analyse-response';
import { ClassifyResponse } from '@/features/sentiment-analysis/models/classify-response';
import { SentimentResponse } from '@/features/sentiment-analysis/models/sentiment-response';
import axios from 'axios';
import React, { KeyboardEvent } from 'react';
import * as Sentry from '@sentry/nextjs';

const SentimentAnalysisProjectPage = () => {
  const [analysis, setAnalysis] = React.useState<AnalyseResponse | null>(null);
  const [classification, setClassification] =
    React.useState<ClassifyResponse | null>(null);
  const [sentiment, setSentiment] = React.useState<SentimentResponse | null>(
    null
  );
  const [inputValue, setInputValue] = React.useState('');

  const [analysisActive, setAnalysisActive] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleKeyup = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const getAnalysis = async (): Promise<void> => {
    const result = await axios.post(
      '/api/projects/sentiment-analysis/analyse',
      {
        text: inputValue,
      }
    );

    setAnalysis(result.data);
  };

  const getClassification = async (): Promise<void> => {
    try {
      const result = await axios.post(
        '/api/projects/sentiment-analysis/classify',
        {
          text: inputValue,
        }
      );

      setClassification(result.data);
    } catch {
      setClassification(null);
    }
  };

  const getSentiment = async (): Promise<void> => {
    const result = await axios.post(
      '/api/projects/sentiment-analysis/sentiment',
      {
        text: inputValue,
      }
    );

    setSentiment(result.data);
  };

  const analyse = async () => {
    setIsLoading(true);
    try {
      clear();
      await getSentiment();
      await getAnalysis();
      await getClassification();
      setAnalysisActive(true);
    } catch (e) {
      Sentry.captureException(e);
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setAnalysis(null);
    setClassification(null);
    setSentiment(null);
  };

  const reset = () => {
    clear();
    setAnalysisActive(false);
  };

  return (
    <Container>
      <section>
        <h1 className="w-full text-4xl font-bold mb-4">Sentiment Analysis</h1>
        <p className="w-full text-xl">
          Sentiment analysis is a technique that uses the words in a text to
          determine whether the text is positive, negative, or neutral.
        </p>
        {analysisActive ? (
          <SentimentAnalysisResult
            sentiment={sentiment}
            analysis={analysis}
            classification={classification}
            onReset={reset}
          />
        ) : (
          <div>
            <div>
              <label htmlFor="text" className="block font-bold">
                Enter some text
              </label>
              <textarea
                name="text"
                id="text"
                cols={30}
                rows={5}
                onKeyUp={handleKeyup}
                className="border border-gray-900 w-full rounded p-4"
              ></textarea>
            </div>
            <button onClick={analyse}>Analyse</button>
          </div>
        )}
      </section>
    </Container>
  );
};

export default SentimentAnalysisProjectPage;
