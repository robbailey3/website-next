import clsx from 'clsx';
import React from 'react';
import { Guess } from '../../models/guess';

export interface WordGameAttemptRowProps {
  attemptNumber: number;
  numberOfLetters: number;
  guess: Guess;
  targetWord: string;
}

const WordGameAttemptRow = (props: WordGameAttemptRowProps) => {
  const { attemptNumber, numberOfLetters, guess, targetWord } = props;

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
        <div key={`word-game-attempt-${attemptNumber}-letter-${i + 1}`}>
          <div
            className={clsx(
              'w-12 h-12 md:w-16 md:h-16 text-5xl text-center border border-slate-500 rounded flex justify-center items-center',
              {
                'bg-gray-600':
                  guess.isSubmitted &&
                  !letterIsInWord(guess.letters[i]) &&
                  !letterIsInCorrectPosition(guess.letters[i], i),
                'bg-yellow-200 disabled:bg-yellow-200': letterIsInWord(
                  guess.letters[i]
                ),
                'bg-green-200 disabled:bg-green-200': letterIsInCorrectPosition(
                  guess.letters[i],
                  i
                ),
              }
            )}
          >
            {guess.letters[i]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordGameAttemptRow;
