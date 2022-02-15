import clsx from 'clsx';
import { Sentence } from '../../models/sentiment-response';

export interface SentimentSentencesProps {
  sentences: Sentence[];
  highlightedSentenceIndex: number;
  handleSentenceMouseover: (index: number) => void;
}

const SentimentSentences = (props: SentimentSentencesProps) => {
  const { sentences, highlightedSentenceIndex, handleSentenceMouseover } =
    props;

  return (
    <>
      {sentences.map((sentence, index) => {
        return (
          <div key={index} className="inline">
            <div
              onMouseOver={() => handleSentenceMouseover(index)}
              onFocus={() => handleSentenceMouseover(index)}
              className={clsx(
                {
                  'bg-blue-200': highlightedSentenceIndex === index,
                },
                'inline duration-200'
              )}
            >
              {sentence.text.content}{' '}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SentimentSentences;
