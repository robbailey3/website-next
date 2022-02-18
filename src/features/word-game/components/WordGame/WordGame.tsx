import React, { useContext } from 'react';
import { Guess } from '../../models/guess';
import WordGameActions from '../WordGameActions/WordGameActions';
import WordGameAttemptRow from '../WordGameAttemptRow/WordGameAttemptRow';
import wordGameService from '../../services/word-game';
import Sentry from '@sentry/browser';
import WordGameSuccess from '../WordGameSuccess/WordGameSuccess';
import wordlist from '../../data/wordlist';
import { ToastContext } from 'src/context/ToastContext/ToastContext';
import { ToastModel } from '@/models/Toast';

const WordGame = () => {
  const CONFIG = {
    maxNumberOfAttempts: 6,
    lettersPerWord: 5,
  };

  const { toasts, addToast } = useContext(ToastContext);

  console.log({ toasts, addToast });

  const [isLoading, setIsLoading] = React.useState(false);

  const [targetWord, setTargetWord] = React.useState('crane'.toUpperCase());

  const [currentGuess, setCurrentGuess] = React.useState<Guess>(
    new Guess(CONFIG.lettersPerWord)
  );

  const [incorrectLetters, setIncorrectLetters] = React.useState<string[]>([]);

  const [guessHistory, setGuessHistory] = React.useState<Guess[]>([]);

  const [attemptNumber, setAttemptNumber] = React.useState(1);

  const [startTime, setStartTime] = React.useState<Date>();

  const [endTime, setEndTime] = React.useState<Date>();

  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);

  const handleGuessChange = (guess: Guess) => {
    addToast(new ToastModel('info', guess.letters.join(''), 2000));
    setCurrentGuess(() => ({ ...guess }));
  };

  const guessIsCorrect = () => {
    return currentGuess?.letters.join('') === targetWord;
  };

  const wordIsValid = () => {
    return wordlist.includes(currentGuess?.letters.join('').toLowerCase());
  };

  const checkIncorrectLetters = () => {
    setIncorrectLetters(() => [
      ...incorrectLetters,
      ...currentGuess.letters.filter((letter) => !targetWord.includes(letter)),
    ]);
  };

  const handleGuessSubmit = () => {
    currentGuess.isSubmitted = true;
    if (guessIsCorrect()) {
      currentGuess.isCorrect = true;
      setShowSuccessPopup(true);
      endTimer();
      return;
    }
    checkIncorrectLetters();
    if (attemptNumber === CONFIG.maxNumberOfAttempts) {
      return;
    }
    setGuessHistory((prevGuessHistory) => [...prevGuessHistory, currentGuess]);
    setCurrentGuess(new Guess(CONFIG.lettersPerWord));
    setAttemptNumber(() => attemptNumber + 1);
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
  };

  const handleGuessClear = () => {
    setCurrentGuess(new Guess(CONFIG.lettersPerWord));
  };

  const endTimer = () => {
    setEndTime(new Date());
  };

  React.useEffect(() => {
    const startTimer = () => {
      setStartTime(new Date());
    };
    const getWord = async () => {
      setIsLoading(true);
      try {
        const word = await wordGameService.getWord();
        setTargetWord(word.toUpperCase());
        startTimer();
      } catch (e) {
        Sentry.captureException(e);
      } finally {
        setIsLoading(false);
      }
    };
    getWord();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8">
      {showSuccessPopup && (
        <WordGameSuccess
          startTime={startTime!}
          endTime={endTime!}
          guessHistory={guessHistory}
          targetWord={targetWord}
          attemptNumber={attemptNumber}
          onClose={handlePopupClose}
        />
      )}
      <section>
        {guessHistory.map((guess, i) => (
          <WordGameAttemptRow
            key={`word-game_attempt_${i}`}
            attemptNumber={attemptNumber}
            numberOfLetters={CONFIG.lettersPerWord}
            onGuessChange={handleGuessChange}
            guess={guess}
            targetWord={targetWord}
            incorrectLetters={incorrectLetters}
          />
        ))}
      </section>
      <section className="mb-48">
        <WordGameAttemptRow
          key={`word-game_attempt_${attemptNumber}`}
          attemptNumber={attemptNumber}
          numberOfLetters={CONFIG.lettersPerWord}
          onGuessChange={handleGuessChange}
          guess={currentGuess}
          targetWord={targetWord}
          incorrectLetters={incorrectLetters}
        />
      </section>
      <section>
        {currentGuess && (
          <WordGameActions
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

export default WordGame;
