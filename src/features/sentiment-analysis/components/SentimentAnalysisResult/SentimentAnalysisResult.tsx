import clsx from 'clsx';
import React from 'react';
import { AnalyseResponse } from '../../models/analyse-response';
import { ClassifyResponse } from '../../models/classify-response';
import { SentimentResponse } from '../../models/sentiment-response';

export interface SentimentAnalysisResultProps {
  sentiment: SentimentResponse | null;
  analysis: AnalyseResponse | null;
  classification: ClassifyResponse | null;
}

const SentimentAnalysisResult = (props: SentimentAnalysisResultProps) => {
  const { sentiment, analysis, classification } = props;

  const [highlightedSentence, setHighlightedSentence] =
    React.useState<number>(0);

  const handleSentenceMouseover = (index: number) => {
    setHighlightedSentence(index);
    console.log(sentiment?.sentences[index]);
  };

  if (!sentiment || !sentiment.sentences || sentiment.sentences.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <div className="flex items-center my-8">
        <span role="img" aria-label="Sad" className="text-6xl">
          😢
        </span>
        <div className="grow h-4 rounded bg-gradient-to-r from-red-500 to-green-500 relative shadow-lg">
          <div
            style={{ left: `${(sentiment.documentSentiment.score + 1) * 50}%` }}
            className="rounded-full -translate-x-1/2 h-8 w-8 top-1/2 -translate-y-1/2 bg-black shadow-inner absolute"
          ></div>
        </div>
        <span role="img" aria-label="Sad" className="text-6xl">
          😁
        </span>
      </div>
      <div>
        <p>Score: {sentiment.documentSentiment.score}</p>
        <p>Magnitude: {sentiment.documentSentiment.magnitude}</p>
      </div>
      {sentiment.sentences.map((sentence, index) => {
        return (
          <div key={index} className="inline">
            <div
              onMouseOver={() => handleSentenceMouseover(index)}
              onFocus={() => handleSentenceMouseover(index)}
              className={clsx(
                {
                  'bg-slate-200': highlightedSentence === index,
                },
                'inline'
              )}
            >
              {sentence.text.content}{' '}
            </div>
          </div>
        );
      })}
      {sentiment.sentences[highlightedSentence] && (
        <>
          <div>{sentiment.sentences[highlightedSentence].sentiment.score}</div>
          <div>
            {sentiment.sentences[highlightedSentence].sentiment.magnitude}
          </div>
        </>
      )}
    </div>
  );
};

export default SentimentAnalysisResult;
