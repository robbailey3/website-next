import { Guess } from '../../models/guess';

export interface WordleActionsProps {
  attemptNumber: number;
  numberOfLetters: number;
  currentGuess: Guess;
  onSubmit: () => void;
  onClear: () => void;
}

const WordleActions = (props: WordleActionsProps) => {
  const { attemptNumber, numberOfLetters, currentGuess, onSubmit, onClear } =
    props;

  const canSubmit = () => {
    return (
      currentGuess.letters.filter((letter) => letter.length === 1).length ===
      numberOfLetters
    );
  };

  return (
    <div className="fixed max-w-2xl bottom-0 w-full left-1/2 -translate-x-1/2">
      <div className="flex justify-center space-x-4">
        <button
          disabled={!canSubmit()}
          className="h-32 w-32 flex justify-center items-center bg-slate-50 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed"
          onClick={onSubmit}
        >
          Submit
        </button>
        <button
          className="h-32 w-32 flex justify-center items-center bg-slate-50 disabled:bg-slate-200 disabled:text-slate-300 disabled:cursor-not-allowed"
          onClick={onClear}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default WordleActions;
