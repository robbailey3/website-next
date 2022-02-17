import clsx from 'clsx';
import React from 'react';
import { Guess } from '../../models/guess';

export interface WordGameAttemptRowProps {
  attemptNumber: number;
  numberOfLetters: number;
  onGuessChange: (guess: Guess) => void;
  guess: Guess;
  targetWord: string;
  incorrectLetters: string[];
}

const WordGameAttemptRow = (props: WordGameAttemptRowProps) => {
  const {
    attemptNumber,
    numberOfLetters,
    onGuessChange,
    guess,
    targetWord,
    incorrectLetters,
  } = props;

  const inputs = React.useRef<HTMLInputElement[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    letterIndex: number
  ) => {
    event.currentTarget.value = event.currentTarget.value.toUpperCase();

    if (
      event.currentTarget.value.length === 1 &&
      event.currentTarget.value.match(/[A-Za-z]/i) &&
      !incorrectLetters.includes(event.currentTarget.value)
    ) {
      guess.letters[letterIndex] = event.currentTarget.value;
      onGuessChange(guess);
      focusOnNextInput(letterIndex);
    } else {
      event.currentTarget.value = '';
      guess.letters[letterIndex] = event.currentTarget.value;
      onGuessChange(guess);
    }
  };

  const focusOnNextInput = (currentIndex: number) => {
    if (inputs.current[currentIndex].value.length === 0) {
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < numberOfLetters) {
      if (inputs.current) {
        inputs.current[nextIndex].focus();
      }
    }
  };

  const letterIsInWord = (letter: string) => {
    if (!guess.isSubmitted) {
      return false;
    }
    return letter !== '' && targetWord.includes(letter);
  };

  const letterIsInCorrectPosition = (letter: string, index: number) => {
    if (!guess.isSubmitted) {
      return false;
    }
    return targetWord[index] === letter;
  };

  React.useEffect(() => {
    inputs.current[0].focus();
  }, []);

  return (
    <div className="flex justify-center space-x-4 mb-4">
      {Array.from({ length: numberOfLetters }).map((_, i) => (
        <div key={`word-game-attempt-${attemptNumber}-letter-${i + 1}`}>
          <label
            htmlFor={`word-game-attempt-${attemptNumber}-letter-${i + 1}`}
            className="sr-only"
          >
            Letter 1
          </label>
          <input
            type="text"
            id={`word-game-attempt-${attemptNumber}-letter-${i + 1}`}
            name={`word-game-attempt-${attemptNumber}-letter-${i + 1}`}
            className={clsx(
              'w-12 h-12 md:w-16 md:h-16 text-5xl text-center border border-slate-500 rounded disabled:bg-gray-600',
              {
                'bg-yellow-200 disabled:bg-yellow-200': letterIsInWord(
                  guess.letters[i]
                ),
                'bg-green-200 disabled:bg-green-200': letterIsInCorrectPosition(
                  guess.letters[i],
                  i
                ),
              }
            )}
            maxLength={1}
            disabled={guess.isSubmitted}
            value={guess.letters[i]}
            ref={(input) => {
              if (input) {
                if (inputs.current) {
                  inputs.current[i] = input;
                }
              }
            }}
            pattern="[A-Za-z]"
            onChange={(event) => handleChange(event, i)}
          />
        </div>
      ))}
    </div>
  );
};

export default WordGameAttemptRow;
