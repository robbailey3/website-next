import clsx from 'clsx';

export interface WordGameLetterButton {
  letter: string;
  disabled: boolean;
  onClick: () => void;
}

const WordGameLetterButton = (props: WordGameLetterButton) => {
  const { letter, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={clsx('p-2 border-none bg-gray-200 shadow mr-2')}
    >
      {letter.toUpperCase()}
    </button>
  );
};

export default WordGameLetterButton;
