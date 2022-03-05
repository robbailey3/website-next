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
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
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
    <div className="fixed max-w-2xl bottom-0 w-full left-1/2 -translate-x-1/2 bg-white shadow rounded-t-lg">
      <div className="flex flex-wrap justify-center space-x-4 p-4">
        {letterRows.map((row, i) => (
          <div className="flex w-full justify-center" key={`letter-row-${i}`}>
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
        <button
          disabled={!canSubmit()}
          className="h-24 w-24 flex justify-center items-center bg-slate-50 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed rounded-lg flex-wrap"
          onClick={onSubmit}
        >
          <span className="w-full">Submit</span>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          disabled={currentGuess.isSubmitted}
          className="h-24 w-24 flex justify-center items-center bg-slate-50 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed rounded-lg flex-wrap"
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
