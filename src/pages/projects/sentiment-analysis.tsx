import Container from '@/components/common/Container/Container';
import SentimentAnalysisResult from '@/features/sentiment-analysis/components/SentimentAnalysisResult/SentimentAnalysisResult';
import React from 'react';
import SentimentAnalysisForm from '@/features/sentiment-analysis/components/SentimentAnalysisForm/SentimentAnalysisForm';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { IconButton } from '@/components/common/Buttons';

const SentimentAnalysisProjectPage = () => {
  const [value, setValue] = React.useState('');

  const [analysisActive, setAnalysisActive] = React.useState(false);

  const handleSubmit = (value: { text: string }) => {
    setValue(value.text);
    setAnalysisActive(true);
  };

  const reset = () => {
    setAnalysisActive(false);
    setValue('');
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
                <IconButton label="Reset" icon={faArrowLeft} onClick={reset} />
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
