import clsx from 'clsx';
import React from 'react';
import { Guess } from '../../models/guess';

export interface WordleAttemptRowProps {
  attemptNumber: number;
  numberOfLetters: number;
  onGuessChange: (guess: Guess) => void;
  guess: Guess;
  targetWord: string;
}

const WordleAttemptRow = (props: WordleAttemptRowProps) => {
  const { attemptNumber, numberOfLetters, onGuessChange, guess, targetWord } =
    props;

  const inputs = React.useRef<HTMLInputElement[]>([]);

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    letterIndex: number
  ) => {
    event.currentTarget.value = event.currentTarget.value.toUpperCase();
    guess.letters[letterIndex] = event.currentTarget.value;
    onGuessChange(guess);
    if (event.key.length === 1 && event.key.match(/[A-Za-z]/i)) {
      focusOnNextInput(letterIndex);
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

  return (
    <div className="flex justify-center space-x-4 mb-4">
      {Array.from({ length: numberOfLetters }).map((_, i) => (
        <div key={`wordle-attempt-${attemptNumber}-letter-${i + 1}`}>
          <label
            htmlFor={`wordle-attempt-${attemptNumber}-letter-${i + 1}`}
            className="sr-only"
          >
            Letter 1
          </label>
          <input
            type="text"
            id={`wordle-attempt-${attemptNumber}-letter-${i + 1}`}
            name={`wordle-attempt-${attemptNumber}-letter-${i + 1}`}
            className={clsx(
              'w-16 h-16 text-5xl text-center border border-slate-500 rounded',
              {
                'bg-orange-200': letterIsInWord(guess.letters[i]),
                'bg-green-200': letterIsInCorrectPosition(guess.letters[i], i),
              }
            )}
            maxLength={1}
            disabled={guess.isSubmitted}
            defaultValue={guess.letters[i]}
            ref={(input) => {
              if (input) {
                if (inputs.current) {
                  inputs.current[i] = input;
                }
              }
            }}
            onKeyUp={(event) => handleKeyUp(event, i)}
          />
        </div>
      ))}
    </div>
  );
};

export default WordleAttemptRow;
