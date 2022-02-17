import {
  faBackspace,
  faCheck,
  faTrashRestore,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Guess } from '../../models/guess';

export interface WordGameActionsProps {
  attemptNumber: number;
  numberOfLetters: number;
  currentGuess: Guess;
  onSubmit: () => void;
  onClear: () => void;
}

const WordGameActions = (props: WordGameActionsProps) => {
  const { attemptNumber, numberOfLetters, currentGuess, onSubmit, onClear } =
    props;

  const canSubmit = () => {
    return (
      currentGuess.letters.filter((letter) => letter.length === 1).length ===
        numberOfLetters && !currentGuess.isSubmitted
    );
  };

  return (
    <div className="fixed max-w-2xl bottom-0 w-full left-1/2 -translate-x-1/2 bg-white shadow rounded-t-lg">
      <div className="flex justify-center space-x-4 p-4">
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
