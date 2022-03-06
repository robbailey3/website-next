import {
  faBackspace,
  faCheck,
  faTrashRestore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Guess } from '../../models/guess';
import WordGameLetterButton from '../WordGameLetterButton/WordGameLetterButton';

export interface WordGameActionsProps {
  numberOfLetters: number;
  currentGuess: Guess;
  incorrectLetters: string[];
  onSubmit: () => void;
  onClear: () => void;
  onLetterChoose: (letter: string) => void;
}

const WordGameActions = (props: WordGameActionsProps) => {
  const {
    incorrectLetters,
    numberOfLetters,
    currentGuess,
    onSubmit,
    onClear,
    onLetterChoose,
  } = props;

  const letterRows: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const canSubmit = () => {
    return (
      currentGuess.letters.filter((letter) => letter.length === 1).length ===
        numberOfLetters && !currentGuess.isSubmitted
    );
  };

  const handleLetterClick = (letter: string) => {
    onLetterChoose(letter);
  };

  return (
    <div className="fixed bottom-0 w-full left-1/2 -translate-x-1/2 bg-white shadow rounded-t-lg">
      <div className="flex flex-wrap justify-center space-x-4 p-4 items-center">
        <button
          disabled={!canSubmit()}
          className="p-2 flex justify-center items-center bg-slate-50 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed rounded-lg flex-wrap order-3 md:order-1"
          onClick={onSubmit}
        >
          <span className="w-full">Submit</span>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <div className="order-2">
          {letterRows.map((row, i) => (
            <div
              className="flex grow justify-center my-1"
              key={`letter-row-${i}`}
            >
              {row.map((letter) => (
                <WordGameLetterButton
                  key={`letter-${letter}`}
                  letter={letter}
                  disabled={incorrectLetters.includes(letter)}
                  onClick={() => handleLetterClick(letter)}
                />
              ))}
            </div>
          ))}
        </div>
        <button
          disabled={currentGuess.isSubmitted}
          className="p-2 flex justify-center items-center bg-slate-50 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed rounded-lg flex-wrap order-3"
          onClick={onClear}
        >
          <span className="w-full">Clear</span>
          <FontAwesomeIcon icon={faBackspace} />
        </button>
      </div>
    </div>
  );
};

export default WordGameActions;
