import Container from '@/components/common/Container/Container';
import SentimentAnalysisResult from '@/features/sentiment-analysis/components/SentimentAnalysisResult/SentimentAnalysisResult';
import { AnalyseResponse } from '@/features/sentiment-analysis/models/analyse-response';
import { ClassifyResponse } from '@/features/sentiment-analysis/models/classify-response';
import { SentimentResponse } from '@/features/sentiment-analysis/models/sentiment-response';
import axios from 'axios';
import React, { KeyboardEvent } from 'react';
import * as Sentry from '@sentry/nextjs';
import SentimentAnalysisForm from '@/features/sentiment-analysis/components/SentimentAnalysisForm/SentimentAnalysisForm';

const SentimentAnalysisProjectPage = () => {
  const [analysis, setAnalysis] = React.useState<AnalyseResponse | null>(null);
  const [classification, setClassification] =
    React.useState<ClassifyResponse | null>(null);
  const [sentiment, setSentiment] = React.useState<SentimentResponse | null>(
    null
  );
  const [value, setValue] = React.useState({ text: '' });

  const [analysisActive, setAnalysisActive] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleKeyup = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    setValue({ text: e.currentTarget.value });
  };

  const getAnalysis = async (): Promise<void> => {
    const result = await axios.post(
      '/api/projects/sentiment-analysis/analyse',
      value
    );

    setAnalysis(result.data);
  };

  const getClassification = async (): Promise<void> => {
    if (value.text.split(' ').length < 20) {
      return;
    }
    try {
      const result = await axios.post(
        '/api/projects/sentiment-analysis/classify',
        value
      );

      setClassification(result.data);
    } catch {
      setClassification(null);
    }
  };

  const getSentiment = async (): Promise<void> => {
    const result = await axios.post(
      '/api/projects/sentiment-analysis/sentiment',
      value
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

  const handleSubmit = (value: { text: string }) => {
    setValue(value);
    analyse();
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
        {isLoading && <div>Loading...</div>}
        {analysisActive ? (
          <SentimentAnalysisResult
            sentiment={sentiment}
            analysis={analysis}
            classification={classification}
            onReset={reset}
          />
        ) : (
          <SentimentAnalysisForm value={value} onSubmit={handleSubmit} />
        )}
      </section>
    </Container>
  );
};

export default SentimentAnalysisProjectPage;
