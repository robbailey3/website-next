import Tag from '@/components/common/Tag/Tag';
import clsx from 'clsx';
import React from 'react';
import { AnalyseResponse } from '../../models/analyse-response';
import { ClassifyResponse } from '../../models/classify-response';
import { SentimentResponse } from '../../models/sentiment-response';

export interface SentimentAnalysisResultProps {
  sentiment: SentimentResponse | null;
  analysis: AnalyseResponse | null;
  classification: ClassifyResponse | null;
  onReset: () => void;
}

const SentimentAnalysisResult = (props: SentimentAnalysisResultProps) => {
  const { sentiment, analysis, classification, onReset } = props;

  const [highlightedSentence, setHighlightedSentence] =
    React.useState<number>(0);

  const handleSentenceMouseover = (index: number) => {
    setHighlightedSentence(index);
  };

  if (!sentiment || !sentiment.sentences || sentiment.sentences.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
        <button
          onClick={onReset}
          className="px-2 py-1 bg-blue-800 rounded text-white"
        >
          Back
        </button>
      </div>
      <section className="flex items-center mt-8">
        <div className="flex flex-col justify-center items-center">
          <span role="img" aria-label="Sad" className="text-2xl lg:text-6xl">
            😢
          </span>
          <span>Negative</span>
        </div>
        <div className="grow h-4 rounded bg-gradient-to-r from-red-500 to-green-500 relative shadow-lg">
          <div
            style={{ left: `${(sentiment.documentSentiment.score + 1) * 50}%` }}
            className="rounded-full -translate-x-1/2 h-8 w-8 top-1/2 -translate-y-1/2 bg-black shadow-inner absolute"
          ></div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span role="img" aria-label="Happy" className="text-2xl lg:text-6xl">
            😁
          </span>
          <span>Positive</span>
        </div>
      </section>
      <section className="text-center mb-8 text-sm">
        <p>
          <span>Score:</span> {sentiment.documentSentiment.score.toPrecision(3)}
        </p>
        <p>
          <span>Magnitude:</span>{' '}
          {sentiment.documentSentiment.magnitude.toPrecision(3)}
        </p>
        {classification && (
          <div>
            {classification.categories.map((c, i) => (
              <span className="mr-2" key={i}>
                <Tag variant="primary">{c.name}</Tag>
              </span>
            ))}
          </div>
        )}
      </section>
      <section className="flex flex-wrap">
        <div className="w-full md:w-2/3">
          {sentiment.sentences.map((sentence, index) => {
            return (
              <div key={index} className="inline">
                <div
                  onMouseOver={() => handleSentenceMouseover(index)}
                  onFocus={() => handleSentenceMouseover(index)}
                  className={clsx(
                    {
                      'bg-blue-200': highlightedSentence === index,
                    },
                    'inline duration-200'
                  )}
                >
                  {sentence.text.content}{' '}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full md:w-1/3 fixed md:relative bottom-0 md:bottom-auto px-4 md:p-0 left-0 md:left-auto bg-white">
          <div className=" md:sticky md:top-24 md:bottom-auto p-4 w-full shadow md:shadow-none">
            <div className="flex items-center">
              <div className="flex flex-col justify-center items-center">
                <span role="img" aria-label="Sad" className="text-sm">
                  😢
                </span>
              </div>
              <div className="grow h-2 rounded bg-gradient-to-r from-red-500 to-green-500 relative shadow-lg">
                <div
                  style={{
                    left: `${
                      (sentiment.sentences[highlightedSentence].sentiment
                        .score +
                        1) *
                      50
                    }%`,
                  }}
                  className="rounded-full -translate-x-1/2 h-2 w-2 top-1/2 -translate-y-1/2 bg-black shadow-inner absolute"
                ></div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span role="img" aria-label="Happy" className="text-sm">
                  😁
                </span>
              </div>
            </div>
            <div>
              <p>
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
