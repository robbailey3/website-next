import React from 'react';
import { Guess } from '../../models/guess';
import WordleActions from '../WordleActions/WordleActions';
import WordleAttemptRow from '../WordleAttemptRow/WordleAttemptRow';

const Wordle = () => {
  const CONFIG = {
    maxNumberOfAttempts: 5,
    lettersPerWord: 5,
  };

  const [targetWord, setTargetWord] = React.useState('crane'.toUpperCase());

  const [currentGuess, setCurrentGuess] = React.useState<Guess>(
    new Guess(CONFIG.lettersPerWord)
  );

  const [guessHistory, setGuessHistory] = React.useState<Guess[]>([]);

  const [attemptNumber, setAttemptNumber] = React.useState(1);

  const handleGuessChange = (guess: Guess) => {
    setCurrentGuess(() => ({ ...guess }));
  };

  const guessIsCorrect = () => {
    return currentGuess?.letters.join('') === targetWord;
  };

  const handleGuessSubmit = () => {
    currentGuess.isSubmitted = true;
    if (guessIsCorrect()) {
      currentGuess.isCorrect = true;
      alert('You win!');
      return;
    }
    if (attemptNumber === CONFIG.maxNumberOfAttempts) {
      alert('You lose!');
      return;
    }
    setGuessHistory((prevGuessHistory) => [...prevGuessHistory, currentGuess]);
    setCurrentGuess(new Guess(CONFIG.lettersPerWord));
    setAttemptNumber(() => attemptNumber + 1);
  };

  const handleGuessClear = () => {
    setCurrentGuess(new Guess(CONFIG.lettersPerWord));
  };

  return (
    <div>
      <section>
        <h1>Wordle</h1>
      </section>
      <section>
        {guessHistory.map((guess, i) => (
          <WordleAttemptRow
            key={`wordle_attempt_${i}`}
            attemptNumber={attemptNumber}
            numberOfLetters={CONFIG.lettersPerWord}
            onGuessChange={handleGuessChange}
            guess={guess}
            targetWord={targetWord}
          />
        ))}
      </section>
      <section>
        <WordleAttemptRow
          key={`wordle_attempt_${attemptNumber}`}
          attemptNumber={attemptNumber}
          numberOfLetters={CONFIG.lettersPerWord}
          onGuessChange={handleGuessChange}
          guess={currentGuess}
          targetWord={targetWord}
        />
      </section>
      <section>
        {currentGuess && (
          <WordleActions
            currentGuess={currentGuess}
            attemptNumber={attemptNumber}
            numberOfLetters={CONFIG.lettersPerWord}
            onSubmit={handleGuessSubmit}
            onClear={handleGuessClear}
          />
        )}
      </section>
    </div>
  );
};

export default Wordle;
