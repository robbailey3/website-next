import Tag from '@/components/common/Tag/Tag';
import Image from 'next/image';
import loadingGif from '/public/genius-smart.gif';
import axios from 'axios';
import React from 'react';
import { AnalyseResponse } from '../../models/analyse-response';
import { ClassifyResponse } from '../../models/classify-response';
import { SentimentResponse } from '../../models/sentiment-response';
import SentimentDiagram from '../SentimentDiagram/SentimentDiagram';
import SentimentSentences from '../SentimentSentences/SentimentSentences';
import Loader from '@/components/common/Loaders/Loader/Loader';

export interface SentimentAnalysisResultProps {
  text: string;
}

const SentimentAnalysisResult = (props: SentimentAnalysisResultProps) => {
  const { text } = props;

  const [classification, setClassification] =
    React.useState<ClassifyResponse | null>(null);
  const [sentiment, setSentiment] = React.useState<SentimentResponse | null>(
    null
  );
  const [hasError, setHasError] = React.useState(false);

  const [highlightedSentence, setHighlightedSentence] =
    React.useState<number>(0);

  const getClassification = React.useCallback(async (): Promise<void> => {
    const result = await axios.post(
      '/api/projects/sentiment-analysis/classify',
      { text }
    );

    setClassification(result.data);
  }, [text]);

  const getSentiment = React.useCallback(async (): Promise<void> => {
    const result = await axios.post(
      '/api/projects/sentiment-analysis/sentiment',
      { text }
    );

    setSentiment(result.data);
  }, [text]);

  const handleSentenceMouseover = (index: number) => {
    setHighlightedSentence(index);
  };

  const loadSentimentAnalysis = React.useCallback(async () => {
    try {
      await getSentiment();
      await getClassification();
    } catch {
      setHasError(true);
    }
  }, [getSentiment, getClassification]);

  React.useEffect(() => {
    loadSentimentAnalysis();
  }, [loadSentimentAnalysis]);

  if (!text) {
    return null;
  }

  if (hasError) {
    return (
      <div>
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (!classification || !sentiment) {
    return (
      <div className="h-56 flex flex-wrap justify-center items-center">
        <div className="text-center my-16">
          <Loader />
        </div>
        <Image src={loadingGif} alt=""></Image>
      </div>
    );
  }

  return (
    <div>
      <SentimentDiagram size="lg" score={sentiment.documentSentiment.score} />
      <section className="text-center mb-8 text-sm text-slate-600">
        <p>
          <span>Score:</span> {sentiment.documentSentiment.score.toPrecision(3)}
        </p>
        <p>
          <span>Magnitude:</span>{' '}
          {sentiment.documentSentiment.magnitude.toPrecision(3)}
        </p>
        {classification && (
          <div className="mt-4">
            <p>
              Classification:
              {classification.categories.map((c, i) => (
                <span className="ml-2" key={i}>
                  <Tag variant="primary">{c.name}</Tag>
                </span>
              ))}
            </p>
          </div>
        )}
      </section>
      <section className="flex flex-wrap">
        <div className="w-full md:w-2/3 pb-32 md:pb-0">
          <SentimentSentences
            sentences={sentiment.sentences}
            highlightedSentenceIndex={highlightedSentence}
            handleSentenceMouseover={handleSentenceMouseover}
          />
        </div>
        <div className="w-full md:w-1/3 fixed md:relative bottom-0 md:bottom-auto px-4 md:p-0 left-0 md:left-auto bg-white">
          <div className=" md:sticky md:top-24 md:bottom-auto p-4 w-full shadow md:shadow-none">
            <SentimentDiagram
              score={sentiment.sentences[highlightedSentence].sentiment.score}
              size="sm"
            />
            <div>
              <p className="text-sm text-center my-2 italic text-slate-600">
                <span>Score: </span>
                {sentiment.sentences[
                  highlightedSentence
                ].sentiment.score.toPrecision(3)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SentimentAnalysisResult;
