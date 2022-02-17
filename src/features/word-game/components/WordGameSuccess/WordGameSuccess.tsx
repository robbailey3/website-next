import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Guess } from '../../models/guess';

export interface WordGameSuccessProps {
  startTime: Date;
  endTime: Date;
  targetWord: string;
  guessHistory: Guess[];
  attemptNumber: number;
  onClose: () => void;
}

const WordGameSuccess = (props: WordGameSuccessProps) => {
  const {
    startTime,
    endTime,
    targetWord,
    guessHistory,
    attemptNumber,
    onClose,
  } = props;

  return (
    <div>
      <div className="fixed top-0 w-full h-full left-0 bg-black bg-opacity-20 z-40"></div>
      <div className="rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl p-4 z-50">
        <div className="flex items-center mb-8">
          <h2 className="text-xl md:text-2xl">Congratulations!</h2>
          <button
            onClick={onClose}
            className="bg-gray-300 rounded-full text-white leading-none p-1 ml-auto hover:bg-gray-500"
          >
            <span className="sr-only">Close</span>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div>
          <p>You solved today&apos;s puzzle. Come back tomorrow for another.</p>
          <div>
            <p>
              <span className="text-gray-600 font-bold">Time Taken:</span>{' '}
              {(+endTime - +startTime) / 1000}s
            </p>
            <p>
              <span className="text-gray-600 font-bold">Target Word:</span>{' '}
              {targetWord}
            </p>
            <p>
              <span className="text-gray-600 font-bold">Attempts:</span>{' '}
              {attemptNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordGameSuccess;
