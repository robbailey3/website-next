import Container from '@/components/common/Container/Container';
import SentimentAnalysisResult from '@/features/sentiment-analysis/components/SentimentAnalysisResult/SentimentAnalysisResult';
import { AnalyseResponse } from '@/features/sentiment-analysis/models/analyse-response';
import { ClassifyResponse } from '@/features/sentiment-analysis/models/classify-response';
import { SentimentResponse } from '@/features/sentiment-analysis/models/sentiment-response';
import axios from 'axios';
import React, { KeyboardEvent } from 'react';
import * as Sentry from '@sentry/nextjs';
import SentimentAnalysisForm from '@/features/sentiment-analysis/components/SentimentAnalysisForm/SentimentAnalysisForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';

const SentimentAnalysisProjectPage = () => {
  const [value, setValue] = React.useState('');

  const [analysisActive, setAnalysisActive] = React.useState(false);

  const handleSubmit = (value: { text: string }) => {
    setValue(value.text);
    setAnalysisActive(true);
  };

  const reset = () => {
    setAnalysisActive(false);
  };

  return (
    <>
      <Head>
        <title>Sentiment Analysis / Projects / Rob Bailey</title>
        <meta
          name="description"
          content="A project using the Google Natural Language API to analyse the sentiment of text"
        />
      </Head>
      <Container>
        <section className="py-4">
          <div className="flex">
            <div className="grow">
              <h1 className="w-full text-4xl font-bold mb-4">
                Sentiment Analysis
              </h1>
              <p className="w-full text-xl">
                Sentiment analysis is a technique that uses the words in a text
                to determine whether the text is positive, negative, or neutral.
              </p>
            </div>
            {analysisActive && (
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 leading-none rounded-full"
                  onClick={reset}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span className="sr-only">Reset</span>
                </button>
              </div>
            )}
          </div>
          {analysisActive ? (
            <SentimentAnalysisResult text={value} />
          ) : (
            <SentimentAnalysisForm value={value} onSubmit={handleSubmit} />
          )}
        </section>
      </Container>
    </>
  );
};

export default SentimentAnalysisProjectPage;
